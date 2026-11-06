import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { customer, items, total } = body;

    if (!customer?.email || !items || !Array.isArray(items)) {
      return NextResponse.json({ message: "Invalid order parameters" }, { status: 400 });
    }

    const orderId = `MJ-ORD-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    // Try communicating with WooCommerce authenticated backend if credentials exist
    const wcKey = process.env.WC_CONSUMER_KEY;
    const wcSecret = process.env.WC_CONSUMER_SECRET;
    let wcOrderId = null;

    if (wcKey && wcSecret) {
      try {
        const auth = Buffer.from(`${wcKey}:${wcSecret}`).toString("base64");
        const wcRes = await fetch("https://cms.maajankiwebtech.com/wp-json/wc/v3/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${auth}`,
          },
          body: JSON.stringify({
            payment_method: "bacs",
            payment_method_title: "Direct UPI / Bank Transfer",
            set_paid: false,
            billing: {
              first_name: customer.fullName,
              email: customer.email,
              phone: customer.phone,
              company: customer.company || "",
            },
            line_items: items.map((i: any) => ({
              product_id: i.id,
              quantity: i.quantity || 1,
            })),
          }),
        });

        if (wcRes.ok) {
          const wcData = await wcRes.json();
          wcOrderId = wcData.id;
        }
      } catch (err) {
        console.error("WooCommerce order creation failed, fallback to local order record", err);
      }
    }

    return NextResponse.json({
      success: true,
      orderId: wcOrderId ? `WC-${wcOrderId}` : orderId,
      status: "pending_payment",
      amount: total,
      customer: {
        name: customer.fullName,
        email: customer.email,
      },
      message: "Order initiated successfully. Proceed to fulfillment.",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to create order" }, { status: 500 });
  }
}
