"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Section from "@/component/shared/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card";
import { Badge } from "@/component/ui/badge";
import { Github, ExternalLink, X, Code } from "lucide-react";
import Image from "next/image";
import { PROJECTS } from "@/data/Portfolio";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            onClick={() => setSelectedProject(p)}
          >
            <Card className="h-full overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer group">

              {/* 🔥 Image Banner */}
              {p.image && (
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Title + icons */}
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-3">
                  <span className="text-lg font-semibold">{p.title}</span>
                </CardTitle>
              </CardHeader>

              {/* Description + tech */}
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">{p.blurb}</p>

                <div className="flex flex-wrap gap-2">
                  {p.tech.slice(0, 3).map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                  {p.tech.length > 3 && (
                    <Badge variant="secondary">+{p.tech.length - 3}</Badge>
                  )}
                </div>

                {/* View details link */}
                <div className="flex items-center gap-2 text-primary mt-2 text-sm font-medium group-hover:underline">
                  <Code className="w-4 h-4" /> Code
                </div>
              </CardContent>

            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#1a1a2e] border border-indigo-500/20 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-white/10 text-white/70 hover:text-white transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="flex flex-col h-full overflow-y-auto">
                {/* Image */}
                <div className="relative w-full h-64 sm:h-80 shrink-0">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h3>
                    <p className="text-indigo-400 font-medium">2024-2025</p>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                    {selectedProject.blurb}
                    {/* You might want to add a longer description field to your data if needed */}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <Badge 
                        key={t} 
                        className="bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 border-indigo-500/20 px-3 py-1 text-sm"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    {selectedProject.links.github && (
                      <a
                        href={selectedProject.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                      >
                        <Code className="w-5 h-5" />
                        View Code
                      </a>
                    )}
                    {selectedProject.links.live && (
                      <a
                        href={selectedProject.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
}
