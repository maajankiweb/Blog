import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendAuthenticatedToWordPress } from "@/lib/wordpress/integration-client";

// In-memory set for event deduplication (idempotency)
const processedEvents = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return NextResponse.json(
        { message: "RAZORPAY_WEBHOOK_SECRET not configured on server" },
        { status: 500 }
      );
    }

    if (!signature) {
      return NextResponse.json({ message: "Missing webhook signature" }, { status: 400 });
    }

    // Verify Webhook Signature via HMAC SHA-256
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    if (!crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature))) {
      return NextResponse.json({ message: "Invalid webhook signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    const eventId = event?.id || `evt_${Date.now()}`;

    // Prevent duplicate event processing (Idempotency)
    if (processedEvents.has(eventId)) {
      return NextResponse.json({ message: "Event already processed (idempotent)" });
    }
    processedEvents.add(eventId);

    // Keep memory cache trimmed
    if (processedEvents.size > 2000) {
      const first = processedEvents.values().next().value;
      if (first) processedEvents.delete(first);
    }

    const eventType = event.event;
    const paymentEntity = event.payload?.payment?.entity;
    const notes = paymentEntity?.notes || {};
    const wcOrderId = notes.woocommerce_order_id;

    if (eventType === "payment.captured" || eventType === "order.paid") {
      if (wcOrderId) {
        await sendAuthenticatedToWordPress(`/checkout/orders/${wcOrderId}/complete`, "POST", {
          razorpay_payment_id: paymentEntity.id,
          razorpay_order_id: paymentEntity.order_id,
        });
      }
    }

    return NextResponse.json({ received: true, event: eventType });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Webhook processing error" },
      { status: 500 }
    );
  }
}
