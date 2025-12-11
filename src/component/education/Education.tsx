"use client";

import { motion } from "framer-motion";
import Section from "@/component/shared/Section";
import { Card, CardHeader, CardTitle } from "@/component/ui/card";
import { EDUCATION } from "@/data/Portfolio";
import { GraduationCap, Calendar, Building2 } from "lucide-react";
import Image from "next/image";

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="relative max-w-4xl mx-auto px-4">
        {/* Vertical Line */}
        <div className="absolute left-8 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent transform md:-translate-x-1/2" />

        <div className="space-y-12">
          {EDUCATION.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              } items-start md:items-center gap-8`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-indigo-500 rounded-full border-4 border-background transform -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(99,102,241,0.5)] mt-6 md:mt-0" />

              {/* Content Card */}
              <div className={`w-full md:w-[calc(50%-2rem)] pl-16 md:pl-0`}>
                <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 group relative">
                  {/* Gradient Border Effect */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="relative w-12 h-12 rounded-xl bg-white/10 p-2 flex items-center justify-center overflow-hidden group-hover:bg-white/20 transition-colors">
                        {edu.logo ? (
                          <Image 
                            src={edu.logo} 
                            alt={edu.institution} 
                            fill 
                            className="object-contain p-1"
                          />
                        ) : (
                          <GraduationCap className="w-6 h-6 text-indigo-400" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full border border-border/50">
                        <Calendar className="w-3 h-3" />
                        {edu.period}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-indigo-400 transition-colors">
                      {edu.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mt-1">
                      <Building2 className="w-4 h-4" />
                      {edu.institution}
                    </div>
                  </CardHeader>
                </Card>
              </div>
              
              {/* Empty div for spacing on the other side for desktop */}
              <div className="hidden md:block w-[calc(50%-2rem)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
