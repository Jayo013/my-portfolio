// src/component/layout/Footer.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, MapPin, Heart, ArrowUp, Copy, Check, Send, Clock, Code2, Palette, Cpu } from "lucide-react";
import { PROFILE } from "@/data/Portfolio";
import { useState, useEffect } from "react";

const FOOTER_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#blog", label: "Blog" },
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
    <footer className="relative bg-[#0a0a16] border-t border-white/10 py-6 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 mb-6">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-2">
              <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                {cleanName}
              </Link>
              <p className="text-muted-foreground max-w-md leading-relaxed text-sm">
                Crafting digital experiences with passion and precision. 
                Specializing in modern web technologies and user-centric design.
              </p>
              
              {/* Status Indicator */}
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium text-green-400">Available for work</span>
              </div>
            </div>

            {/* Newsletter Widget */}
            <div className="max-w-sm p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h4 className="text-sm font-semibold text-foreground mb-2">Stay Updated</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-indigo-500/50 transition-colors text-foreground placeholder:text-muted-foreground/50"
                />
                <button className="p-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              {[
                { icon: Github, href: PROFILE.github, label: "GitHub" },
                { icon: Linkedin, href: PROFILE.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${PROFILE.email}`, label: "Email" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3 }}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-1.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 group-hover:bg-indigo-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-5">
            <h3 className="text-base font-semibold text-foreground mb-3">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{PROFILE.location}</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm group">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="truncate max-w-[180px]">{PROFILE.email}</span>
                <button 
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-md bg-white/5 hover:bg-indigo-500/20 text-muted-foreground hover:text-indigo-400 transition-all opacity-0 group-hover:opacity-100"
                  title="Copy Email"
                >
                  {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </li>
              {PROFILE.contact && (
                <li className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                  <a href={`tel:${PROFILE.contact}`} className="hover:text-indigo-400 transition-colors">
                    {PROFILE.contact}
                  </a>
                </li>
              )}
              
              {/* Local Time Widget */}
              <li className="pt-2 border-t border-white/5">
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground/50">Local Time</span>
                    <span className="font-mono text-indigo-300">{time}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © {year} {cleanName}. All rights reserved.
          </p>
          
          {/* Tech Stack Badges */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground hidden sm:flex">
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
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
