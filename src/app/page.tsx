import Header from "@/component/layout/Header";
import Hero from "@/component/hero/Hero";
import Projects from "@/component/projects/Projects";
import Skills from "@/component/skills/Skills";
import Experience from "@/component/experience/Experience";
import Education from "@/component/education/Education";
import Articles from "@/component/articles/Articles";
import Contact from "@/component/contact/Contact";
import Footer from "@/component/layout/Footer";
import AboutMe from "@/component/about/AboutMe";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main id="main-content">
        <Hero />
        <AboutMe />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Articles />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
