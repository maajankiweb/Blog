import { NextResponse } from "next/server";

export async function GET() {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    if (!resendApiKey) {
      return NextResponse.json({ error: "RESEND_API_KEY missing in .env.local" }, { status: 400 });
    }

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: ["maajankiweb@gmail.com"],
        subject: "Hello from MCP",
        html: "<p>Hello! This is a test email sent via <strong>Resend</strong> with subject <strong>Hello from MCP</strong>.</p>",
      }),
    });

    const data = await resendRes.json();

    if (!resendRes.ok) {
      return NextResponse.json({ success: false, error: data }, { status: resendRes.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
