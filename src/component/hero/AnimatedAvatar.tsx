"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PROFILE } from "@/data/Portfolio";

type OrbitVars = React.CSSProperties & { "--r": string; "--d": string };

function orbitStyle(r: string, d: string): OrbitVars {
  return { "--r": r, "--d": d } as OrbitVars;
}

export default function AnimatedAvatar() {
  return (
    <div className="relative grid place-items-center">
      {/* GLOW RING */}
      <div className="relative">
        <div className="size-44 sm:size-52 rounded-full ring-2 ring-[rgb(var(--glow-cyan-rgb))]/30 shadow-[0_0_70px_14px_rgba(var(--glow-violet-rgb),0.45)] title-glow-pulse" />
        {/* Avatar */}
        <div className="absolute inset-1 rounded-full overflow-hidden ring-2 ring-white/25">
          <Image
            src="/avatar.jpg"
            alt={`Portrait of ${PROFILE.name}`}
            fill
            className="object-cover"
            sizes="208px"
            priority
          />
        </div>
      </div>

      {/* FLOATING PARTICLES (subtle hoverless motion) */}
      <motion.div
        aria-hidden="true"
        className="absolute -z-10 size-[560px] sm:size-[680px] rounded-full bg-gradient-radial from-violet-500/10 via-transparent to-transparent"
        initial={{ opacity: 0.5, scale: 0.95 }}
        animate={{ opacity: 0.85, scale: 1 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* ORBITING DOTS — auto rotate using CSS keyframes */}
      <span aria-hidden="true" className="orbit-dot bg-violet-400/90" style={orbitStyle("120px", "18s")} />
      <span aria-hidden="true" className="orbit-dot bg-blue-400/90" style={orbitStyle("140px", "22s")} />
      <span aria-hidden="true" className="orbit-dot bg-cyan-400/90" style={orbitStyle("170px", "28s")} />
      <span aria-hidden="true" className="orbit-dot bg-purple-300/90" style={orbitStyle("200px", "34s")} />

      {/* A few floating squares/circles */}
      <span aria-hidden="true" className="float-piece piece-square left-[-70px] top-[-30px]" />
      <span aria-hidden="true" className="float-piece piece-circle right-[-60px] top-[-2px]" />
      <span aria-hidden="true" className="float-piece piece-diamond left-[-30px] bottom-[-20px]" />
      <span aria-hidden="true" className="float-piece piece-square right-[-80px] bottom-[-10px]" />
    </div>
  );
}
