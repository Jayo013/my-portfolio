"use client";

import { useMemo, useState } from "react";
import Section from "@/component/shared/Section";

type Category =
  | "Frontend"
  | "Backend"
  | "Design"
  | "Tools"
  | "Languages"
  | "AI & ML";

type Skill = {
  name: string;
  icon: string; // path in /public/skills (or emoji string)
  categories: Category[];
};

const CATEGORIES: (Category | "All Skills")[] = [
  "All Skills",
  "Frontend",
  "Backend",
  "Design",
  "Tools",
  "Languages",
  "AI & ML",
];

const SKILLS: Skill[] = [
  // Frontend
  { name: "React", icon: "/skills/React.png", categories: ["Frontend"] },
  { name: "TypeScript", icon: "/skills/TypeScript.png", categories: ["Languages", "Frontend", "Tools"] },
  { name: "JavaScript", icon: "/skills/JavaScript.png", categories: ["Languages", "Frontend"] },
  { name: "HTML5", icon: "/skills/HTML5.png", categories: ["Frontend"] },
  { name: "CSS3", icon: "/skills/CSS3.png", categories: ["Frontend"] },
  { name: "Tailwind CSS", icon: "/skills/Tailwind CSS.png", categories: ["Frontend", "Tools"] },
  { name: "Framer Motion", icon: "/skills/framer-motion.png", categories: ["Frontend", "Tools"] },
  { name: "Next.js", icon: "/skills/Next.js.png", categories: ["Frontend", "Tools"] },

  // Backend
  { name: "Node.js", icon: "/skills/Node.js.png", categories: ["Backend", "Tools"] },
  { name: "Express", icon: "/skills/Express.png", categories: ["Backend"] },
  { name: "REST API", icon: "/skills/Postman.png", categories: ["Backend"] },
  { name: "PostgreSQL", icon: "/skills/PostgresSQL.png", categories: ["Backend", "Tools"] },
  { name: "MongoDB", icon: "/skills/MongoDB.png", categories: ["Backend", "Tools"] },
  { name: "MySQL", icon: "/skills/MySQL.png", categories: ["Backend", "Tools"] },

  // Design
  { name: "Figma", icon: "/skills/Figma.png", categories: ["Design"] },
  { name: "UI/UX Design", icon: "/skills/UiUX.png", categories: ["Design"] },
  { name: "Responsive Design", icon: "/skills/diamond.png", categories: ["Design", "Frontend"] },

  // Tools
  { name: "Git", icon: "/skills/Git.png", categories: ["Tools"] },
  { name: "Docker", icon: "/skills/Docker.png", categories: ["Tools"] },
  { name: "Vite", icon: "/skills/Vite.js.png", categories: ["Tools", "Frontend"] },
  { name: "IntelliJ IDEA", icon: "/skills/IntelliJ IDEA.png", categories: ["Tools", "Frontend"] },

  // Languages
  { name: "Python", icon: "/skills/Python.png", categories: ["Languages"] },
  { name: "Java", icon: "/skills/Java.png", categories: ["Languages"] },
  { name: "C#", icon: "/skills/CSharp.png", categories: ["Languages"] },
];

function SkillCard({ name, icon }: Skill) {
  const isEmoji = icon && !icon.startsWith("/");
  return (
    <div
      className="group rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-md hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-300
                 p-6 sm:p-7 flex flex-col items-center justify-center text-center min-h-[140px] hover:scale-105 hover:-translate-y-1"
    >
      <div
        className="grid place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 size-16 mb-4 transition-all duration-300
                   group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-primary/20 border border-primary/20"
      >
        {isEmoji ? (
          <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={icon} alt={name} className="h-9 w-9 object-contain group-hover:scale-110 transition-transform duration-300 filter group-hover:brightness-110" />
        )}
      </div>
      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{name}</p>
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All Skills");

  const filtered = useMemo(() => {
    if (active === "All Skills") return SKILLS;
    return SKILLS.filter((s) => s.categories.includes(active as Category));
  }, [active]);

  return (
    <Section id="skills" title="My Skills">
      {/* Subtitle */}
      <p className="mx-auto max-w-3xl text-muted-foreground mb-8 sm:mb-10">
        A comprehensive collection of technologies, tools, and methodologies I’ve mastered
        throughout my journey as a developer.
      </p>

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
        {CATEGORIES.map((cat) => {
          const selected = cat === active;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={[
                "rounded-full px-4 py-2 text-sm border transition",
                selected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted text-foreground hover:bg-muted/80 border-transparent",
              ].join(" ")}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid — 7 columns at very wide screens */}
      <div className="
        grid gap-4 sm:gap-5
        grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8
      ">
        {filtered.map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </div>
    </Section>
  );
}
