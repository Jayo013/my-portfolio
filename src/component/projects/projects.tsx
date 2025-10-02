"use client";
import { motion } from "framer-motion";
import Section from "@/component/shared/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card";
import { Badge } from "@/component/ui/badge";
import { Github, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/data/Portfolio";

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-3">
                  <span>{p.title}</span>
                  <div className="shrink-0 flex gap-2">
                    {p.links.github && (
                      <a href={p.links.github} target="_blank" className="p-2 rounded-lg hover:bg-muted" aria-label="GitHub">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {p.links.live && (
                      <a href={p.links.live} target="_blank" className="p-2 rounded-lg hover:bg-muted" aria-label="Live site">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{p.blurb}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
