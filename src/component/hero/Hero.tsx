"use client";

import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, MapPin, Code2, Server, Palette, Terminal, Globe, Wrench } from "lucide-react";
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
      {/* Enhanced background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"
        />

        {/* Enhanced background elements for large screens */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 1, 0.4],
            x: [0, 10, -10, 0],
            y: [0, -10, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="hidden lg:block absolute top-1/4 left-1/4 w-6 h-6 bg-purple-400/60 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 1, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="hidden lg:block absolute top-3/4 right-1/4 w-5 h-5 bg-indigo-400/70 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.6, 1, 0.6],
            x: [0, 15, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="hidden lg:block absolute top-1/3 right-1/5 w-4 h-4 bg-pink-400/80 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.3, 0.9, 0.3],
            y: [0, -20, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7,
          }}
          className="hidden lg:block absolute bottom-1/4 left-1/5 w-7 h-7 bg-cyan-400/50 rounded-full"
        />
      </div>

      {/* Enhanced Floating Tech Icons for Large Screens */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none -z-10">
        {[
          {
            icon: <Code2 size={40} />,
            position: "top-1/4 left-[15%]",
            delay: 0,
          },
          {
            icon: <Server size={36} />,
            position: "top-1/3 right-[15%]",
            delay: 1,
          },
          {
            icon: <Palette size={38} />,
            position: "bottom-1/3 left-[10%]",
            delay: 2,
          },
          {
            icon: <Terminal size={34} />,
            position: "bottom-1/4 right-[12%]",
            delay: 1.5,
          },
          {
            icon: <Globe size={32} />,
            position: "top-[15%] right-1/4",
            delay: 0.5,
          },
          {
            icon: <Wrench size={30} />,
            position: "bottom-[15%] left-1/4",
            delay: 2.5,
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.8, 0.4, 0.8],
              scale: [0.6, 1.3, 0.8, 1.2],
              rotate: [0, 20, -20, 10, -10, 0],
              y: [0, -15, 15, -10, 0],
              x: [0, 10, -10, 5, 0],
            }}
            transition={{
              duration: 6 + idx * 0.8,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
            className={`absolute ${item.position} text-indigo-400/50 hover:text-indigo-400/90 transition-colors duration-300`}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Enhanced Geometric shapes for decoration */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none -z-10">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 0.8, 1.2, 1],
            borderRadius: ["8px", "50%", "8px"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[20%] left-[8%] w-20 h-20 border-2 border-indigo-400/30 rounded-lg"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 0.7, 1.4, 1],
            x: [0, 20, -20, 0],
            y: [0, -15, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[25%] right-[8%] w-16 h-16 border-2 border-purple-400/40 rounded-full"
        />
        <motion.div
          animate={{
            y: [0, -25, 25, 0],
            x: [0, 15, -15, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [1, 1.5, 1],
            rotate: [0, 45, -45, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-[30%] right-[25%] w-12 h-12 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-lg"
        />
      </div>

      <div className="mx-auto max-w-4xl px-4">
        {/* Avatar + orbit animation */}
        <div className="grid place-items-center">
          <AnimatedAvatar />
        </div>

        {/* Name & tagline */}
        <motion.h1
          {...fadeUp(0.05)}
          className="mt-8 text-center text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight"
        >
          <span className="block text-xl sm:text-2xl font-medium mb-2 text-muted-foreground">
            Hello, I&apos;m
          </span>
          <span className="font-outfit bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x pb-2">
            Jayoda Pramuditha
          </span>
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
