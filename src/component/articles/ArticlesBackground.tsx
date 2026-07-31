"use client";

import { motion, useReducedMotion } from "framer-motion";

const PARTICLES = [
  { left: "8%", top: "18%", size: 4, duration: 9, delay: 0, color: "rgb(var(--ah-purple-rgb))" },
  { left: "22%", top: "74%", size: 3, duration: 11, delay: 1.2, color: "rgb(var(--ah-cyan-rgb))" },
  { left: "48%", top: "10%", size: 5, duration: 8, delay: 0.6, color: "rgb(var(--ah-pink-rgb))" },
  { left: "68%", top: "82%", size: 3, duration: 10, delay: 1.8, color: "rgb(var(--ah-gold-rgb))" },
  { left: "84%", top: "26%", size: 4, duration: 12, delay: 0.3, color: "rgb(var(--ah-cyan-rgb))" },
  { left: "36%", top: "90%", size: 3, duration: 9.5, delay: 2.1, color: "rgb(var(--ah-purple-rgb))" },
];

export default function ArticlesBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="ah-grid-bg absolute inset-0 opacity-70" />

      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[rgba(168,85,247,0.18)] blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[rgba(0,229,255,0.14)] blur-3xl" />

      {!reduceMotion &&
        PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="ah-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 8px ${p.color}`,
            }}
            animate={{ y: [0, -16, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
    </div>
  );
}
