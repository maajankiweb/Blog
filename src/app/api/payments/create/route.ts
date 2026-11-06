import { NextRequest, NextResponse } from "next/server";
import { sendAuthenticatedToWordPress } from "@/lib/wordpress/integration-client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { customer, items } = body;

    if (!customer?.email || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: "Customer email and items are required" },
        { status: 400 }
      );
    }

    // Step 1: Forward to WordPress plugin to calculate authoritative prices & create pending order
    const wpResult = await sendAuthenticatedToWordPress("/checkout/orders", "POST", {
      customer,
      items,
    });

    let orderId = `WC-PENDING-${Date.now()}`;
    let amountInRupees = 0;
    let currency = "INR";

    if (wpResult.ok && wpResult.data?.order_id) {
      orderId = wpResult.data.order_id.toString();
      amountInRupees = parseFloat(wpResult.data.total) || 0;
      currency = wpResult.data.currency || "INR";
    } else {
      // Fallback calculation if WP plugin is awaiting activation
      amountInRupees = items.reduce((acc: number, item: any) => {
        const num = parseFloat((item.price || "0").toString().replace(/[^0-9.]/g, "")) || 0;
        return acc + num * (item.quantity || 1);
      }, 0);
    }

    // Amount in smallest currency unit (paise for INR)
    const amountInPaise = Math.round(amountInRupees * 100);

    // Step 2: Initialize Razorpay Order via official server-side REST API
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKeyId || !razorpayKeySecret) {
      // Return order metadata for manual or sandbox flow if keys are not yet configured in .env.local
      return NextResponse.json({
        success: true,
        orderId,
        amount: amountInRupees,
        amountInPaise,
        currency,
        razorpayKeyId: null,
        razorpayOrderId: `rzp_test_sim_${Date.now()}`,
        mode: "manual_or_simulated",
        message: "Razorpay credentials not configured in .env.local. Simulation order prepared.",
      });
    }

    const authHeader = Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString("base64");

    const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: currency,
        receipt: `receipt_${orderId}`,
        notes: {
          customer_email: customer.email,
          customer_phone: customer.phone || "",
          woocommerce_order_id: orderId,
        },
      }),
    });

    const rzpData = await rzpRes.json();

    if (!rzpRes.ok) {
      return NextResponse.json(
        { message: rzpData.error?.description || "Failed to create Razorpay order" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId,
      amount: amountInRupees,
      amountInPaise,
      currency,
      razorpayKeyId,
      razorpayOrderId: rzpData.id,
      mode: "live_or_test",
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to initiate payment" },
      { status: 500 }
    );
  }
}
