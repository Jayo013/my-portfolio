"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Button } from "@/component/ui/button";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useDarkMode } from "@/component/hooks/useDarkMode";
import { PROFILE } from "@/data/Portfolio";

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#articles", label: "Articles" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const { dark, setDark } = useDarkMode();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  // Highlight the nav link for whichever section is currently in view
  useEffect(() => {
    const sections = NAV.map((item) => document.getElementById(item.href.slice(1))).filter(
      (el): el is HTMLElement => !!el
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close mobile menu on Escape for keyboard users
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-primary/20 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 shadow-[0_1px_24px_-8px_rgba(var(--glow-violet-rgb),0.4)]">
      {/* Scroll progress HUD bar */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-[#7b2cbf] via-[#2563eb] to-[rgb(var(--glow-cyan-rgb))] shadow-[0_0_8px_rgba(var(--glow-cyan-rgb),0.6)]"
        style={{ scaleX: progress }}
      />

      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <a href="#home" className="font-display text-lg font-bold tracking-wide text-glow">
          {PROFILE.name}
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-6 font-heading text-sm font-medium">
          {NAV.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`nav-link-glow py-1 font-medium transition-colors hover:text-neon-cyan ${
                  isActive ? "text-neon-cyan text-glow-cyan" : "text-foreground/85"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-primary/30 bg-white/5 backdrop-blur-md hover:border-neon-cyan/50 hover:shadow-[0_0_14px_rgba(var(--glow-cyan-rgb),0.25)] transition"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((p) => !p)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-[max-height,opacity] duration-300 overflow-hidden ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 pb-4">
          <nav aria-label="Mobile" className="glass-panel rounded-xl border border-primary/25 shadow-[0_0_30px_-10px_rgba(var(--glow-violet-rgb),0.5)] p-3">
            <div className="flex flex-col items-center space-y-2 font-heading">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="w-full rounded-lg px-3 py-2 text-sm text-center transition hover:bg-primary/10 hover:text-neon-cyan"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>

    </header>
  );
}
