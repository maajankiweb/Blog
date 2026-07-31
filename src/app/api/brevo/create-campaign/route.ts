import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, subject, senderName, senderEmail, htmlContent, listIds, scheduledAt } = body;

    const brevoApiKey = process.env.BREVO_API_KEY;

    if (!brevoApiKey) {
      return NextResponse.json(
        { error: "BREVO_API_KEY missing in server environment" },
        { status: 400 }
      );
    }

    if (!subject || !htmlContent) {
      return NextResponse.json(
        { error: "Subject and htmlContent are required fields." },
        { status: 400 }
      );
    }

    const campaignData: any = {
      name: name || `Campaign ${new Date().toLocaleDateString("en-IN")}`,
      subject: subject,
      sender: {
        name: senderName || "Maa Janki Tech",
        email: senderEmail || process.env.RESEND_FROM_EMAIL || "newsletter@blog.maajankiwebtech.com",
      },
      type: "classic",
      htmlContent: htmlContent,
      recipients: {
        listIds: listIds || [process.env.BREVO_LIST_ID ? parseInt(process.env.BREVO_LIST_ID) : 2],
      },
    };

    if (scheduledAt) {
      campaignData.scheduledAt = scheduledAt;
    }

    const res = await fetch("https://api.brevo.com/v3/emailCampaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify(campaignData),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ success: false, error: data }, { status: res.status });
    }

    return NextResponse.json({ success: true, campaignId: data.id, message: "Campaign created successfully!" });
  } catch (err: any) {
    console.error("Error creating Brevo email campaign:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
