"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
};

export default function TiltCard({ children, className, maxTilt = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springConfig = { stiffness: 220, damping: 20, mass: 0.4 };
  const spx = useSpring(px, springConfig);
  const spy = useSpring(py, springConfig);

  const rotateX = useTransform(spy, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(spx, [0, 1], [-maxTilt, maxTilt]);
  const glareX = useTransform(spx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(spy, [0, 1], ["0%", "100%"]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(var(--glow-cyan-rgb), 0.16), transparent 55%)`
  );

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }
      }
      className={cn("relative group", className)}
    >
      {children}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glareBackground }}
        />
      )}
    </motion.div>
  );
}
