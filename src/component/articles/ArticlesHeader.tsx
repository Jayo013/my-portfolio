"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function ArticlesHeader() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12 flex flex-col items-center text-center sm:mb-16"
    >
      <span className="ah-badge-new mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.2em]">
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        NEW CONTENT
      </span>

      <p className="ah-text-faint mb-2 text-xs font-bold uppercase tracking-[0.4em]">Articles</p>

      <h2 className="ah-title-gradient text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
        Latest Tech Drops
      </h2>

      <span className="ah-underline mt-5 block w-24" aria-hidden="true" />
    </motion.div>
  );
}
