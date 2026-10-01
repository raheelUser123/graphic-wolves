import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { BRAND, emailLayout, escapeHtml } from "@/lib/email-template";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: unknown };
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!email || email.length > 254 || !emailPattern.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASSWORD ||
      !process.env.ADMIN_EMAIL ||
      process.env.SMTP_HOST.includes("yourdomain.com")
    ) {
      console.error("SMTP environment variables are missing or placeholders.");
      return NextResponse.json(
        { message: "Email service is not configured. Please try again later." },
        { status: 500 }
      );
    }

    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const safeEmail = escapeHtml(email);
    const adminContent = `
      <p style="margin:0 0 16px 0;">A new visitor subscribed to the Graphic Wolves newsletter.</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.border};border-radius:12px;border-collapse:separate;">
        <tr>
          <td style="padding:12px 16px;font-size:12px;font-weight:700;text-transform:uppercase;color:${BRAND.muted};border-bottom:1px solid ${BRAND.border};">Email address</td>
          <td style="padding:12px 16px;font-size:15px;font-weight:600;color:${BRAND.black};border-bottom:1px solid ${BRAND.border};">
            <a href="mailto:${safeEmail}" style="color:${BRAND.purple};text-decoration:none;">${safeEmail}</a>
          </td>
        </tr>
      </table>`;
    const subscriberContent = `
      <p style="margin:0 0 14px 0;">Thanks for subscribing to Graphic Wolves.</p>
      <p style="margin:0;">We’ll send you occasional insights, fresh work, and the occasional bad pun. No spam, promise.</p>
      <p style="margin:24px 0 0 0;">Regards,<br /><strong>Graphic Wolves</strong></p>`;

    await Promise.all([
      transporter.sendMail({
        from: `"Graphic Wolves" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        replyTo: email,
        subject: "New Newsletter Subscriber",
        text: `A new visitor subscribed to the Graphic Wolves newsletter: ${email}`,
        html: emailLayout({
          preheader: "A new visitor subscribed to the newsletter.",
          eyebrow: "Newsletter Subscription",
          title: "New <span style=\"color:${BRAND.purple};\">Subscriber</span>",
          content: adminContent,
        }),
      }),
      transporter.sendMail({
        from: `"Graphic Wolves" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "You’re subscribed to Graphic Wolves",
        text: "Thanks for subscribing to Graphic Wolves. We’ll send occasional insights and fresh work. No spam, promise.",
        html: emailLayout({
          preheader: "You’re on the Graphic Wolves newsletter list.",
          eyebrow: "Subscription Confirmed",
          title: "You’re <span style=\"color:${BRAND.purple};\">subscribed</span>!",
          content: subscriberContent,
        }),
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Thanks for subscribing. Check your inbox for confirmation.",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { message: "Unable to subscribe right now. Please try again later." },
      { status: 500 }
    );
  }
}