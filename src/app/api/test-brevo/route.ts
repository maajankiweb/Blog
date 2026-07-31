import { NextResponse } from "next/server";

export async function GET() {
  try {
    const brevoApiKey = process.env.BREVO_API_KEY;

    if (!brevoApiKey) {
      return NextResponse.json({ error: "BREVO_API_KEY missing in .env.local" }, { status: 400 });
    }

    const res = await fetch("https://api.brevo.com/v3/account", {
      method: "GET",
      headers: {
        "api-key": brevoApiKey,
      },
    });

    const data = await res.json();
    return NextResponse.json({ success: res.ok, status: res.status, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
