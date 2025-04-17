import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RotatingText from "../assets/TextAnimations/RotatingText/RotatingText";
import Spline from "@splinetool/react-spline";
import { useIsDarkMode } from "../hooks/useIsDarkMode";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [meteorActive, setMeteorActive] = useState(false);
  const sectionRef = useRef(null);
  const isDarkMode = useIsDarkMode();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const letterSpacing = useTransform(
    scrollYProgress,
    [0, 0.6],
    ["0rem", "6rem"]
  );
  const headingOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  useEffect(() => {
    // Delay meteor shower activation to prevent seeing initial positions
    const timer = setTimeout(() => {
      if (isDarkMode) {
        setMeteorActive(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [isDarkMode]);

  const headingVariants = {
    hidden: {
      letterSpacing: "8rem",
      opacity: 0,
    },
    visible: {
      letterSpacing: "0rem",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        duration: 1.2,
      },
    },
  };

  return (
    <div
      ref={sectionRef}
      className="bg-gray-100 dark:bg-slate-900 
      bg-gradient-to-b dark:from-[#0f0a29] dark:via-[#191036] dark:to-[#1e0438] northern-lights
          from-[#cbb4f0] via-[#b6a6e3] to-[#6c5ca7]
    relative h-screen pt-[80px]"
    >
      <div className="absolute mt-[20%] md:mt-[10%] ml-[20%] lg:ml-[40%] h-[300px] w-[300px] rounded-full z-10 bg-gradient-to-bl from-purple-400 dark:from-purple-900  shadow-[0_0_100px_40px_#c6a4f2] dark:shadow-[0_0_100px_40px_#4c1d95]"></div>

      {/* Meteor shower (dark mode only) */}
      {isDarkMode && meteorActive && (
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

      <div className="relative w-full z-10 lg:ml-[20%] mt-[40%] md:mt-[20%] lg:mt-[13%] flex lg:items-end">
        <motion.h1
          className="text-[100px] lg:text-[150px] font-moonwalk text-slate-700 dark:text-slate-200"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={headingVariants}
          style={
            hasScrolled
              ? {
                  letterSpacing,
                  opacity: headingOpacity,
                }
              : {}
          }
        >
          ANIKET
        </motion.h1>
        <div className="absolute md:relative mb-[58px] ml-[20%] md:ml-0 z-0">
          <p className="font-exo hidden lg:inline text-slate-700 dark:text-slate-200 text-3xl ml-4">
            and I'm a
          </p>
          <RotatingText
            texts={[
              "Web Developer",
              "Problem Solver",
              "DSA Enthusiast",
              "UI/UX Designer",
            ]}
            mainClassName="
            dark:text-purple-300 text-purple-500
           overflow-hidden  font-halfomania absolute top-[120px] lg:top-4"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden text-[30px] lg:text-[60px]"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>
      </div>
      <div className="lg:hidden h-30"></div>
      <a
        href="https://drive.google.com/file/d/1l9gNabeeMXGSswVi7uhsfyErmp6dVipR/view?usp=sharing"
        className={`ml-[40%] font-exo text-xl relative z-10 inline-block px-6 py-3 rounded-full 
        bg-gradient-to-r from-violet-400 to-fuchsia-500 text-white shadow-md dark:from-indigo-900 dark:to-purple-900 dark:border dark:border-purple-500 dark:shadow-[0_0_15px_rgba(168,85,247,0.5)]
        overflow-hidden transform hover:scale-105 transition-all duration-300 ease-out`}
      >
        <span className="relative z-10">My Resume</span>
        <span className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-violet-500/20 dark:from-purple-600/20 dark:to-indigo-800/20"></span>
        <span className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.5),transparent)] bg-[length:200%_100%]"></span>
      </a>

      {!isDarkMode && (
        <Spline
          className="absolute bottom-0 right-0 w-full h-full z-0 pointer-events-none"
          scene="https://prod.spline.design/TA6v0WtbHxdYhxoR/scene.splinecode"
        />
      )}
    </div>
  );
};

export default HeroSection;
