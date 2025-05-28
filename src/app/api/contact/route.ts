import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, subject, message, inquiryType } = await req.json();

  // 1) set up transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // 2) send mail
  await transporter.sendMail({
    from: `"Contact Form" <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `New contact: ${subject} [${inquiryType}]`,
    text: `
      Name: ${name}
      Email: ${email}
      Type: ${inquiryType}
      Message:
      ${message}
    `,
  });

  return NextResponse.json({ ok: true });
}
