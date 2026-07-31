"use client";

import { Briefcase } from "lucide-react";
import Section from "@/component/shared/Section";
import Reveal from "@/component/shared/Reveal";
import { EXPERIENCE } from "@/data/Portfolio";
import { Briefcase, Calendar } from "lucide-react";

export default function Experience() {
  return (
    <Section id="experience" title="Experience Timeline">
      <div className="relative mx-auto max-w-3xl">
        {/* Connecting line */}
        <div
          aria-hidden
          className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-neon-cyan via-primary/40 to-transparent shadow-[0_0_8px_rgba(var(--glow-cyan-rgb),0.5)] sm:left-7"
        />

        <div className="space-y-8">
          {EXPERIENCE.map((job, i) => (
            <Reveal key={job.id} delay={i * 0.1}>
              <div className="relative flex gap-5 sm:gap-6">
                {/* Icon node */}
                <div className="glow-violet relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-card sm:size-14">
                  <Briefcase className="size-5 text-primary sm:size-6" />
                </div>

                {/* Card */}
                <div className="glass-panel hover-lift group flex-1 rounded-2xl border border-primary/25 p-5 sm:p-6">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-semibold leading-snug">
                      {job.role} · {job.company}
                    </h3>
                    <span className="shrink-0 rounded-full border border-primary/25 bg-white/5 px-3 py-1 text-xs font-medium text-muted-foreground sm:ml-4">
                      {job.period}
                    </span>
                  </div>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    {job.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
