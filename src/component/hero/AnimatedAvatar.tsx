"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AnimatedAvatar() {
  return (
    <div className="relative grid place-items-center">
      {/* GLOW RING */}
      <div className="relative">
        <div className="size-44 sm:size-52 rounded-full ring-2 ring-white/10 shadow-[0_0_60px_10px_rgba(99,102,241,0.35)]" />
        {/* Avatar */}
        <div className="absolute inset-1 rounded-full overflow-hidden ring-2 ring-white/20">
          <Image
            src="/avatar.jpg" // <-- your image
            alt="Profile"
            fill
            className="object-cover"
            sizes="208px"
            priority
          />
        </div>
      </div>

      {/* FLOATING PARTICLES (subtle hoverless motion) */}
      <motion.div
        className="absolute -z-10 size-[560px] sm:size-[680px] rounded-full bg-gradient-radial from-indigo-500/10 via-transparent to-transparent"
        initial={{ opacity: 0.5, scale: 0.95 }}
        animate={{ opacity: 0.85, scale: 1 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* ORBITING DOTS — auto rotate using CSS keyframes */}
      <span className="orbit-dot bg-indigo-400/90" style={{ ["--r" as any]: "120px", ["--d" as any]: "18s" }} />
      <span className="orbit-dot bg-fuchsia-400/90" style={{ ["--r" as any]: "140px", ["--d" as any]: "22s" }} />
      <span className="orbit-dot bg-emerald-400/90" style={{ ["--r" as any]: "170px", ["--d" as any]: "28s" }} />
      <span className="orbit-dot bg-cyan-400/90" style={{ ["--r" as any]: "200px", ["--d" as any]: "34s" }} />

       <span className="orbit-square bg-indigo-400/90" style={{ ["--r" as any]: "140px", ["--d" as any]: "25s" }} />
      <span className="orbit-square bg-fuchsia-400/90" style={{ ["--r" as any]: "160px", ["--d" as any]: "30s" }} />
      <span className="orbit-square bg-emerald-400/90" style={{ ["--r" as any]: "190px", ["--d" as any]: "36s" }} />
      <span className="orbit-square bg-cyan-400/90" style={{ ["--r" as any]: "220px", ["--d" as any]: "42s" }} />

      {/* A few floating squares/circles */}
      <span className="float-piece piece-square left-[-70px] top-[-30px]" />
      <span className="float-piece piece-circle right-[-60px] top-[-2px]" />
      <span className="float-piece piece-diamond left-[-30px] bottom-[-20px]" />
      <span className="float-piece piece-square right-[-80px] bottom-[-10px]" />
       </div>
  );
}
