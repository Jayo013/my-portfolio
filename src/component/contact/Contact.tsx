"use client";

import { useState } from "react";
import Section from "@/component/shared/Section";
import Reveal from "@/component/shared/Reveal";
import MagneticButton from "@/component/shared/MagneticButton";
import { Card, CardContent } from "@/component/ui/card";
import { Button } from "@/component/ui/button";
import { Github, Linkedin, Mail, Phone, MapPin, Send, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { PROFILE } from "@/data/Portfolio";
import { contactSchema } from "@/lib/contact-schema";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", hp: "" }); // hp = honeypot
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "ok" | "error">(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setErrorMessage(null);

    // simple honeypot
    if (form.hp) return;

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (res.ok) {
        setForm({ name: "", email: "", message: "", hp: "" });
        setStatus("ok");
      } else {
        const body = await res.json().catch(() => null);
        setErrorMessage(
          res.status === 429
            ? "Too many messages sent recently. Please try again in a few minutes."
            : body?.error === "MISSING_FIELDS" || body?.error === "INVALID_INPUT"
              ? "Please check the form for errors and try again."
              : null
        );
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section id="contact" title={<span className="block text-center">Establish Connection</span>}>
      <p className="text-center text-sm sm:text-base text-muted-foreground -mt--4 mb-8">
        Have a project in mind or want to discuss potential opportunities? I’d love to hear from you.
        Fill out the form below and I’ll get back to you as soon as possible.
      </p>

      <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 items-start">
        {/* LEFT: Contact info + availability */}
        <Reveal className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="glow-cyan inline-flex h-11 w-11 items-center justify-center rounded-full border border-neon-cyan/40 bg-white/5 text-neon-cyan">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium">Email</p>
                  <a href={`mailto:${PROFILE.email}`} className="text-muted-foreground hover:underline">
                    {PROFILE.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="glow-cyan inline-flex h-11 w-11 items-center justify-center rounded-full border border-neon-cyan/40 bg-white/5 text-neon-cyan">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium">Phone</p>
                  <a href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`} className="text-muted-foreground hover:underline">
                    {PROFILE.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="glow-cyan inline-flex h-11 w-11 items-center justify-center rounded-full border border-neon-cyan/40 bg-white/5 text-neon-cyan">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">{PROFILE.location}</p>
                </div>
              </li>
            </ul>

            {/* Socials */}
            <div className="mt-6 flex gap-3">
              <Button asChild variant="outline">
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="gap-2">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="gap-2">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </Button>
            </div>
          </div>

          {/* Availability card */}
          <Card className="shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <h4 className="font-semibold mb-3">Availability</h4>
              <p className="text-sm text-muted-foreground mb-4">
                I’m currently available for freelance work and open to discussing new opportunities.
              </p>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <span className="text-foreground">Monday – Friday</span>
                <span className="text-muted-foreground text-right">9:00 AM – 6:00 PM</span>

                <span className="text-foreground">Saturday</span>
                <span className="text-muted-foreground text-right">10:00 AM – 2:00 PM</span>

                <span className="text-foreground">Sunday</span>
                <span className="text-muted-foreground text-right">Closed</span>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        {/* RIGHT: Form */}
        <Reveal delay={0.1}>
        <Card className="shadow-md">
          <CardContent className="p-5 sm:p-6">
            <h3 className="text-xl font-semibold mb-5">Send a Message</h3>

            {/* Success / Error banners — terminal-style status lines */}
            {status === "ok" && (
              <div className="mb-4 flex items-center gap-2 rounded-md border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-2 font-mono text-neon-cyan">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <p className="text-sm">&gt; TRANSMISSION SENT — check your inbox for confirmation.</p>
              </div>
            )}
            {status === "error" && (
              <div className="mb-4 flex items-center gap-2 rounded-md border border-red-600/30 bg-red-600/10 px-3 py-2 font-mono text-red-400">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <p className="text-sm">
                  &gt; ERROR: TRANSMISSION FAILED — {errorMessage || "please try again later."}
                </p>
              </div>
            )}

            <form className="space-y-4" onSubmit={onSubmit}>
              {/* Honeypot (hidden) */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.hp}
                onChange={(e) => setForm({ ...form, hp: e.target.value })}
                className="hidden"
              />

              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your Name
                </label>
                <input
                  id="name"
                  className="h-10 rounded-md border border-primary/25 bg-white/5 px-3 backdrop-blur-md transition focus:border-neon-cyan/60 focus:shadow-[0_0_14px_rgba(var(--glow-cyan-rgb),0.3)] focus:outline-none"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  required
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="h-10 rounded-md border border-primary/25 bg-white/5 px-3 backdrop-blur-md transition focus:border-neon-cyan/60 focus:shadow-[0_0_14px_rgba(var(--glow-cyan-rgb),0.3)] focus:outline-none"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  required
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <label htmlFor="msg" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="msg"
                  rows={6}
                  className="rounded-md border border-primary/25 bg-white/5 px-3 py-2 backdrop-blur-md transition focus:border-neon-cyan/60 focus:shadow-[0_0_14px_rgba(var(--glow-cyan-rgb),0.3)] focus:outline-none"
                  placeholder="Tell me about your project or inquiry…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  required
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>

              <MagneticButton className="block w-full" radius={40} strength={0.2}>
                <Button type="submit" className="w-full gap-2" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </MagneticButton>
            </form>
          </CardContent>
        </Card>
        </Reveal>
      </div>
    </Section>
  );
}
