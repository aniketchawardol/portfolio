import React from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import DSASkills from "./components/DSASkills";
import GitHubStats from "./components/GitHubStats";

function App() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <DSASkills />
      <GitHubStats />
    </>
  );
}

export default App;
