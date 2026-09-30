import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactRequest {
  yourName: string;
  companyName: string;
  phoneNo: string;
  email?: string;
  role: string;
  services: string[];
  companyDescription: string;
  projectDetails: string;
}

/* ------------------------------------------------------------------ */
/* Brand config                                                        */
/* ------------------------------------------------------------------ */
const SITE_URL = process.env.SITE_URL || "https://graphic-wolves.vercel.app";
// NOTE: Gmail SVG images block karta hai. Best hai ke PNG version bana kar
// EMAIL_LOGO_URL mein set karein (e.g. /images/graphic-logo.png).
const LOGO_URL =
  process.env.EMAIL_LOGO_URL || `${SITE_URL}/images/graphic-logo.svg`;
const BOOKING_URL = process.env.BOOKING_URL || SITE_URL;

const BRAND = {
  purple: "#7C3AED",
  purpleDark: "#5B21B6",
  purpleSoft: "#F3EEFF",
  black: "#0A0A0A",
  text: "#27272A",
  muted: "#71717A",
  border: "#E4E4E7",
  bg: "#F6F6F9",
  white: "#FFFFFF",
};

const FONT = "'Poppins', Arial, Helvetica, sans-serif";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ------------------------------------------------------------------ */
/* Email building blocks                                               */
/* ------------------------------------------------------------------ */
function emailLayout(opts: {
  preheader: string;
  eyebrow: string;
  title: string;
  content: string;
}) {
  const { preheader, eyebrow, title, content } = opts;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};font-family:${FONT};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${escapeHtml(preheader)}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:${BRAND.white};border-radius:16px;overflow:hidden;border:1px solid ${BRAND.border};">

          <!-- Top purple bar -->
          <tr>
            <td style="height:5px;background:${BRAND.purple};font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Logo -->
          <tr>
            <td style="padding:32px 40px 8px 40px;">
              <a href="${SITE_URL}" target="_blank" style="text-decoration:none;">
                <img src="${LOGO_URL}" alt="Graphic Wolves" height="44" style="display:block;height:44px;width:auto;border:0;outline:none;" />
              </a>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:24px 40px 8px 40px;">
              <p style="margin:0 0 10px 0;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${BRAND.purple};">
                ${escapeHtml(eyebrow)}
              </p>
              <h1 style="margin:0;font-size:28px;line-height:1.25;font-weight:800;color:${BRAND.black};">
                ${title}
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:16px 40px 36px 40px;color:${BRAND.text};font-size:15px;line-height:1.7;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:${BRAND.black};padding:26px 40px;">
              <p style="margin:0 0 6px 0;font-size:14px;font-weight:700;color:${BRAND.white};">
                Graphic <span style="color:#A78BFA;">Wolves</span>
              </p>
              <p style="margin:0;font-size:12px;line-height:1.6;color:#A1A1AA;">
                Design. Branding. Digital Growth.<br />
                <a href="${SITE_URL}" target="_blank" style="color:#A78BFA;text-decoration:none;">${SITE_URL.replace(
                  /^https?:\/\//,
                  ""
                )}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function sectionHeading(label: string) {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 12px 0;">
    <tr>
      <td style="width:4px;background:${BRAND.purple};border-radius:4px;">&nbsp;</td>
      <td style="padding-left:12px;font-size:16px;font-weight:800;color:${BRAND.black};">
        ${escapeHtml(label)}
      </td>
    </tr>
  </table>`;
}

function infoRow(label: string, valueHtml: string) {
  return `
  <tr>
    <td style="padding:12px 16px;width:32%;font-size:12px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:${BRAND.muted};border-bottom:1px solid ${BRAND.border};vertical-align:top;">
      ${escapeHtml(label)}
    </td>
    <td style="padding:12px 16px;font-size:15px;font-weight:600;color:${BRAND.black};border-bottom:1px solid ${BRAND.border};vertical-align:top;">
      ${valueHtml}
    </td>
  </tr>`;
}

function infoTable(rows: string) {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.border};border-radius:12px;border-collapse:separate;overflow:hidden;">
    ${rows}
  </table>`;
}

function serviceBadges(services: string[]) {
  return services
    .map(
      (s) =>
        `<span style="display:inline-block;margin:0 6px 8px 0;padding:7px 14px;background:${BRAND.purpleSoft};color:${BRAND.purpleDark};border:1px solid #DDD0FB;border-radius:999px;font-size:13px;font-weight:700;">${escapeHtml(
          s
        )}</span>`
    )
    .join("");
}

function textCard(label: string, value: string) {
  return `
  <div style="margin:0 0 14px 0;padding:16px 18px;background:#FAFAFB;border:1px solid ${BRAND.border};border-left:4px solid ${BRAND.purple};border-radius:10px;">
    <p style="margin:0 0 6px 0;font-size:12px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:${BRAND.purple};">
      ${escapeHtml(label)}
    </p>
    <p style="margin:0;font-size:15px;line-height:1.7;color:${BRAND.text};white-space:pre-line;">${escapeHtml(
      value
    )}</p>
  </div>`;
}

function buttonHtml(label: string, href: string) {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0;">
    <tr>
      <td style="background:${BRAND.purple};border-radius:10px;">
        <a href="${href}" target="_blank" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:700;color:${BRAND.white};text-decoration:none;border-radius:10px;">
          ${escapeHtml(label)} &rarr;
        </a>
      </td>
    </tr>
  </table>`;
}

function stepRow(num: number, title: string, desc: string) {
  return `
  <tr>
    <td style="padding:0 0 16px 0;width:44px;vertical-align:top;">
      <div style="width:32px;height:32px;line-height:32px;text-align:center;background:${BRAND.purple};color:${BRAND.white};border-radius:50%;font-size:14px;font-weight:800;">${num}</div>
    </td>
    <td style="padding:0 0 16px 0;vertical-align:top;">
      <p style="margin:0;font-size:15px;font-weight:700;color:${BRAND.black};">${escapeHtml(title)}</p>
      <p style="margin:2px 0 0 0;font-size:14px;color:${BRAND.muted};">${escapeHtml(desc)}</p>
    </td>
  </tr>`;
}

/* ------------------------------------------------------------------ */
/* API route                                                           */
/* ------------------------------------------------------------------ */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequest;

    const {
      yourName,
      companyName,
      phoneNo,
      email,
      role,
      services,
      companyDescription,
      projectDetails,
    } = body;

    // Required fields validation
    if (
      !yourName?.trim() ||
      !companyName?.trim() ||
      !phoneNo?.trim() ||
      !role?.trim() ||
      !services?.length ||
      !companyDescription?.trim() ||
      !projectDetails?.trim()
    ) {
      return NextResponse.json(
        { message: "Please complete all required fields." },
        { status: 400 }
      );
    }

    // Validate email only when provided
    if (email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Check SMTP configuration
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASSWORD ||
      !process.env.ADMIN_EMAIL ||
      process.env.SMTP_HOST.includes("yourdomain.com")
    ) {
      console.error("SMTP environment variables are using placeholders or missing.");

      return NextResponse.json(
        {
          message:
            "Email service is not configured yet. Please add your real SMTP credentials in .env.local file.",
        },
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

    const safeEmail = email?.trim() || "";

    /* ADMIN EMAIL */
    const adminContent = `
      <p style="margin:0 0 4px 0;">
        A new lead just came in from your website. Here are the details:
      </p>

      ${sectionHeading("Contact Information")}
      ${infoTable(
        [
          infoRow("Name", escapeHtml(yourName)),
          infoRow("Company", escapeHtml(companyName)),
          infoRow(
            "Phone",
            `<a href="tel:${escapeHtml(phoneNo)}" style="color:${BRAND.purple};text-decoration:none;">${escapeHtml(
              phoneNo
            )}</a>`
          ),
          infoRow(
            "Email",
            safeEmail
              ? `<a href="mailto:${escapeHtml(safeEmail)}" style="color:${BRAND.purple};text-decoration:none;">${escapeHtml(
                  safeEmail
                )}</a>`
              : `<span style="color:${BRAND.muted};font-weight:400;">Not provided</span>`
          ),
          infoRow("Role", escapeHtml(role)),
        ].join("")
      )}

      ${sectionHeading("Services Requested")}
      <div>${serviceBadges(services)}</div>

      ${sectionHeading("Project Details")}
      ${textCard("Company Description", companyDescription)}
      ${textCard("Project Details", projectDetails)}

      ${
        safeEmail
          ? `<div style="margin-top:24px;">${buttonHtml(
              "Reply to " + yourName.split(" ")[0],
              `mailto:${escapeHtml(safeEmail)}`
            )}</div>`
          : ""
      }
    `;

    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: safeEmail || process.env.ADMIN_EMAIL,

      subject: `New Project Inquiry - ${yourName}`,

      text: `
New Project Inquiry

Contact Information
-------------------
Name: ${yourName}
Company: ${companyName}
Phone: ${phoneNo}
Email: ${email || "Not provided"}
Role: ${role}

Project Details
---------------
Services: ${services.join(", ")}

Company Description:
${companyDescription}

Project Details:
${projectDetails}
      `,

      html: emailLayout({
        preheader: `New inquiry from ${yourName} (${companyName})`,
        eyebrow: "New Lead",
        title: `New Project <span style="color:${BRAND.purple};">Inquiry</span>`,
        content: adminContent,
      }),
    });

    /* USER CONFIRMATION EMAIL (Optional) */
    if (safeEmail) {
      const userContent = `
        <p style="margin:0 0 14px 0;">
          Hi <strong style="color:${BRAND.purple};">${escapeHtml(yourName)}</strong>,
        </p>
        <p style="margin:0 0 14px 0;">
          Thank you for reaching out to <strong>Graphic Wolves</strong>. We have received your
          project inquiry for <strong style="color:${BRAND.purple};">${escapeHtml(
            companyName
          )}</strong>
          and our team is already reviewing your requirements.
        </p>

        ${sectionHeading("What happens next")}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${stepRow(1, "We review your brief", "Our team goes through your project details carefully.")}
          ${stepRow(2, "Book a quick call", "Pick a time that suits you using the booking calendar.")}
          ${stepRow(3, "Get a tailored plan", "We share ideas, timeline and pricing for your project.")}
        </table>

        <div style="margin:8px 0 24px 0;">
          ${buttonHtml("Schedule a Call", BOOKING_URL)}
        </div>

        ${sectionHeading("Your request summary")}
        <div style="margin-bottom:14px;">${serviceBadges(services)}</div>

        <p style="margin:24px 0 0 0;">
          Regards,<br />
          <strong style="color:${BRAND.black};">Graphic <span style="color:${BRAND.purple};">Wolves</span></strong>
        </p>
      `;

      await transporter.sendMail({
        from: `"Graphic Wolves" <${process.env.SMTP_USER}>`,
        to: safeEmail,

        subject: "We received your project inquiry",

        text: `
Hi ${yourName},

Thank you for contacting us. We have received your project inquiry and our team will review your requirements.

You can schedule a call with our team here: ${BOOKING_URL}

Regards,
Graphic Wolves
        `,

        html: emailLayout({
          preheader: "We received your inquiry and will be in touch shortly.",
          eyebrow: "Inquiry Received",
          title: `Thank you, <span style="color:${BRAND.purple};">${escapeHtml(
            yourName.split(" ")[0]
          )}</span>!`,
          content: userContent,
        }),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Your project inquiry was submitted.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { message: "Unable to submit your request. Please check SMTP settings." },
      { status: 500 }
    );
  }
}