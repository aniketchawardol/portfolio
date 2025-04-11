import React from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import DSASkills from "./components/DSASkills";
import GitHubStats from "./components/GitHubStats";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";

function App() {
  return (
    <>
      <Navigation />
      <div id="home">
        <HeroSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="skills">
        <SkillsSection />
      </div>
      <div id="dsa">
        <DSASkills />
      </div>
      <div id="github">
        <GitHubStats />
      </div>
      <div id="projects">
        <ProjectsSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </>
  );
}

export default App;
