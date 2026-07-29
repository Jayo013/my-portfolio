"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  da: number;
  color: string;
};

const DEFAULT_COLORS = ["167,139,250", "103,232,249", "232,121,249"]; // violet, cyan, fuchsia

type ParticleFieldProps = {
  reduceMotion: boolean;
  /** particles per 16000px^2, capped at maxCount — lower this for a subtler, persistent background layer */
  density?: number;
  maxCount?: number;
  opacity?: number;
  colors?: string[];
  className?: string;
};

export default function ParticleField({
  reduceMotion,
  density = 16000,
  maxCount = 90,
  opacity = 1,
  colors = DEFAULT_COLORS,
  className,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.round((width * height) / density), maxCount);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.22 - 0.05,
        a: Math.random() * 0.5 + 0.2,
        da: (Math.random() - 0.5) * 0.004,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.a += p.da;
        if (p.a < 0.15 || p.a > 0.75) p.da *= -1;
        if (p.y < -5) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }
        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color}, ${(p.a * opacity).toFixed(3)})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion, density, maxCount, opacity, colors]);

  if (reduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className ?? "pointer-events-none absolute inset-0 h-full w-full"}
    />
  );
}
