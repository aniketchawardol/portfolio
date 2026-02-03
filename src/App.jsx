import React, { useEffect, useState, lazy, Suspense, useMemo } from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";
import { useScrollSnap, setGlobalScrollTo } from "./utils/scrollSnap";
import { useLenis } from "./hooks/useLenis";
import Lottie from "react-lottie";
import animationData from "./assets/Animations/loading/loading.json";
import { getAnimationSize } from "./utils/helpers";
import { ANIMATION_SETTINGS } from "./constants";

const GitHubStats = lazy(() => import("./components/GitHubStats"));
const ProjectsSection = lazy(() => import("./components/ProjectsSection"));

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [animationSize, setAnimationSize] = useState(getAnimationSize());
  const { scrollTo } = useLenis();

  useScrollSnap();

  useEffect(() => {
    if (scrollTo) setGlobalScrollTo(scrollTo);
  }, [scrollTo]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const fadeTimer = setTimeout(() => {
        setLoading(false);
      }, ANIMATION_SETTINGS.loading.fadeOutDuration);
      return () => clearTimeout(fadeTimer);
    }, ANIMATION_SETTINGS.loading.duration);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setAnimationSize(getAnimationSize());
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const defaultOptions = useMemo(
    () => ({
      ...ANIMATION_SETTINGS.lottie.defaultOptions,
      animationData: animationData,
    }),
    [],
  );

  if (loading) {
    return (
      <div
        className={`fixed inset-0 w-screen h-screen flex items-center justify-center overflow-hidden z-50 
        bg-[#000000] northern-lights 
        ${isFadingOut ? "fade-out" : ""}`}
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
    <div className="">
      <Navigation />
      <div id="home" className="snap-section relative -mb-[200px] ">
        <HeroSection />
      </div>
      <img
        src="./gradient.png"
        className="w-full h-[400px] object-fit blur-[40px] relative z-5 opacity-100 transition-all duration-300 transform-fill"
      />
      <div
        id="about"
        className="snap-section relative -mt-[160px] overflow-visible"
      >
        <AboutSection />
      </div>
      <div id="skills" className="snap-section">
        <SkillsSection />
      </div>
      <Suspense
        fallback={
          <div className="w-full min-h-screen flex items-center justify-center bg-[#000000]">
            <div className="text-2xl text-white font-mono">Loading...</div>
          </div>
        }
      >
        <div id="github" className="snap-section">
          <GitHubStats />
        </div>
      </Suspense>
      <Suspense
        fallback={
          <div className="w-full min-h-screen flex items-center justify-center bg-[#000000]">
            <div className="text-2xl text-white font-mono">Loading...</div>
          </div>
        }
      >
        <div id="projects" className="snap-section">
          <ProjectsSection />
        </div>
      </Suspense>
      <div id="contact" className="snap-section">
        <ContactSection />
      </div>
    </div>
  );
}

export default AppContent;
