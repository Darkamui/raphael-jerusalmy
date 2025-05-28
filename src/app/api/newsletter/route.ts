import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Newsletter" <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_TO,
    subject: `New newsletter signup`,
    text: `Please add to your list: ${email}`,
  });

  return NextResponse.json({ ok: true });
}
