"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Braces, Code2, Globe, Layers, Sparkles, Terminal, type LucideIcon } from "lucide-react";

type FloatingIcon = {
  icon: LucideIcon;
  className: string;
  size: number;
  duration: number;
  delay: number;
};

const ICONS: FloatingIcon[] = [
  { icon: Code2, className: "left-[8%] top-[20%] text-violet-500/45 dark:text-violet-300/40", size: 34, duration: 7, delay: 0 },
  { icon: Globe, className: "right-[10%] top-[16%] text-teal-500/50 dark:text-cyan-300/45", size: 30, duration: 8, delay: 0.6 },
  { icon: Terminal, className: "left-[14%] bottom-[18%] text-blue-500/45 dark:text-blue-300/40", size: 28, duration: 9, delay: 1.2 },
  { icon: Layers, className: "right-[14%] bottom-[22%] text-purple-500/45 dark:text-purple-300/40", size: 26, duration: 7.5, delay: 0.3 },
  { icon: Braces, className: "left-[4%] bottom-[42%] text-teal-500/40 dark:text-cyan-200/35", size: 24, duration: 8.5, delay: 0.9 },
  { icon: Sparkles, className: "right-[6%] bottom-[46%] text-violet-500/40 dark:text-violet-200/40", size: 22, duration: 6.5, delay: 1.5 },
];

export default function HeroBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Drifting aurora blobs */}
      <div className="absolute -left-40 -top-40 size-[560px] rounded-full bg-violet-300/35 dark:bg-violet-700/30 blur-3xl aurora-blob-1" />
      <div className="absolute -right-32 top-10 size-[480px] rounded-full bg-teal-300/30 dark:bg-cyan-600/20 blur-3xl aurora-blob-2" />
      <div className="absolute left-1/3 -bottom-52 size-[520px] rounded-full bg-blue-300/30 dark:bg-blue-800/25 blur-3xl aurora-blob-3" />

      {/* Faint dot grid + circuit pattern for depth */}
      <div className="absolute inset-0 bg-dot-grid" />
      <div className="absolute inset-0 bg-circuit opacity-60" />

      {/* Center glow behind the avatar */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[900px] h-[900px] rounded-full bg-gradient-radial from-violet-300/45 via-purple-200/30 dark:from-violet-900/55 dark:via-purple-800/35 to-transparent blur-3xl opacity-70" />
      </div>

      {/* Floating tech icons */}
      {!reduceMotion &&
        ICONS.map(({ icon: Icon, className, size, duration, delay }, i) => (
          <motion.div
            key={i}
            className={`absolute hidden sm:block ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, -14, 0], rotate: [0, 6, -6, 0] }}
            transition={{
              opacity: { duration: 1, delay },
              y: { duration, repeat: Infinity, ease: "easeInOut", delay },
              rotate: { duration: duration * 1.4, repeat: Infinity, ease: "easeInOut", delay },
            }}
          >
            <Icon size={size} strokeWidth={1.5} />
          </motion.div>
        ))}
    </div>
  );
}
