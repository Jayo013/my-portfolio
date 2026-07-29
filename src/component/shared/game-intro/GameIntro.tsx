"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import localFont from "next/font/local";
import { PROFILE } from "@/data/Portfolio";
import ParticleField from "./ParticleField";
import LoadingStage, { LOADING_STAGES } from "./LoadingStage";
import WelcomeStage from "./WelcomeStage";

const serif = localFont({
  src: [
    { path: "../../../fonts/cormorant-garamond-500.woff2", weight: "500", style: "normal" },
    { path: "../../../fonts/cormorant-garamond-600.woff2", weight: "600", style: "normal" },
  ],
});

const STORAGE_KEY = "intro-shown";
const LOAD_DURATION_MS = 4800;
const HOLD_MS = 550;
const FLASH_MS = 650;
const FADE_MS = 550;

type Stage = "loading" | "flash" | "welcome" | "exiting";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join("");
}

export default function GameIntro() {
  const reduceMotion = !!useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState<Stage>("loading");
  const [progress, setProgress] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      alreadyShown = false;
    }

    if (alreadyShown) {
      setVisible(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const duration = reduceMotion ? 400 : LOAD_DURATION_MS;
    const holdMs = reduceMotion ? 0 : HOLD_MS;
    const flashMs = reduceMotion ? 0 : FLASH_MS;
    startRef.current = null;

    const advance = () => {
      window.setTimeout(() => {
        if (flashMs === 0) {
          setStage("welcome");
        } else {
          setStage("flash");
          window.setTimeout(() => setStage("welcome"), flashMs);
        }
      }, holdMs);
    };

    const tick = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const pct = Math.min(100, (elapsed / duration) * 100);
      const eased = 1 - Math.pow(1 - pct / 100, 3);
      setProgress(Math.round(eased * 100));

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        advance();
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = previousOverflow;
    };
  }, [reduceMotion]);

  const handleEnter = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // sessionStorage unavailable (private mode etc.) — skip once-per-session persistence
    }
    setStage("exiting");
    window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, FADE_MS);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const el = rootRef.current;
      if (!el) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      el.style.setProperty("--mx", nx.toFixed(3));
      el.style.setProperty("--my", ny.toFixed(3));
    },
    [reduceMotion],
  );

  if (!visible) return null;

  const initials = getInitials(PROFILE.name);
  const stageIndex = LOADING_STAGES.reduce((acc, s, i) => (progress >= s.at ? i : acc), 0);
  const status = LOADING_STAGES[stageIndex].text;

  return (
    <div
      id="intro-loader"
      ref={rootRef}
      onPointerMove={handlePointerMove}
      aria-hidden={stage !== "welcome"}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden transition-opacity ease-in-out"
      style={
        {
          background:
            "linear-gradient(135deg, #020111 0%, #0a0733 25%, #170a3d 50%, #050224 75%, #020111 100%)",
          opacity: stage === "exiting" ? 0 : 1,
          transitionDuration: `${FADE_MS}ms`,
          pointerEvents: stage === "exiting" ? "none" : "auto",
          "--mx": 0,
          "--my": 0,
        } as React.CSSProperties
      }
    >
      {/* Ambient background layers */}
      <ParticleField reduceMotion={reduceMotion} />
      <div className="grid-floor-wrap">
        <div className="grid-floor-plane" />
      </div>
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="aurora-blob-1 pointer-events-none absolute -top-1/4 -left-1/4 h-[60vh] w-[60vh] rounded-full bg-violet-700/20 blur-3xl" />
      <div className="aurora-blob-2 pointer-events-none absolute -right-1/4 -bottom-1/4 h-[55vh] w-[55vh] rounded-full bg-cyan-600/15 blur-3xl" />
      <div className="aurora-blob-3 pointer-events-none absolute top-1/3 right-1/4 h-[45vh] w-[45vh] rounded-full bg-fuchsia-700/15 blur-3xl" />

      {/* Energy pulse sweeps */}
      <div className="energy-pulse pointer-events-none" style={{ left: "-10%" }} />
      <div className="energy-pulse pointer-events-none" style={{ left: "35%", animationDelay: "-2.6s" }} />

      {/* scanline sweep */}
      <div className="scan-sweep pointer-events-none" />

      {/* HUD corner brackets */}
      <div className="hud-corner pointer-events-none top-5 left-5 sm:top-8 sm:left-8" />
      <div className="hud-corner pointer-events-none top-5 right-5 rotate-90 sm:top-8 sm:right-8" />
      <div className="hud-corner pointer-events-none right-5 bottom-5 rotate-180 sm:right-8 sm:bottom-8" />
      <div className="hud-corner pointer-events-none bottom-5 left-5 -rotate-90 sm:bottom-8 sm:left-8" />

      {/* Reveal flash */}
      <AnimatePresence>
        {stage === "flash" && (
          <motion.div
            key="flash"
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, rgba(103,232,249,0.5) 30%, rgba(139,92,246,0.2) 55%, transparent 75%)",
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 1, 0], scale: [0.4, 1.6, 2.2], transition: { duration: FLASH_MS / 1000, ease: "easeOut" } }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {stage === "loading" && (
          <LoadingStage
            progress={progress}
            stageIndex={stageIndex}
            status={status}
            initials={initials}
            serifClassName={serif.className}
          />
        )}
        {(stage === "welcome" || stage === "exiting") && (
          <WelcomeStage serifClassName={serif.className} reduceMotion={reduceMotion} onEnter={handleEnter} />
        )}
      </AnimatePresence>
    </div>
  );
}
