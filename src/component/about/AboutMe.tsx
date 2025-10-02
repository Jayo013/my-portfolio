"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
              <div className="p-4 rounded-xl bg-card shadow">
                <p className="text-xl font-bold text-primary">1+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="p-4 rounded-xl bg-card shadow">
                <p className="text-xl font-bold text-primary">5+</p>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </div>
              <div className="p-4 rounded-xl bg-card shadow">
                <p className="text-xl font-bold text-primary">1,000+</p>
                <p className="text-sm text-muted-foreground">Cups of Coffee</p>
              </div>
              <div className="p-4 rounded-xl bg-card shadow">
                <p className="text-xl font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
