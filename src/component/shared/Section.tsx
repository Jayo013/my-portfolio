// src/component/shared/Section.tsx
import * as React from "react";
import Reveal from "@/component/shared/Reveal";

type SectionProps = {
  id: string;
  title: React.ReactNode;       // can be string or JSX
  children: React.ReactNode;
};

export default function Section({
  id,
  title,
  children,
}: SectionProps) {
  return (
    <section id={id} className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal y={16}>
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-glow mb-2">
            {title}
          </h2>
          <span className="section-heading-accent mb-10 sm:mb-12" aria-hidden="true" />
        </Reveal>
        {children}
      </div>
    </section>
  );
}
