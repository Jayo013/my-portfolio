// src/component/layout/Footer.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, MapPin, Heart, ArrowUp, Copy, Check, Send, Clock, Code2, Palette, Cpu } from "lucide-react";
import { PROFILE } from "@/data/Portfolio";
import Reveal from "@/component/shared/Reveal";

const FOOTER_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#articles", label: "Articles" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const cleanName = PROFILE.name.replace("I'm ", "");
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { 
        hour: "2-digit", 
        minute: "2-digit",
        hour12: true, 
        timeZone: "Asia/Colombo"
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <div className="lg:col-span-4 lg:pl-12">
            <h3 className="text-base font-semibold text-white mb-3">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{PROFILE.location}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm group">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="truncate max-w-[250px]">{PROFILE.email}</span>
                <button 
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-md bg-indigo-500/10 hover:bg-indigo-500/20 text-gray-400 hover:text-indigo-400 transition-all opacity-0 group-hover:opacity-100"
                  title="Copy Email"
                >
                  {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                </button>
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
          
          {/* Tech Stack Badges */}
          <div className="flex items-center gap-4 text-xs text-gray-400 hidden sm:flex">
            <span className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors cursor-help" title="Built with Next.js">
              <Code2 className="w-3.5 h-3.5" /> Next.js
            </span>
            <span className="flex items-center gap-1.5 hover:text-purple-400 transition-colors cursor-help" title="Styled with Tailwind CSS">
              <Palette className="w-3.5 h-3.5" /> Tailwind
            </span>
            <span className="flex items-center gap-1.5 hover:text-pink-400 transition-colors cursor-help" title="Animated with Framer Motion">
              <Cpu className="w-3.5 h-3.5" /> Framer
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-indigo-950/30 border border-indigo-500/20 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/20 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
