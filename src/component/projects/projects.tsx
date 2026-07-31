"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Section from "@/component/shared/Section";
import TiltCard from "@/component/shared/TiltCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card";
import { Badge } from "@/component/ui/badge";
import { Github, ExternalLink, Radar } from "lucide-react";
import { PROJECTS, type Project } from "@/data/Portfolio";
import ImageWithFallback from "@/component/shared/ImageWithFallback";
import ProjectModal from "@/component/projects/ProjectModal";

function StatusPill({ status }: { status: NonNullable<Project["status"]> }) {
  const isDone = status === "COMPLETED";
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-heading font-semibold uppercase tracking-[0.2em]",
        isDone
          ? "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan shadow-[0_0_10px_rgba(var(--glow-cyan-rgb),0.3)]"
          : "border-amber-400/40 bg-amber-400/10 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)]",
      ].join(" ")}
    >
      <span className={`size-1.5 rounded-full ${isDone ? "bg-neon-cyan" : "bg-amber-300 animate-pulse"}`} />
      {status}
    </span>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Section id="projects" title="Mission Log">
      <p className="mx-auto max-w-3xl text-center text-muted-foreground mb-8 sm:mb-10 -mt--2">
        Completed and active builds — each one a mission with its own objective, loadout, and outcome.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <TiltCard className="h-full">
              <Card
                className="h-full overflow-hidden group cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() => setSelected(p)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(p);
                  }
                }}
              >
                <div className="relative">
                  <ImageWithFallback
                    src={p.image}
                    alt={p.title}
                    wrapperClassName="aspect-video w-full [clip-path:inset(0_0_0_0)]"
                  />
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-primary/30 bg-background/70 px-2.5 py-1 text-[10px] font-heading font-semibold uppercase tracking-[0.2em] text-neon-cyan backdrop-blur-md">
                    <Radar className="h-3 w-3" />
                    Mission {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute right-3 top-3">
                    <StatusPill status={p.status ?? "COMPLETED"} />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-start justify-between gap-3">
                    <span>{p.title}</span>
                    <div className="shrink-0 flex gap-2">
                      {p.links.github && (
                        <a href={p.links.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="rounded-lg border border-transparent p-2 transition hover:border-neon-cyan/40 hover:text-neon-cyan hover:shadow-[0_0_12px_rgba(var(--glow-cyan-rgb),0.3)]" aria-label="GitHub">
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {p.links.live && (
                        <a href={p.links.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="rounded-lg border border-transparent p-2 transition hover:border-neon-cyan/40 hover:text-neon-cyan hover:shadow-[0_0_12px_rgba(var(--glow-cyan-rgb),0.3)]" aria-label="Live site">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {p.role && (
                    <p className="text-xs font-medium uppercase tracking-wide text-primary">{p.role}</p>
                  )}
                  <p className="text-sm text-muted-foreground">{p.blurb}</p>
                  <div>
                    <p className="mb-2 text-[10px] font-heading uppercase tracking-[0.25em] text-muted-foreground/70">
                      Loadout
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TiltCard>
          </motion.div>
        ))}
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
