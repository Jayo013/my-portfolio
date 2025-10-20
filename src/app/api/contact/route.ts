// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // nodemailer needs Node

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "MISSING_FIELDS" }, { status: 400 });
    }

    const host = process.env.SMTP_HOST!;
    const port = Number(process.env.SMTP_PORT || 465);
    const secure = String(process.env.SMTP_SECURE ?? "true").toLowerCase() === "true";
    const user = process.env.SMTP_USER!;
    const pass = process.env.SMTP_PASS!;

    if (!host || !user || !pass) {
      return NextResponse.json({ ok: false, error: "SMTP_ENV_NOT_SET" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    });

    // check connection once (helps surface bad creds/ports immediately)
    await transporter.verify();

    // Gmail requires the "from" to be the authenticated account
    const FROM = process.env.CONTACT_FROM || user;
    const TO = process.env.CONTACT_TO || user;

    await transporter.sendMail({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New contact from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <h2>New message from your portfolio</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <pre style="white-space:pre-wrap;font:inherit">${message}</pre>
      `,
    });

    // auto-reply
    await transporter.sendMail({
      from: FROM,
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      text: `Hi ${name},\n\nThanks for your message—I'll get back to you soon.\n\n— Jayoda`,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[/api/contact] error:", err?.message || err);
    return NextResponse.json(
      { ok: false, error: err?.code || err?.message || "MAIL_ERROR" },
      { status: 500 }
    );
  }
}
