import React, { useEffect, useState } from "react";
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
import { ThemeProvider, useTheme } from "./utils/ThemeProvider";
import Lottie from "react-lottie";
import animationData from "./assets/Animations/loading/loading.json";

// Ensure critical styles are included and not purged
const CriticalStylesPreserver = () => {
  return (
    <div style={{ display: "none" }} aria-hidden="true">
      {/* These elements are not displayed, but ensure critical styles are preserved */}
      <div className="dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 backdrop-blur-md"></div>
      <div className="bg-white/20 border-white/20 text-slate-600"></div>
      <div className="dark:from-[#0f0a29] dark:via-[#191036] dark:to-[#1e0438]"></div>
      <div className="from-[#cbb4f0] via-[#b6a6e3] to-[#a28cd1]"></div>
    </div>
  );
};

function AppContent() {
  // Add states for loading and animations
  const [loading, setLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const { theme } = useTheme();


  // Initialize scroll snap functionality
  useScrollSnap();

  // Set up loading effect
  useEffect(() => {
    // Simulate loading time or wait for resources
    const timer = setTimeout(() => {
      // Start fade-out animation
      setIsFadingOut(true);

      // Set loading to false AND make content visible after animation completes
      const animationTimer = setTimeout(() => {
        setContentVisible(true); // Set content visible first
        requestAnimationFrame(() => {
          setLoading(false); // Then remove loading screen on next frame
        });
      }, 200); // Slightly shorter than animation duration

      return () => clearTimeout(animationTimer);
    }, 2500); // Show loading animation for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Get dynamic animation size based on viewport
  const getAnimationSize = () => {
    if (typeof window === "undefined") return { width: 400, height: 400 };

    // These breakpoints align with Tailwind's defaults
    if (window.innerWidth < 640) return { width: 280, height: 280 }; // Small screens
    if (window.innerWidth < 1024) return { width: 350, height: 350 }; // Medium screens
    return { width: 400, height: 400 }; // Large screens
  };

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
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
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
      <CriticalStylesPreserver />
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
