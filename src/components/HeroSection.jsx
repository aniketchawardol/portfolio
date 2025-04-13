import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RotatingText from "../assets/TextAnimations/RotatingText/RotatingText";
import Spline from "@splinetool/react-spline";
import { useTheme } from "../utils/ThemeProvider";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const sectionRef = useRef(null);
  const { theme } = useTheme();

  // Check if we're in dark mode
  const isDarkMode = () => {
    if (theme === "dark") return true;
    if (
      theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      return true;
    return false;
  };

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
      className={`bg-gray-100 dark:bg-slate-900 ${
        !isDarkMode()
          ? "bg-gradient-to-b from-[#cbb4f0] via-[#b6a6e3] to-[#6c5ca7]"
          : "bg-gradient-to-b dark:from-[#0f0a29] dark:via-[#191036] dark:to-[#1e0438]"
      } relative h-screen pt-[80px] ${isDarkMode() ? "northern-lights" : ""}`}
    >
      <div
        className={`absolute mt-[10%] ml-[20%] lg:ml-[40%] h-[300px] w-[300px] rounded-full z-10 ${
          isDarkMode()
            ? "bg-gradient-to-bl dark:from-purple-900 z-10 dark:shadow-[0_0_100px_40px_#4c1d95]"
            : "bg-gradient-to-bl from-purple-400 z-10 shadow-[0_0_100px_40px_#c6a4f2]"
        }`}
      ></div>

      <div className="relative z-10 lg:ml-[20%] mt-[25%] md:mt-[20%] lg:mt-[13%] flex lg:items-end  justify-center lg:justify-normal">
        <motion.h1
          className={`text-[100px] lg:text-[150px] font-moonwalk ${
            isDarkMode() ? "dark:text-slate-200" : "text-slate-700"
          }`}
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
        <div className="mb-[58px] absolute z-0 ml-[32%]">
          <p
            className={`font-exo hidden lg:inline ${
              isDarkMode() ? "dark:text-slate-200" : "text-slate-700"
            } text-3xl ml-4`}
          >
            and I'm a
          </p>
          <RotatingText
            texts={[
              "Web Developer",
              "Problem Solver",
              "DSA Enthusiast",
              "UI/UX Designer",
            ]}
            mainClassName={`${ 
              isDarkMode() ? "dark:text-purple-300" : "text-purple-500"
            } overflow-hidden  font-halfomania absolute top-[120px] lg:top-4`}
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
      <div className="lg:hidden h-6"></div>
      <a
        href="https://drive.google.com/file/d/1l9gNabeeMXGSswVi7uhsfyErmp6dVipR/view?usp=sharing"
        className={`ml-[40%] font-exo text-xl ${
          isDarkMode() ? "dark:text-slate-200" : "text-slate-700"
        } hover:text-white p-3 w-fit rounded-full hover:bg-[#7263b3] dark:hover:bg-[#4c1d95] transition-all duration-150 ease-in-out relative z-10`}
      >
        My Resume
      </a>

      {/* Always render Spline in light mode, never in dark mode */}
      {!isDarkMode() && (
        <Spline
          className="absolute bottom-0 right-0 w-full h-full z-0"
          scene="https://prod.spline.design/TA6v0WtbHxdYhxoR/scene.splinecode"
        />
      )}
    </div>
  );
};

export default HeroSection;
