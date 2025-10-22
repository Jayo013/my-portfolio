// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";

export const runtime = "nodejs"; // nodemailer needs Node

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "MISSING_FIELDS" }, { status: 400 });
    }

    const preferred = (process.env.MAIL_PROVIDER || "smtp").toLowerCase();
    const trySmtpFirst = preferred === "smtp";
    const results: Array<{ provider: string; ok: boolean; error?: string }> = [];

    async function sendWithSMTP() {
      const host = process.env.SMTP_HOST!;
      const port = Number(process.env.SMTP_PORT || 587);
      const secure = String(process.env.SMTP_SECURE ?? "false").toLowerCase() === "true";
      const user = process.env.SMTP_USER!;
      const pass = process.env.SMTP_PASS!;

      if (!host || !user || !pass) {
        throw new Error("SMTP_ENV_NOT_SET");
      }

      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
        // Be explicit with timeouts to avoid hanging connections
        connectionTimeout: 15_000,
        greetingTimeout: 10_000,
        socketTimeout: 20_000,
        // If your environment injects a MITM proxy that breaks cert chains, this avoids ECONNECTION/SELF_SIGNED errors.
        tls: {
          rejectUnauthorized: false,
        },
      });

      // Surface bad creds/ports immediately
      await transporter.verify();

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

      await transporter.sendMail({
        from: FROM,
        to: email,
        subject: `Thanks for reaching out, ${name}!`,
        text: `Hi ${name},\n\nThanks for your message—I'll get back to you soon.\n\n— Jayoda`,
      });
    }

    async function sendWithResend() {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) throw new Error("RESEND_API_KEY_NOT_SET");
      const resend = new Resend(apiKey);
      const FROM = process.env.CONTACT_FROM || "Jayoda <onboarding@resend.dev>";
      const TO = process.env.CONTACT_TO || process.env.SMTP_USER || "";
      if (!TO) throw new Error("NO_DESTINATION_EMAIL");

      // send to owner
      const send1 = await resend.emails.send({
        from: FROM,
        to: TO,
        replyTo: email,
        subject: `New contact from ${name}`,
        html: `
          <h2>New message from your portfolio</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <pre style="white-space:pre-wrap;font:inherit">${message}</pre>
        `,
      });
      if (send1.error) throw new Error(send1.error.message);

      // auto reply
      const send2 = await resend.emails.send({
        from: FROM,
        to: email,
        subject: `Thanks for reaching out, ${name}!`,
        text: `Hi ${name},\n\nThanks for your message—I'll get back to you soon.\n\n— Jayoda`,
      });
      if (send2.error) throw new Error(send2.error.message);
    }

    try {
      if (trySmtpFirst) {
        await sendWithSMTP();
        results.push({ provider: "smtp", ok: true });
      } else {
        await sendWithResend();
        results.push({ provider: "resend", ok: true });
      }
    } catch (e: any) {
      const firstErr = e?.message || String(e);
      results.push({ provider: trySmtpFirst ? "smtp" : "resend", ok: false, error: firstErr });
      // fallback
      try {
        if (trySmtpFirst) {
          await sendWithResend();
          results.push({ provider: "resend", ok: true });
        } else {
          await sendWithSMTP();
          results.push({ provider: "smtp", ok: true });
        }
      } catch (e2: any) {
        const secondErr = e2?.message || String(e2);
        results.push({ provider: trySmtpFirst ? "resend" : "smtp", ok: false, error: secondErr });
        return NextResponse.json({ ok: false, error: "SEND_FAILED", attempts: results }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[/api/contact] error:", err?.message || err);
    return NextResponse.json(
      { ok: false, error: err?.code || err?.message || "MAIL_ERROR" },
      { status: 500 }
    );
  }
}
