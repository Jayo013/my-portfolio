"use client";

import Header from "@/component/layout/Header";
import Hero from "@/component/hero/Hero";
import Projects from "@/component/projects/projects";
import Skills from "@/component/skills/Skills";
import Experience from "@/component/experience/Experience";
import Contact from "@/component/contact/Contact";
import Footer from "@/component/layout/Footer";
import AboutMe from "@/component/about/AboutMe";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <AboutMe />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
