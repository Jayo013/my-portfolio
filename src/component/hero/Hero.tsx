"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/component/ui/button";
import { PROFILE, PROJECTS } from "@/data/Portfolio";
import AnimatedAvatar from "@/component/hero/AnimatedAvatar";
import HeroBackground from "@/component/hero/HeroBackground";
import MagneticButton from "@/component/shared/MagneticButton";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const ROLE_TAGS = PROFILE.role.split(" · ");
const ROLE_TAG_STYLES = [
  "border-violet-400/40 bg-violet-500/10 text-violet-700 dark:text-violet-200",
  "border-blue-400/40 bg-blue-500/10 text-blue-700 dark:text-blue-200",
  "border-pink-400/40 bg-pink-500/10 text-pink-700 dark:text-pink-200",
];

const SOCIAL_LINKS = [
  {
    href: PROFILE.github,
    label: "GitHub",
    Icon: Github,
    hoverClass: "hover:border-violet-400/50 hover:text-violet-200",
  },
  {
    href: PROFILE.linkedin,
    label: "LinkedIn",
    Icon: Linkedin,
    hoverClass: "hover:border-blue-400/50 hover:text-blue-200",
  },
  {
    href: `mailto:${PROFILE.email}`,
    label: "Email",
    Icon: Mail,
    hoverClass: "hover:border-pink-400/50 hover:text-pink-200",
  },
];

// Matches each project's tech stack against the AI provider it actually integrates,
// so the "AI Models Integrated" stat stays accurate as projects are added.
const AI_PROVIDER_PATTERNS: [RegExp, string][] = [
  [/claude/i, "Claude"],
  [/openai|gpt/i, "OpenAI"],
  [/gemini/i, "Gemini"],
];

function useHeroStats() {
  const allTech = PROJECTS.flatMap((p) => p.tech);
  const uniqueTechCount = new Set(allTech).size;
  const aiProviders = new Set(
    allTech
      .map((t) => AI_PROVIDER_PATTERNS.find(([re]) => re.test(t))?.[1])
      .filter((v): v is string => Boolean(v))
  );

  return [
    { value: String(PROJECTS.length).padStart(2, "0"), label: "Products Shipped" },
    { value: `${uniqueTechCount}+`, label: "Technologies Used" },
    { value: String(aiProviders.size), label: "AI Models Integrated" },
    { value: "05", label: "Engineers Led" },
  ];
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const stats = useHeroStats();

  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-[100svh] flex items-center py-16"
      aria-label="Intro section"
    >
      <HeroBackground />

      {/* Viewport HUD corner brackets */}
      <div className="hero-hud-corner top-6 left-6" aria-hidden="true" />
      <div className="hero-hud-corner top-6 right-6 rotate-90" aria-hidden="true" />
      <div className="hero-hud-corner bottom-6 right-6 rotate-180" aria-hidden="true" />
      <div className="hero-hud-corner bottom-6 left-6 -rotate-90" aria-hidden="true" />

      {/* Coordinate tag — decorative, real location data */}
      <motion.div
        {...fadeUp(0.1)}
        className="hidden sm:flex absolute top-8 right-20 items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70"
        aria-hidden="true"
      >
        <MapPin className="h-3 w-3" />
        Sector // {PROFILE.location}
      </motion.div>

      {/* Glowing seam dividing identity from loadout */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
        className="hero-seam hidden lg:block absolute inset-y-14 left-[59%]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-12 items-center">
          {/* Identity column */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300"
            >
              <span className="relative flex h-2 w-2">
                {!reduceMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Portfolio Status: Online
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="mt-6 text-balance font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase leading-[0.95] tracking-tight text-glow title-glow-pulse"
            >
              {PROFILE.name}
            </motion.h1>

            <motion.div {...fadeUp(0.2)} className="mt-5 flex flex-wrap gap-2">
              {ROLE_TAGS.map((tag, i) => (
                <span
                  key={tag}
                  className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] ${ROLE_TAG_STYLES[i % ROLE_TAG_STYLES.length]}`}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.p {...fadeUp(0.3)} className="mt-5 max-w-[60ch] text-muted-foreground">
              {PROFILE.tagline}
            </motion.p>

            <motion.div {...fadeUp(0.4)} className="mt-8 flex flex-wrap gap-3">
              <MagneticButton>
                <Button asChild size="lg">
                  <a href="#projects" aria-label="Jump to projects">Enter Portfolio →</a>
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button asChild variant="outline" size="lg">
                  <a
                    href={PROFILE.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open resume"
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button asChild variant="link" size="lg">
                  <a href="#contact" aria-label="Jump to contact">Contact</a>
                </Button>
              </MagneticButton>
            </motion.div>

            <motion.div {...fadeUp(0.5)} className="mt-8 flex flex-wrap items-center gap-3">
              {SOCIAL_LINKS.map(({ href, label, Icon, hoverClass }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                  aria-label={`Open ${label}`}
                  className={`glass-panel hover-lift inline-flex items-center gap-2 rounded-full border border-primary/25 px-4 py-2 text-sm transition-colors duration-300 ${hoverClass}`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              ))}
            </motion.div>

            <motion.div
              {...fadeUp(0.6)}
              className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground"
            >
              <MapPin className="h-4 w-4" />
              {PROFILE.location}
            </motion.div>
          </div>

          {/* Loadout column */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center gap-10">
            <div className="relative grid place-items-center">
              {!reduceMotion && (
                <svg
                  viewBox="0 0 200 200"
                  className="absolute left-1/2 top-1/2 size-64 sm:size-72 hex-ring-spin"
                  aria-hidden="true"
                >
                  <polygon
                    points="100,6 186,53 186,147 100,194 14,147 14,53"
                    fill="none"
                    stroke="url(#hexGradient)"
                    strokeWidth="1.5"
                  />
                  <defs>
                    <linearGradient id="hexGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#9D4EDD" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#3DA9FC" stopOpacity="0.15" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
              <AnimatedAvatar />
            </div>

            <motion.div
              className="grid grid-cols-2 gap-3 w-full max-w-sm"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.65 } },
              }}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.4 }}
                  className="glass-panel hover-lift rounded-xl border border-primary/25 px-4 py-3 text-center"
                >
                  <div className="font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-glow-cyan">
                    {stat.value}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
