"use client";

import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/component/ui/button";
import { PROFILE } from "@/data/Portfolio";
import AnimatedAvatar from "@/component/hero/AnimatedAvatar";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-[92vh] flex items-center"
      aria-label="Intro section"
    >
      {/* Radial glow background */}
      <div
        className="absolute inset-0 -z-10 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-[900px] h-[900px] rounded-full bg-gradient-radial from-indigo-900/55 via-purple-800/35 to-transparent blur-3xl opacity-70" />
      </div>

      <div className="mx-auto max-w-4xl px-4">
        {/* Avatar + orbit animation */}
        <div className="grid place-items-center">
          <AnimatedAvatar />
        </div>

        {/* Name & tagline */}
        <motion.h1
          {...fadeUp(0.05)}
          className="mt-8 text-center text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight"
        >
          {PROFILE.name}
        </motion.h1>

        <motion.p
          {...fadeUp(0.15)}
          className="mt-3 text-center text-lg text-muted-foreground"
        >
          {PROFILE.role}
        </motion.p>

        <motion.p
          {...fadeUp(0.25)}
          className="mt-4 text-center max-w-prose mx-auto text-muted-foreground"
        >
          {PROFILE.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.35)}
          className="mt-6 flex flex-wrap justify-center gap-3"
        >
          <Button asChild>
            <a href="#contact" aria-label="Jump to contact">Get in Touch</a>
          </Button>

          <Button variant="outline" asChild>
            <a href="#projects" aria-label="Jump to projects">View Projects</a>
          </Button>

          <Button asChild>
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open resume"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          </Button>
        </motion.div>

        {/* Social links */}
        <motion.div
          {...fadeUp(0.45)}
          className="mt-6 flex items-center justify-center gap-4"
        >
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:underline"
            aria-label="Open GitHub"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:underline"
            aria-label="Open LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-2 hover:underline"
            aria-label="Send email"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
        </motion.div>

        {/* Location */}
        <motion.div
          {...fadeUp(0.55)}
          className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground w-full justify-center"
        >
          <MapPin className="h-4 w-4" />
          {PROFILE.location}
        </motion.div>
      </div>
    </section>
  );
}
