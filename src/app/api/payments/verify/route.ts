import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendAuthenticatedToWordPress } from "@/lib/wordpress/integration-client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      woocommerce_order_id,
    } = body;

    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKeySecret) {
      // In development simulation mode without keys
      return NextResponse.json({
        verified: true,
        mode: "simulated",
        orderId: woocommerce_order_id || "SIM-101",
        message: "Simulated verification successful (No RAZORPAY_KEY_SECRET set).",
      });
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { message: "Missing Razorpay verification parameters" },
        { status: 400 }
      );
    }

    // Step 1: Verify Razorpay HMAC SHA-256 signature
    const expectedSignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(razorpay_signature)
    );

    if (!isSignatureValid) {
      return NextResponse.json(
        { message: "Invalid payment signature verification failed" },
        { status: 400 }
      );
    }

    // Step 2: Notify WordPress plugin to mark WooCommerce order as completed & grant download permissions
    if (woocommerce_order_id) {
      await sendAuthenticatedToWordPress(
        `/checkout/orders/${woocommerce_order_id}/complete`,
        "POST",
        {
          razorpay_payment_id,
          razorpay_order_id,
        }
      );
    }

    return NextResponse.json({
      verified: true,
      orderId: woocommerce_order_id,
      paymentId: razorpay_payment_id,
      message: "Payment successfully verified and recorded.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Payment verification error" },
      { status: 500 }
    );
  }
}
