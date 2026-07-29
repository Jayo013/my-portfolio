// src/component/layout/Footer.tsx
"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Phone, MapPin, Heart } from "lucide-react";
import { PROFILE } from "@/data/Portfolio";
import Reveal from "@/component/shared/Reveal";

const FOOTER_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#articles", label: "Articles" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/20 bg-background/40 backdrop-blur-xl text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-5">
        <Reveal className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3" y={16}>
          {/* Brand + Blurb + Socials */}
          <div>
            <h3 className="font-display text-2xl font-semibold text-glow">Portfolio</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Creating elegant digital experiences with a focus on user-centered design and maintainable
              code. Let’s build something beautiful together.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-white/5 backdrop-blur-md transition hover:border-neon-cyan/50 hover:text-neon-cyan hover:shadow-[0_0_14px_rgba(var(--glow-cyan-rgb),0.3)]"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-white/5 backdrop-blur-md transition hover:border-neon-cyan/50 hover:text-neon-cyan hover:shadow-[0_0_14px_rgba(var(--glow-cyan-rgb),0.3)]"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-white/5 backdrop-blur-md transition hover:border-neon-cyan/50 hover:text-neon-cyan hover:shadow-[0_0_14px_rgba(var(--glow-cyan-rgb),0.3)]"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold">Quick Links</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-foreground/80 hover:text-foreground transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold">Contact</h4>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center gap-2 text-foreground/80">
                <MapPin className="h-5 w-5" />
                <span>{PROFILE.location}</span>
              </li>
              <li className="flex items-center gap-2 text-foreground/80">
                <Mail className="h-5 w-5" />
                <a href={`mailto:${PROFILE.email}`} className="hover:underline">
                  {PROFILE.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-foreground/80">
                <Phone className="h-5 w-5" />
                <a href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`} className="hover:underline">
                  {PROFILE.phone}
                </a>
              </li>
            </ul>
          </div>
        </Reveal>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-border" />

        {/* Bottom bar */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {year} {PROFILE.name}. All rights reserved.</p>
          <p className="inline-flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-pink-500" /> using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
