import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    let brevoSuccess = false;
    let resendSuccess = false;

    // 1. Save Subscriber to Brevo List (Brevo API)
    if (brevoApiKey) {
      try {
        const brevoListId = process.env.BREVO_LIST_ID ? parseInt(process.env.BREVO_LIST_ID) : undefined;
        const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": brevoApiKey,
          },
          body: JSON.stringify({
            email: email,
            listIds: brevoListId ? [brevoListId] : undefined,
            updateEnabled: true,
          }),
        });

        if (brevoRes.ok || brevoRes.status === 204) {
          brevoSuccess = true;
        } else {
          const errData = await brevoRes.json();
          console.warn("Brevo subscription warning:", errData);
        }
      } catch (err) {
        console.error("Brevo API call error:", err);
      }
    }

    // 2. Send Welcome / Confirmation Email via Resend (Resend API)
    if (resendApiKey) {
      try {
        const fromEmail = process.env.RESEND_FROM_EMAIL || "newsletter@blog.maajankiwebtech.com";
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: `Maajanki Editorial <${fromEmail}>`,
            to: [email],
            subject: "Welcome to Maajanki Tech Weekly 🎉",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111827; background-color: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb;">
                <div style="margin-bottom: 20px;">
                  <h2 style="color: #ff6b00; margin: 0 0 8px 0; font-size: 24px;">Welcome to Maajanki Tech!</h2>
                  <p style="font-size: 15px; line-height: 1.6; color: #374151;">
                    Thank you for subscribing to <strong>Maajanki</strong>! You are now part of our tech community. You will receive our latest curated updates, web development insights, software engineering deep-dives, and digital tools directly to your inbox.
                  </p>
                </div>
                <div style="background-color: #fff7ed; padding: 16px; border-radius: 12px; border-left: 4px solid #ff6b00; margin-bottom: 20px;">
                  <p style="margin: 0; font-size: 14px; color: #9a3412;">
                    💡 <strong>Pro Tip:</strong> Have any questions, project ideas, or feedback? Simply reply directly to this email—we read every single message!
                  </p>
                </div>
                <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 24px 0;" />
                <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">
                  © ${new Date().getFullYear()} Maajanki • High signal, zero spam • You can unsubscribe anytime.
                </p>
              </div>
            `,
          }),
        });

        if (resendRes.ok) {
          resendSuccess = true;
        } else {
          const resendErr = await resendRes.json();
          console.warn("Resend email warning:", resendErr);
        }
      } catch (err) {
        console.error("Resend API call error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Subscription successful!",
      brevoSaved: brevoSuccess,
      welcomeEmailSent: resendSuccess,
    });
  } catch (error: any) {
    console.error("Error in newsletter subscription route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process newsletter subscription" },
      { status: 500 }
    );
  }
}
