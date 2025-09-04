import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import GitHubStats from "./components/GitHubStats";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import { useScrollSnap, setGlobalScrollTo } from "./utils/scrollSnap";
import { ThemeProvider } from "./utils/ThemeProvider";
import { useLenis } from "./hooks/useLenis";
import Lottie from "react-lottie";
import animationData from "./assets/Animations/loading/loading.json";
import { getAnimationSize } from "./utils/helpers";
import { ANIMATION_SETTINGS } from "./constants";

function AppContent() {
  // Add states for loading and animations
  const [loading, setLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  // Initialize Lenis smooth scroll
  const { scrollTo } = useLenis();

  // Initialize scroll snap functionality
  useScrollSnap();

  // Connect Lenis scrollTo with global scroll utility
  useEffect(() => {
    if (scrollTo) {
      setGlobalScrollTo(scrollTo);
    }
  }, [scrollTo]);

  // Set up loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const animationTimer = setTimeout(() => {
        setContentVisible(true);
        requestAnimationFrame(() => {
          setLoading(false);
        });
      }, ANIMATION_SETTINGS.loading.fadeOutDuration);
      return () => clearTimeout(animationTimer);
    }, ANIMATION_SETTINGS.loading.duration);

    return () => clearTimeout(timer);
  }, []);

  const [animationSize, setAnimationSize] = useState(getAnimationSize());

  // Update animation size on window resize
  useEffect(() => {
    const handleResize = () => {
      setAnimationSize(getAnimationSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lottie animation options
  const defaultOptions = {
    ...ANIMATION_SETTINGS.lottie.defaultOptions,
    animationData: animationData,
  };

  // Conditionally render loading animation or main content
  if (loading) {
    return (
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 w-screen h-screen flex items-center justify-center overflow-hidden z-50 
        bg-gradient-to-b from-[#cbb4f0] via-[#b6a6e3] to-[#a28cd1] dark:from-[#0f0a29] dark:via-[#191036] dark:to-[#1e0438] dark:northern-lights 
        ${isFadingOut ? "fade-out" : ""}`}
        style={{
          minHeight: "100%",
          minWidth: "100%",
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-full p-4">
          <Lottie
            options={defaultOptions}
            height={animationSize.height}
            width={animationSize.width}
            isClickToPauseDisabled={true}
            style={{ maxWidth: "100vw" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`${contentVisible ? "fade-in" : "opacity-0"}`}>
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
      <div id="github" className="snap-section">
        <GitHubStats />
      </div>
      <div id="projects" className="snap-section">
        <ProjectsSection />
      </div>
      <div id="contact" className="snap-section">
        <ContactSection />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
