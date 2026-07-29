"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, FolderGit2, Award, Briefcase } from "lucide-react";
import { PROFILE, PROJECTS, EXPERIENCE, CERTIFICATIONS } from "@/data/Portfolio";
import { useTypewriter } from "./useTypewriter";

type BurstVars = React.CSSProperties & { "--bx": string; "--by": string };

const BURST_COLORS = ["#a78bfa", "#67e8f9", "#e879f9"];

const STATS = [
  { icon: FolderGit2, label: "Projects", value: PROJECTS.length, accent: "text-violet-200" },
  { icon: Briefcase, label: "Experience", value: EXPERIENCE.length, accent: "text-cyan-200" },
  { icon: Award, label: "Certifications", value: CERTIFICATIONS.length, accent: "text-fuchsia-200" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" as const } },
});

export default function WelcomeStage({
  serifClassName,
  reduceMotion,
  onEnter,
}: {
  serifClassName: string;
  reduceMotion: boolean;
  onEnter: () => void;
}) {
  const [burstId, setBurstId] = useState(0);
  const [entering, setEntering] = useState(false);
  const { output: name, done: nameDone } = useTypewriter(PROFILE.name, {
    speed: 55,
    startDelay: 250,
    enabled: !reduceMotion,
  });

  function handleEnter() {
    if (entering) return;
    setEntering(true);
    setBurstId((k) => k + 1);
    window.setTimeout(onEnter, reduceMotion ? 0 : 380);
  }

  return (
    <motion.div
      key="welcome"
      className="relative flex w-full max-w-2xl flex-col items-center px-6 text-center"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.4, ease: "easeIn" } }}
    >
      {/* floating decorative pieces */}
      <span className="float-piece piece-diamond left-[8%] top-[10%] hidden sm:block" aria-hidden="true" />
      <span className="float-piece piece-circle right-[10%] top-[18%] hidden sm:block" aria-hidden="true" style={{ animationDelay: "-2s" }} />
      <span className="float-piece piece-square left-[12%] bottom-[8%] hidden sm:block" aria-hidden="true" style={{ animationDelay: "-4s" }} />

      <motion.p
        {...fadeUp(0.05)}
        className="text-xs uppercase tracking-[0.6em] text-cyan-200/70"
      >
        Welcome Player
      </motion.p>

      <h1
        className={`${serifClassName} title-glow-pulse mt-4 min-h-[1.2em] text-4xl font-semibold tracking-wide text-white sm:text-6xl`}
      >
        {name}
        {!nameDone && <span className="type-caret text-cyan-300">|</span>}
      </h1>

      <motion.p {...fadeUp(0.15)} className="mt-4 text-sm font-medium uppercase tracking-[0.25em] text-violet-200/80 sm:text-base">
        {PROFILE.role}
      </motion.p>

      <motion.div
        {...fadeUp(0.3)}
        className="holo-panel mt-8 w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-left shadow-[0_0_40px_-12px_rgba(103,232,249,0.5)]"
      >
        <p className="text-[10px] uppercase tracking-[0.4em] text-cyan-200/60">Current Mission</p>
        <p className="mt-1.5 text-sm text-white/90 sm:text-base">{PROFILE.mission}</p>
      </motion.div>

      <motion.div {...fadeUp(0.4)} className="mt-6 grid w-full grid-cols-3 gap-3 sm:gap-4">
        {STATS.map(({ icon: Icon, label, value, accent }) => (
          <div
            key={label}
            className="holo-panel rounded-xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-md sm:px-4 sm:py-4"
          >
            <Icon className={`mx-auto size-4 sm:size-5 ${accent}`} strokeWidth={1.5} />
            <p className={`mt-1.5 text-lg font-semibold sm:text-2xl ${accent}`}>{value}</p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/50 sm:text-[10px]">{label}</p>
          </div>
        ))}
      </motion.div>

      <motion.div {...fadeUp(0.55)} className="relative mt-10">
        <button
          type="button"
          onClick={handleEnter}
          disabled={entering}
          className="group relative inline-flex items-center gap-2 overflow-visible rounded-full border border-cyan-300/40 bg-gradient-to-r from-blue-600/80 via-violet-600/80 to-fuchsia-600/80 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_0_30px_-6px_rgba(103,232,249,0.7)] transition-transform duration-200 hover:scale-105 focus-visible:scale-105 focus-visible:outline-none disabled:cursor-default disabled:opacity-80 sm:text-base"
        >
          <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-70" />
          {entering ? "Entering..." : "Enter Portfolio"}
          <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />

          {burstId > 0 && (
            <span className="pointer-events-none absolute inset-0" aria-hidden="true">
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i / 16) * Math.PI * 2 + Math.random() * 0.25;
                const dist = 55 + Math.random() * 45;
                const color = BURST_COLORS[i % BURST_COLORS.length];
                const style: BurstVars = {
                  "--bx": `${Math.cos(angle) * dist}px`,
                  "--by": `${Math.sin(angle) * dist}px`,
                  background: color,
                  boxShadow: `0 0 8px ${color}`,
                };
                return <span key={`${burstId}-${i}`} className="particle-burst-dot" style={style} />;
              })}
            </span>
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}
