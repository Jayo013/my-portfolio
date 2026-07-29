"use client";

import { useMemo, useState } from "react";
import type { IconType } from "react-icons";
import {
  TbBrandReact,
  TbBrandJavascript,
  TbBrandTypescript,
  TbBrandHtml5,
  TbBrandCss3,
  TbBrandBootstrap,
  TbBrandTailwind,
  TbBrandNextjs,
  TbBrandNodejs,
  TbBrandCSharp,
  TbApi,
  TbBrandMongodb,
  TbBrandMysql,
  TbBrandSupabase,
  TbBrandAws,
  TbBrandAzure,
  TbBrandDocker,
  TbBrandGit,
  TbBrandGithub,
  TbBrandVscode,
  TbBrandFigma,
  TbBrandVite,
  TbBrandFramerMotion,
  TbBrandPython,
} from "react-icons/tb";
import {
  SiExpress,
  SiDotnet,
  SiPostgresql,
  SiPostman,
  SiIntellijidea,
  SiFirebase,
  SiGooglecloud,
} from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";
import { FaJava } from "react-icons/fa6";
import Section from "@/component/shared/Section";
import Reveal from "@/component/shared/Reveal";
import TiltCard from "@/component/shared/TiltCard";

type Category = "Frontend" | "Backend" | "Database" | "Cloud" | "Tools";
type Tier = "Expert" | "Advanced" | "Proficient" | "Familiar";

type Skill = {
  name: string;
  icon: IconType;
  category: Category;
  tier: Tier;
};

const TIER_PERCENT: Record<Tier, number> = {
  Expert: 95,
  Advanced: 80,
  Proficient: 65,
  Familiar: 45,
};

const CATEGORY_META: Record<Category, { label: string; subtitle: string }> = {
  Frontend: { label: "Frontend", subtitle: "Frontend Master Level" },
  Backend: { label: "Backend", subtitle: "Backend Engine Level" },
  Database: { label: "Database", subtitle: "Database Core Level" },
  Cloud: { label: "Cloud", subtitle: "Cloud Architect Level" },
  Tools: { label: "Tools", subtitle: "Tools & Workflow Level" },
};

const CATEGORY_ORDER: Category[] = ["Frontend", "Backend", "Database", "Cloud", "Tools"];

const SKILLS: Skill[] = [
  // Frontend
  { name: "React", icon: TbBrandReact, category: "Frontend", tier: "Proficient" },
  { name: "JavaScript", icon: TbBrandJavascript, category: "Frontend", tier: "Proficient" },
  { name: "TypeScript", icon: TbBrandTypescript, category: "Frontend", tier: "Proficient" },
  { name: "HTML5", icon: TbBrandHtml5, category: "Frontend", tier: "Proficient" },
  { name: "CSS3", icon: TbBrandCss3, category: "Frontend", tier: "Proficient" },
  { name: "Bootstrap", icon: TbBrandBootstrap, category: "Frontend", tier: "Familiar" },
  { name: "Tailwind CSS", icon: TbBrandTailwind, category: "Frontend", tier: "Proficient" },
  { name: "Next.js", icon: TbBrandNextjs, category: "Frontend", tier: "Proficient" },
  { name: "Framer Motion", icon: TbBrandFramerMotion, category: "Frontend", tier: "Proficient" },

  // Backend
  { name: "Node.js", icon: TbBrandNodejs, category: "Backend", tier: "Proficient" },
  { name: "Express", icon: SiExpress, category: "Backend", tier: "Advanced" },
  { name: "C#", icon: TbBrandCSharp, category: "Backend", tier: "Proficient" },
  { name: ".NET", icon: SiDotnet, category: "Backend", tier: "Proficient" },
  { name: "REST APIs", icon: TbApi, category: "Backend", tier: "Advanced" },
  { name: "Python", icon: TbBrandPython, category: "Backend", tier: "Proficient" },
  { name: "Java", icon: FaJava, category: "Backend", tier: "Familiar" },

  // Database
  { name: "SQL Server", icon: DiMsqlServer, category: "Database", tier: "Proficient" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "Database", tier: "Proficient" },
  { name: "MongoDB", icon: TbBrandMongodb, category: "Database", tier: "Proficient" },
  { name: "MySQL", icon: TbBrandMysql, category: "Database", tier: "Proficient" },
  { name: "Supabase", icon: TbBrandSupabase, category: "Database", tier: "Familiar" },
  { name: "Firebase", icon: SiFirebase, category: "Database", tier: "Advanced" },

  // Cloud
  { name: "AWS", icon: TbBrandAws, category: "Cloud", tier: "Proficient" },
  { name: "Azure", icon: TbBrandAzure, category: "Cloud", tier: "Familiar" },
  { name: "Google Cloud Platform", icon: SiGooglecloud, category: "Cloud", tier: "Proficient" },
  { name: "Docker", icon: TbBrandDocker, category: "Cloud", tier: "Proficient" },

  // Tools
  { name: "Git", icon: TbBrandGit, category: "Tools", tier: "Advanced" },
  { name: "GitHub", icon: TbBrandGithub, category: "Tools", tier: "Proficient" },
  { name: "VS Code", icon: TbBrandVscode, category: "Tools", tier: "Familiar" },
  { name: "Figma", icon: TbBrandFigma, category: "Tools", tier: "Familiar" },
  { name: "Postman", icon: SiPostman, category: "Tools", tier: "Familiar" },
  { name: "Vite", icon: TbBrandVite, category: "Tools", tier: "Familiar" },
  { name: "IntelliJ IDEA", icon: SiIntellijidea, category: "Tools", tier: "Familiar" },
];

function SkillCard({ name, icon: Icon, tier }: Skill) {
  const percent = TIER_PERCENT[tier];
  return (
    <TiltCard className="h-full">
      <div className="glass-panel hover-lift relative overflow-hidden rounded-2xl border border-primary/20 p-5 h-full flex flex-col">
        <div className="hud-shimmer" aria-hidden="true" />
        <div className="flex items-center gap-3">
          <div
            className="grid place-items-center rounded-xl bg-primary/10 border border-primary/20 size-11 shrink-0 transition-transform
                       group-hover:scale-110 group-hover:border-neon-cyan/50 group-hover:shadow-[0_0_16px_rgba(var(--glow-cyan-rgb),0.35)]"
          >
            <Icon className="h-5 w-5 text-foreground/90" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="font-heading text-sm font-semibold text-foreground truncate">{name}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-neon-cyan/80">{tier}</p>
          </div>
        </div>

        {/* Level bar */}
        <div className="mt-4 h-[6px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7b2cbf] via-[#2563eb] to-[rgb(var(--glow-cyan-rgb))] shadow-[0_0_10px_rgba(var(--glow-cyan-rgb),0.5)] transition-[width] duration-1000 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </TiltCard>
  );
}

export default function Skills() {
  const [active, setActive] = useState<"All" | Category>("All");

  const visibleCategories = useMemo(
    () => (active === "All" ? CATEGORY_ORDER : [active]),
    [active]
  );

  return (
    <Section id="skills" title="Developer Skill Arsenal">
      {/* Subtitle */}
      <p className="mx-auto max-w-3xl text-muted-foreground mb-8 sm:mb-10">
        A categorized loadout of technologies, tools, and platforms unlocked and leveled up through
        real projects, coursework, and hands-on experience.
      </p>

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
        {(["All", ...CATEGORY_ORDER] as const).map((cat) => {
          const selected = cat === active;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={[
                "rounded-full px-4 py-2 font-heading text-sm font-medium tracking-wide border transition-all duration-300",
                selected
                  ? "bg-[linear-gradient(120deg,#7b2cbf,#2563eb)] text-white border-transparent shadow-[0_0_16px_rgba(var(--glow-violet-rgb),0.5)]"
                  : "bg-white/5 backdrop-blur-md text-foreground/80 border-primary/25 hover:border-neon-cyan/50 hover:text-neon-cyan",
              ].join(" ")}
            >
              {cat === "All" ? "All Skills" : cat}
            </button>
          );
        })}
      </div>

      {/* Category sections */}
      <div className="space-y-12 sm:space-y-16">
        {visibleCategories.map((cat) => {
          const meta = CATEGORY_META[cat];
          const skills = SKILLS.filter((s) => s.category === cat);
          return (
            <Reveal key={cat}>
              <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-primary/15 pb-3">
                <h3 className="font-display text-lg sm:text-xl font-bold text-glow-cyan uppercase tracking-wide">
                  {meta.label}
                </h3>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {meta.subtitle}
                </span>
              </div>
              <div className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {skills.map((skill) => (
                  <SkillCard key={skill.name} {...skill} />
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
