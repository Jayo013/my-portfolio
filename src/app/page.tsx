"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/component/layout/LoadingScreen";
import Header from "@/component/layout/Header";
import Hero from "@/component/hero/Hero";
import Projects from "@/component/projects/projects";
import Skills from "@/component/skills/Skills";
import Experience from "@/component/experience/Experience";
import Contact from "@/component/contact/Contact";
import BlogPosts from "@/component/blog/BlogPosts";
import Footer from "@/component/layout/Footer";
import AboutMe from "@/component/about/AboutMe";
import Education from "@/component/education/Education";
import BackgroundGlow from "@/component/layout/BackgroundGlow";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <BackgroundGlow />
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <Header />
          <Hero />
          <AboutMe />
          <Skills />
          <Education />
          <Experience />
          <Projects />
          <BlogPosts />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
}
