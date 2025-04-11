import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RotatingText from "../assets/TextAnimations/RotatingText/RotatingText";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const sectionRef = useRef(null);

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
      className="bg-gray-100 bg-linear-to-b from-lav to-offwhite relative h-screen pt-[80px]"
    >
      <div className="absolute mt-[15%] ml-[40%] h-[300px] w-[300px] rounded-full bg-gradient-to-bl from-purple-400 z-0 shadow-purple-300 shadow-2xl"></div>

      <div className="relative z-10 ml-[20%] mt-[17%] flex items-end">
        <motion.h1
          className="text-[150px] font-moonwalk text-slate-700"
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
        <div className="mb-3 absolute z-0 left-[560px]">
          <p className="font-exo text-slate-700 text-3xl ml-4">and I'm a</p>
          <RotatingText
            texts={[
              "Web Developer",
              "Problem Solver",
              "DSA Enthusiast",
              "UI/UX Designer",
            ]}
            mainClassName="text-purple-500 overflow-hidden rounded-lg text-[90px] font-halfomania"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
