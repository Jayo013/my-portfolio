"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Trophy, Award, ExternalLink } from "lucide-react";
import { PROFILE, ACHIEVEMENTS, CERTIFICATIONS, type Certification } from "@/data/Portfolio";
import Reveal from "@/component/shared/Reveal";

type Stat = { value: number; suffix: string; label: string };

const STATS: Stat[] = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 5, suffix: "+", label: "Projects Completed" },
  { value: 1000, suffix: "+", label: "Cups of Coffee" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

function CountUpStat({ value, suffix, label }: Stat) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);
  const startedRef = useRef(false);

  function start() {
    if (startedRef.current) return;
    startedRef.current = true;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const duration = 1200;
    const startTime = performance.now();
    function tick(now: number) {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  return (
    <motion.div
      className="glass-panel hover-lift rounded-xl border border-primary/25 p-4"
      onViewportEnter={start}
      viewport={{ once: true, margin: "-50px" }}
    >
      <p className="font-display text-xl font-bold text-glow-cyan tabular-nums">
        {display.toLocaleString()}
        {suffix}
      </p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}

function CertificationCard({ c }: { c: Certification }) {
  const href = c.image ?? c.file;

  const card = (
    <div className="glass-panel hover-lift flex items-start gap-3 rounded-xl border border-primary/20 p-4">
      <span className="glow-cyan mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-neon-cyan/40 bg-white/5 text-neon-cyan">
        <Award className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-heading text-sm font-medium leading-snug text-foreground">{c.name}</p>
        <p className="text-xs text-muted-foreground">
          {c.issuer}
          {c.year ? ` · ${c.year}` : ""}
        </p>
      </div>
      {href && (   
        <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
      )}
    </div>
  );

  if (!href) return card;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`View certificate: ${c.name}`}>
      {card}
    </a>
  );
}

const PROFESSIONAL_CERTS_PREVIEW_COUNT = 4;

export default function AboutMe() {
  const [showAllCerts, setShowAllCerts] = useState(false);
  const professionalCerts = CERTIFICATIONS.filter((c) => c.category === "professional");
  const participationCerts = CERTIFICATIONS.filter((c) => c.category === "participation");
  const visibleProfessionalCerts = showAllCerts
    ? professionalCerts
    : professionalCerts.slice(0, PROFESSIONAL_CERTS_PREVIEW_COUNT);
  const hasMoreCerts = professionalCerts.length > PROFESSIONAL_CERTS_PREVIEW_COUNT;

  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center text-glow mb-2"
        >
          Player <span className="text-neon-cyan">Profile</span>
        </motion.h2>
        <span className="section-heading-accent mb-12" aria-hidden="true" />

        {/* Main Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid gap-12 sm:grid-cols-2 items-center"
        >
          {/* Left: Profile Image */}
          <div className="flex justify-center">
            <div className="relative overflow-hidden rounded-2xl border border-primary/30 p-1.5 glow-violet">
              <Image
                src="/avatar.jpg"
                alt={`Portrait of ${PROFILE.name}`}
                width={400}
                height={500}
                className="rounded-xl object-cover"
              />
              <div className="scan-sweep pointer-events-none" aria-hidden="true" />
              <div className="hud-corner pointer-events-none top-3 left-3" aria-hidden="true" />
              <div className="hud-corner pointer-events-none top-3 right-3 rotate-90" aria-hidden="true" />
              <div className="hud-corner pointer-events-none bottom-3 right-3 rotate-180" aria-hidden="true" />
              <div className="hud-corner pointer-events-none bottom-3 left-3 -rotate-90" aria-hidden="true" />
            </div>
          </div>

          {/* Right: About Text */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Hello, I&apos;m <span className="text-primary">{PROFILE.name}</span>
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              I am a highly motivated developer with a strong passion for
              building scalable, high-performance applications. With expertise
              across both front-end and back-end development, I specialize in
              crafting seamless user experiences and architecting efficient,
              robust solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              My skill set includes full-stack development using React, Next.js,
              Node.js, and Tailwind CSS. On the backend, I design scalable
              microservices and APIs with cloud solutions like AWS, Docker, and
              CI/CD pipelines to deploy and manage applications efficiently.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
              {STATS.map((stat) => (
                <CountUpStat key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <Reveal className="mt-16 sm:mt-20">
          <h3 className="mb-6 flex items-center gap-2 font-display text-xl font-bold text-glow-cyan uppercase tracking-wide">
            <Trophy className="h-5 w-5 text-neon-cyan" />
            Achievements Unlocked
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {ACHIEVEMENTS.map((a) => (
              <div
                key={a.title}
                className="glass-panel hover-lift rounded-2xl border border-primary/25 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-heading text-sm font-semibold text-foreground">{a.title}</h4>
                  <span className="shrink-0 rounded-full border border-primary/25 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {a.period}
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-primary">{a.org}</p>
                <p className="mt-2 text-sm text-muted-foreground">{a.blurb}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Certifications */}
        <Reveal className="mt-12" delay={0.1}>
          <h3 className="mb-6 flex items-center gap-2 font-display text-xl font-bold text-glow-cyan uppercase tracking-wide">
            <Award className="h-5 w-5 text-neon-cyan" />
            Professional Certifications
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {visibleProfessionalCerts.map((c) => (
              <CertificationCard key={c.name} c={c} />
            ))}
          </div>
          {hasMoreCerts && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllCerts((prev) => !prev)}
                className="glass-panel hover-lift rounded-full border border-primary/25 px-5 py-2 text-sm font-medium text-neon-cyan transition-colors hover:border-neon-cyan/50"
              >
                {showAllCerts ? "Show Less" : `See All (${professionalCerts.length})`}
              </button>
            </div>
          )}
        </Reveal>

        {/* Hackathons & Participation */}
        <Reveal className="mt-12" delay={0.15}>
          <h3 className="mb-6 flex items-center gap-2 font-display text-xl font-bold text-glow-cyan uppercase tracking-wide">
            <Trophy className="h-5 w-5 text-neon-cyan" />
            Hackathons &amp; Participation
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {participationCerts.map((c) => (
              <CertificationCard key={c.name} c={c} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
