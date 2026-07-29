"use client";

import { motion } from "framer-motion";

export const LOADING_STAGES = [
  { at: 0, text: "Initializing Systems...", numeral: "I" },
  { at: 20, text: "Loading Assets...", numeral: "II" },
  { at: 45, text: "Connecting to Cloud Network...", numeral: "III" },
  { at: 70, text: "Preparing Projects...", numeral: "IV" },
  { at: 92, text: "Launch Ready...", numeral: "V" },
];

const HOLO_READOUTS = [
  { label: "CPU", value: "OK", className: "left-[6%] top-[22%] sm:left-[10%]" },
  { label: "NET", value: "ONLINE", className: "right-[6%] top-[26%] sm:right-[10%]" },
  { label: "GPU", value: "READY", className: "left-[8%] bottom-[24%] sm:left-[12%]" },
];

type LoadingStageProps = {
  progress: number;
  stageIndex: number;
  status: string;
  initials: string;
  serifClassName: string;
};

export default function LoadingStage({ progress, stageIndex, status, initials, serifClassName }: LoadingStageProps) {
  return (
    <motion.div
      key="loading"
      className="relative flex flex-col items-center px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.5, ease: "easeIn" } }}
    >
      {/* Floating holographic readout panels */}
      {HOLO_READOUTS.map((panel) => (
        <div
          key={panel.label}
          className={`pointer-events-none absolute hidden sm:block ${panel.className}`}
          style={{ transform: "translate(calc(var(--mx, 0) * 14px), calc(var(--my, 0) * 10px))" }}
        >
          <div className="holo-panel rounded-lg border border-cyan-300/25 bg-white/5 px-3 py-1.5 text-left shadow-[0_0_20px_-4px_rgba(56,189,248,0.4)]">
            <p className="text-[9px] uppercase tracking-[0.3em] text-cyan-200/60">{panel.label}</p>
            <p className="text-[11px] font-medium tracking-wide text-cyan-100/90">{panel.value}</p>
          </div>
        </div>
      ))}

      <div
        className="relative grid size-40 place-items-center sm:size-48"
        style={{ transform: "translate(calc(var(--mx, 0) * 10px), calc(var(--my, 0) * 8px))" }}
      >
        {/* soft glow ring */}
        <div className="absolute size-full animate-pulse rounded-full ring-1 ring-white/10 shadow-[0_0_80px_16px_rgba(56,189,248,0.25)]" />

        {/* spinning arc rings */}
        <div
          className="absolute size-full animate-spin rounded-full border-2 border-transparent border-t-violet-400 border-r-cyan-300/80"
          style={{ animationDuration: "2.3s" }}
        />
        <div
          className="absolute size-[76%] animate-spin rounded-full border border-transparent border-b-cyan-300/70 border-l-fuchsia-300/60"
          style={{ animationDuration: "3.4s", animationDirection: "reverse" }}
        />
        <div
          className="absolute size-[58%] animate-spin rounded-full border border-dashed border-transparent border-t-fuchsia-300/50"
          style={{ animationDuration: "5s" }}
        />

        {/* orbiting particles */}
        <span aria-hidden="true" className="orbit-dot bg-violet-400/90" style={{ ["--r" as string]: "98px", ["--d" as string]: "4s" } as React.CSSProperties} />
        <span
          aria-hidden="true"
          className="orbit-dot bg-cyan-300/90"
          style={{ ["--r" as string]: "98px", ["--d" as string]: "4s", animationDelay: "-1.33s" } as React.CSSProperties}
        />
        <span
          aria-hidden="true"
          className="orbit-dot bg-fuchsia-400/90"
          style={{ ["--r" as string]: "98px", ["--d" as string]: "4s", animationDelay: "-2.66s" } as React.CSSProperties}
        />

        <span
          className={`title-glow-pulse relative text-6xl font-medium tracking-[0.15em] text-white sm:text-7xl ${serifClassName}`}
        >
          {initials}
        </span>
      </div>

      <span className="mt-5 text-[11px] uppercase tracking-[0.5em] text-cyan-200/60">Portfolio OS</span>

      <div className="mt-10 w-64 sm:w-80">
        <div className="flex items-end justify-between">
          <p className="text-[10px] uppercase tracking-[0.35em] text-violet-200/50">{status}</p>
          <span className="text-2xl font-semibold tabular-nums text-white" style={{ textShadow: "0 0 20px rgba(56,189,248,0.5)" }}>
            {progress}
            <span className="text-sm text-cyan-200/70">%</span>
          </span>
        </div>

        <div className="mt-2 h-[6px] overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 transition-[width] duration-100 ease-linear"
            style={{
              width: `${progress}%`,
              boxShadow: "0 0 16px 1px rgba(103,232,249,0.7), 0 0 8px 1px rgba(168,85,247,0.6)",
            }}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-5">
        {LOADING_STAGES.map((stage, i) => (
          <span
            key={stage.numeral}
            className={`${serifClassName} text-sm transition-all duration-300 ${
              i === stageIndex
                ? "scale-110 text-cyan-200"
                : i < stageIndex
                  ? "text-violet-200/50"
                  : "text-white/15"
            }`}
            style={i === stageIndex ? { textShadow: "0 0 12px rgba(103,232,249,0.8)" } : undefined}
          >
            {stage.numeral}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
