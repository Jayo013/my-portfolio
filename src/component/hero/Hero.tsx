"use client";

import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/component/ui/button";
import { PROFILE } from "@/data/Portfolio";

export default function Hero() {
  return (
    <section
        id="home"
        className="relative overflow-hidden min-h-screen flex items-start pt-10 sm:pt-0"
    >   

      {/* 🔥 Radial glow background */}
      <div
        className="absolute inset-0 -z-10 flex items-center justify-center"
        aria-hidden
      >
        <div className="w-[900px] h-[900px] rounded-full bg-gradient-radial from-indigo-900/60 via-purple-800/40 to-transparent blur-3xl opacity-70" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Profile image */}
          <div className="relative mb-8">
            <div className="aspect-square w-40 sm:w-48 rounded-full ring-2 ring-border bg-gradient-to-br from-muted to-background p-1 shadow-xl shadow-indigo-500/30">
              <div className="h-full w-full rounded-full bg-[url('/avatar.jpg')] bg-cover bg-center" />
            </div>
          </div>

          {/* Name & tagline */}
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
            {PROFILE.name}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{PROFILE.role}</p>
          <p className="mt-4 max-w-prose text-muted-foreground">
            {PROFILE.tagline}
          </p>

          {/* Call-to-action buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            
            <Button  asChild>
              <a href="#contact">Get in Touch</a>
            </Button>

            <Button variant="outline" asChild>
              <a href="#projects">View Projects</a>
            </Button>
            
            <Button asChild>
            <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer">
              <Download className="mr-2 h-4 w-4" /> Resume
            </a>
          </Button>
          </div>

          {/* Social links */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:underline"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:underline"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 hover:underline"
            >
              <Mail className="h-4 w-4" /> Email
            </a>
          </div>

          {/* Location */}
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> {PROFILE.location}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
