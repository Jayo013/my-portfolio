// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs"; // nodemailer needs Node

// Best-effort in-memory limiter. Resets on cold start and isn't shared across
// serverless instances — fine for deterring casual spam, not a hard guarantee.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: false, error: "RATE_LIMITED" }, { status: 429 });
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "INVALID_INPUT" }, { status: 400 });
    }
    const { name, email, message } = parsed.data;

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
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <pre style="white-space:pre-wrap;font:inherit">${escapeHtml(message)}</pre>
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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "MAIL_ERROR";
    console.error("[/api/contact] error:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
