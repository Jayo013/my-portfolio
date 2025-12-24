"use client";

import { motion } from "framer-motion";
import Section from "@/component/shared/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card";
import { EXPERIENCE } from "@/data/Portfolio";
import { Briefcase, Calendar } from "lucide-react";

export default function Experience() {
  return (
    <Section id="experience" title="Experience & Education">
      <div className="space-y-4">
        {EXPERIENCE.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:border-gray-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/10 dark:hover:shadow-indigo-500/10 group relative overflow-hidden">
              {/* Gradient Border Effect */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gray-700 to-black dark:from-indigo-500 dark:to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-gray-800 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-white dark:text-indigo-300" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base group-hover:text-gray-700 dark:group-hover:text-indigo-400 transition-colors">
                        {job.role}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{job.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full border border-border/50 flex-shrink-0">
                    <Calendar className="w-3 h-3" />
                    {job.period}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  {job.points.map((pt, idx) => (
                    <motion.li
                      key={`${job.id}-${idx}`}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 }}
                    >
                      {pt}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
