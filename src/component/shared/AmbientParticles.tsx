"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import ParticleField from "@/component/shared/game-intro/ParticleField";

/** Persistent, very low-opacity particle layer behind all page content. */
export default function AmbientParticles() {
  const reduceMotion = !!useReducedMotion();
  const [isSmallViewport, setIsSmallViewport] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsSmallViewport(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsSmallViewport(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <ParticleField
        reduceMotion={false}
        density={isSmallViewport ? 42000 : 26000}
        maxCount={isSmallViewport ? 26 : 46}
        opacity={0.4}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
}
