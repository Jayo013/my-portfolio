// src/component/shared/Section.tsx
import * as React from "react";

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
        <h2 className="text-center text-3xl sm:text-4xl font-bold mb-10">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
