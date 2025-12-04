import { useState, useEffect, useRef, useCallback, memo } from "react";
import RotatingText from "../assets/TextAnimations/RotatingText/RotatingText";
import { GradualSpacing } from "./GradualSpacing";
import { useDeviceDetection } from "../hooks/useDeviceDetection";
import { ROTATING_TEXTS, ANIMATION_SETTINGS } from "../constants";

const HeroSection = memo(() => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [meteorActive, setMeteorActive] = useState(false);
  const sectionRef = useRef(null);
  const rafIdRef = useRef(null);
  const { isTouchDevice } = useDeviceDetection();

  const handleScroll = useCallback(() => {
    if (!rafIdRef.current && window.scrollY > 10 && !hasScrolled) {
      rafIdRef.current = requestAnimationFrame(() => {
        setHasScrolled(true);
        rafIdRef.current = null;
      });
    }
  }, [hasScrolled]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    // Delay meteor shower activation to prevent seeing initial positions
    const timer = setTimeout(() => {
      setMeteorActive(true);
    }, ANIMATION_SETTINGS.meteors.activationDelay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-gradient-to-b from-[#0f0a29] via-[#191036] to-[#1e0438] northern-lights relative h-screen pt-20"
    >
      <div className="absolute mt-[20%] md:mt-[10%] ml-[20%] lg:ml-[40%] h-[300px] w-[300px] rounded-full z-10 bg-gradient-to-bl from-purple-900 shadow-[0_0_100px_40px_#4c1d95]"></div>

      {/* Meteor shower */}
      {meteorActive && (
        <div className="meteor-shower">
          <div className="meteor"></div>
          <div className="meteor"></div>
          <div className="meteor"></div>
          <div className="meteor"></div>
          <div className="meteor"></div>
          <div className="meteor"></div>
          <div className="meteor"></div>
        </div>
      )}

      <div className="relative w-screen z-10 lg:ml-[20%] mt-[40%] md:mt-[20%] lg:mt-[13%] flex lg:items-end overflow-hidden">
        <GradualSpacing
          text="ANIKET"
          duration={ANIMATION_SETTINGS.gradualSpacing.duration}
          delayMultiple={ANIMATION_SETTINGS.gradualSpacing.delayMultiple}
          className="text-[100px] lg:text-[150px] font-moonwalk text-slate-200 w-full hero-heading"
        />
        <div className="absolute md:relative md:mt-13 lg:mt-0 lg:mb-[80px] ml-[20%] md:ml-0 z-0">
          <p className="font-exo hidden lg:inline text-slate-200 text-3xl ml-4">
            and I'm a
          </p>
          <RotatingText
            texts={ROTATING_TEXTS}
            mainClassName="
            text-purple-300
           overflow-hidden  font-halfomania absolute top-[120px] md:top-[30px]"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            staggerDuration={ANIMATION_SETTINGS.rotatingText.staggerDuration}
            splitLevelClassName="overflow-hidden text-[20px] md:text-[25px] lg:text-[45px]"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={ANIMATION_SETTINGS.rotatingText.interval}
          />
        </div>
      </div>
      <div className="lg:hidden h-30"></div>
      <a
        href={import.meta.env.VITE_RESUME_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={`ml-[40%] font-exo text-xl relative z-10 inline-block px-6 py-3 rounded-full 
        bg-gradient-to-r from-indigo-900 to-purple-900 border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] text-white
        overflow-hidden transform ${
          !isTouchDevice ? "hover:scale-105" : "active:scale-105"
        } transition-all duration-300 ease-out`}
      >
        <span className="relative z-10">My Resume</span>
        <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-800/20"></span>
        <span className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.5),transparent)] bg-size-[200%_100%]"></span>
      </a>
    </div>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
