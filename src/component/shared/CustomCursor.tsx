"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from "framer-motion";

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, label';

export default function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotSpring = useSpring(x, { stiffness: 900, damping: 50 });
  const dotSpringY = useSpring(y, { stiffness: 900, damping: 50 });
  const ringSpring = useSpring(x, { stiffness: 200, damping: 26 });
  const ringSpringY = useSpring(y, { stiffness: 200, damping: 26 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(isFinePointer && !reduceMotion);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-active");

    function onMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const target = e.target as Element | null;
      setHovering(!!target?.closest(INTERACTIVE_SELECTOR));
    }
    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cursor"
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[999] hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            className="absolute rounded-full bg-neon-cyan"
            style={{
              left: dotSpring,
              top: dotSpringY,
              x: "-50%",
              y: "-50%",
              width: 6,
              height: 6,
              boxShadow: "0 0 8px rgba(var(--glow-cyan-rgb),0.9)",
            }}
          />
          <motion.span
            className="absolute rounded-full border border-neon-cyan/60"
            animate={{
              width: hovering ? 52 : 32,
              height: hovering ? 52 : 32,
              opacity: hovering ? 0.9 : 0.55,
              backgroundColor: hovering ? "rgba(var(--glow-cyan-rgb),0.08)" : "rgba(var(--glow-cyan-rgb),0)",
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              left: ringSpring,
              top: ringSpringY,
              x: "-50%",
              y: "-50%",
              boxShadow: "0 0 18px rgba(var(--glow-cyan-rgb),0.25)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
