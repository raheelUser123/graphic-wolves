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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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

    /* ADMIN EMAIL */
    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email?.trim() || process.env.ADMIN_EMAIL,

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

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; color: #222; line-height: 1.6;">
          <h2 style="margin-bottom: 25px;">New Project Inquiry</h2>
          <h3>Contact Information</h3>
          <p><strong>Name:</strong> ${escapeHtml(yourName)}</p>
          <p><strong>Company:</strong> ${escapeHtml(companyName)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phoneNo)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email || "Not provided")}</p>
          <p><strong>Role:</strong> ${escapeHtml(role)}</p>
          <hr />
          <h3>Project Details</h3>
          <p><strong>Services:</strong> ${services.map((s) => escapeHtml(s)).join(", ")}</p>
          <p><strong>Company Description:</strong></p>
          <p style="white-space: pre-line;">${escapeHtml(companyDescription)}</p>
          <p><strong>Project Details:</strong></p>
          <p style="white-space: pre-line;">${escapeHtml(projectDetails)}</p>
        </div>
      `,
    });

    /* USER CONFIRMATION EMAIL (Optional) */
    if (email?.trim()) {
      await transporter.sendMail({
        from: `"Graphic Wolves" <${process.env.SMTP_USER}>`,
        to: email.trim(),

        subject: "We received your project inquiry",

        text: `
Hi ${yourName},

Thank you for contacting us. We have received your project inquiry and our team will review your requirements.

You can schedule a call with our team using the booking calendar on the next step.

Regards,
Graphic Wolves
        `,

        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #222; line-height: 1.6;">
            <h2>Thank You, ${escapeHtml(yourName)}</h2>
            <p>Thank you for contacting us.</p>
            <p>We have received your project inquiry and our team will review your requirements.</p>
            <p>You can schedule a call with our team using the booking calendar.</p>
            <p style="margin-top: 30px;">Regards,<br />Graphic Wolves</p>
          </div>
        `,
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
