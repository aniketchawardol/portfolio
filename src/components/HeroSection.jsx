import { useState, useEffect, useRef, useCallback, memo } from "react";
import RotatingText from "../assets/TextAnimations/RotatingText/RotatingText";
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
      className="bg-[#000000] northern-lights relative h-screen pt-20"
    >
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

      {/* Centered container: keeps ANIKET, rotating text, and resume button centered */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
        {/* Heading + rotating text wrapper centered */}
        <div className="relative w-full max-w-[1200px] z-10 flex flex-col items-center justify-center overflow-hidden">
          <h1 className="text-[100px] lg:text-[200px] font-moonwalk text-white text-center hero-heading mx-auto fade-in mb-0 pb-0 leading-none">
            ANIKET
          </h1>

          <div className="relative z-0 flex flex-col items-center mt-0" id="rotating-text">
            <p className="font-exo hidden lg:inline text-white text-3xl mt-0 mb-0 lg:-mt-4">
              and I'm a
            </p>
            <RotatingText
              texts={ROTATING_TEXTS}
              mainClassName={
                "text-[#FFFFFF] overflow-hidden font-halfomania relative mt-1"
              }
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

        <div className="lg:hidden h-30" />

        <div className="w-full flex justify-center ">
          <a
            href={import.meta.env.VITE_RESUME_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-exo text-xl relative z-10 px-6 py-3 rounded-xl bg-[#FF5C00] border border-[#FF5C00] text-white overflow-hidden transform ${
              !isTouchDevice ? "hover:scale-105" : "active:scale-105"
            } transition-all duration-300 ease-out w-max`}
          >
            <span className="relative z-10">My Resume</span>
            <span className="absolute inset-0 bg-[#FF5C00]/20"></span>
            <span className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.5),transparent)] bg-size-[200%_100%]"></span>
          </a>
        </div>
      </div>
    </div>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
