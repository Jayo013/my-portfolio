"use client";

import { useState, useEffect } from "react";
import { Button } from "@/component/ui/button";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useDarkMode } from "@/component/hooks/useDarkMode";

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const { dark, setDark } = useDarkMode();
  const [open, setOpen] = useState(false);

  // prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <a href="#home" className="font-semibold tracking-tight">
          Jayoda Pramuditha
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </a>
          ))}
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
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border hover:bg-muted transition"
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
          <div className="rounded-xl border bg-card shadow-sm p-3">
            <div className="flex flex-col items-center space-y-2">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="w-full rounded-lg px-3 py-2 text-sm text-center hover:bg-muted"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

    </header>
  );
}
