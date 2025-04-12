import React, { useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import DSASkills from "./components/DSASkills";
import GitHubStats from "./components/GitHubStats";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import { useScrollSnap } from "./utils/scrollSnap";
import { ThemeProvider } from "./utils/ThemeProvider";

function App() {
  // Initialize scroll snap functionality
  useScrollSnap();

  // Prevent default scroll behavior for keyboard navigation
  useEffect(() => {
    const preventDefaultScroll = (e) => {
      if (
        [
          "ArrowDown",
          "ArrowUp",
          "Space",
          "PageDown",
          "PageUp",
          "Home",
          "End",
        ].includes(e.code)
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", preventDefaultScroll);
    return () => window.removeEventListener("keydown", preventDefaultScroll);
  }, []);

  return (
    <ThemeProvider>
      <Navigation />
      <div id="home" className="snap-section">
        <HeroSection />
      </div>
      <div id="about" className="snap-section">
        <AboutSection />
      </div>
      <div id="skills" className="snap-section">
        <SkillsSection />
      </div>
      <div id="dsa" className="snap-section">
        <DSASkills />
      </div>
      <div id="github" className="snap-section">
        <GitHubStats />
      </div>
      <div id="projects" className="snap-section">
        <ProjectsSection />
      </div>
      <div id="contact" className="snap-section">
        <ContactSection />
      </div>
    </ThemeProvider>
  );
}

export default App;
