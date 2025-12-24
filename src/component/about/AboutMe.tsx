"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code2, Coffee, Award, UserCheck } from "lucide-react";

export default function AboutMe() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          About <span className="text-primary">Me</span>
        </motion.h2>

        {/* Main Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid gap-12 sm:grid-cols-2 items-center"
        >
          {/* Left: Profile Image */}
          <div className="flex justify-center">
            <Image
              src="/avatar.jpg"
              alt="Avatar"
              width={400}
              height={500}
              className="rounded-2xl shadow-lg object-cover"
            />
          </div>

          {/* Right: About Text */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Hello, I'm <span className="text-primary">Jayoda Pramuditha</span>
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              I am a highly motivated developer with a strong passion for
              building scalable, high-performance applications. With expertise
              across both front-end and back-end development, I specialize in
              crafting seamless user experiences and architecting efficient,
              robust solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              My skill set includes full-stack development using React, Next.js,
              Node.js, and Tailwind CSS. On the backend, I design scalable
              microservices and APIs with cloud solutions like AWS, Docker, and
              CI/CD pipelines to deploy and manage applications efficiently.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: Award, label: "Experience", value: "1+", sub: "Years" },
                { icon: Code2, label: "Projects", value: "5+", sub: "Completed" },
                { icon: Coffee, label: "Coffee", value: "1k+", sub: "Cups" },
                { icon: UserCheck, label: "Clients", value: "100%", sub: "Satisfaction" },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-2xl bg-gray-900 dark:bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:text-indigo-300 transition-colors">
                      <stat.icon size={18} />
                    </div>
                    <span className="text-[10px] font-medium text-gray-400 dark:text-muted-foreground/60 uppercase tracking-wider">{stat.sub}</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-300 dark:text-muted-foreground font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
