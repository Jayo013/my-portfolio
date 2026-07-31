"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, ExternalLink, X } from "lucide-react";
import { Badge } from "@/component/ui/badge";
import ImageWithFallback from "@/component/shared/ImageWithFallback";
import type { Project } from "@/data/Portfolio";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-lg border border-primary/30 bg-card text-card-foreground shadow-[0_0_40px_-8px_rgba(var(--glow-violet-rgb),0.5)]"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-full bg-background/70 p-2 text-foreground/80 backdrop-blur-sm transition hover:text-neon-cyan hover:shadow-[0_0_12px_rgba(var(--glow-cyan-rgb),0.4)]"
            >
              <X className="h-4 w-4" />
            </button>

            <ImageWithFallback src={project.image} alt={project.title} wrapperClassName="aspect-video w-full" />

            <div className="space-y-4 p-6">
              <div className="flex items-center gap-2">
                <span
                  className={[
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-heading font-semibold uppercase tracking-[0.2em]",
                    (project.status ?? "COMPLETED") === "COMPLETED"
                      ? "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan"
                      : "border-amber-400/40 bg-amber-400/10 text-amber-300",
                  ].join(" ")}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      (project.status ?? "COMPLETED") === "COMPLETED" ? "bg-neon-cyan" : "bg-amber-300 animate-pulse"
                    }`}
                  />
                  {project.status ?? "COMPLETED"}
                </span>
              </div>

              <h3 className="font-heading text-xl font-semibold text-primary">{project.title}</h3>

              {project.role && (
                <p className="text-xs font-medium uppercase tracking-wide text-primary">{project.role}</p>
              )}

              <p className="text-sm text-muted-foreground">{project.blurb}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-neon-cyan"
                  >
                    <Github className="h-4 w-4" /> View Code
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-neon-cyan"
                  >
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
