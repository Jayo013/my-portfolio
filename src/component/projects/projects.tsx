"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Section from "@/component/shared/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card";
import { Badge } from "@/component/ui/badge";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { PROJECTS } from "@/data/Portfolio";

export default function Projects() {
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
          >
            <Card className="h-full overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer">

              {/* 🔥 Image Banner */}
              {p.image && (
                <div className="relative h-44 w-full">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover"
                  />

                  {/* Featured Badge (Optional) */}
                  {/*p.featured && (
                    <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                     Featured
                    </div>
                  )*/}
                </div>
              )}

              {/* Title + icons */}
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-3">
                  <span className="text-lg font-semibold">{p.title}</span>

                  <div className="flex gap-2 shrink-0">
                    {p.links.github && (
                      <a
                        href={p.links.github}
                        target="_blank"
                        className="p-2 rounded-lg hover:bg-muted transition"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}

                    {p.links.live && (
                      <a
                        href={p.links.live}
                        target="_blank"
                        className="p-2 rounded-lg hover:bg-muted transition"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>

              {/* Description + tech */}
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{p.blurb}</p>

                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>

                {/* View details link */}
                <button className="text-primary mt-2 text-sm font-medium hover:underline">
                  View Details →
                </button>
              </CardContent>

            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
