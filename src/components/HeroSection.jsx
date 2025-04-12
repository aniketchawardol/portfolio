import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RotatingText from "../assets/TextAnimations/RotatingText/RotatingText";
import Spline from "@splinetool/react-spline";

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
      className="bg-gray-100 bg-linear-to-b from-[#cbb4f0] via-[#a28cd1] to-[#6c5ba7] relative h-screen pt-[80px]"
    >
      <div className="absolute mt-[10%] ml-[40%] h-[300px] w-[300px] rounded-full bg-gradient-to-bl from-purple-400 z-10 shadow-[0_0_100px_40px_#c6a4f2]"></div>

      <div className="relative z-10 ml-[20%] mt-[13%] flex items-end">
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
      <a
        href="https://drive.google.com/file/d/1l9gNabeeMXGSswVi7uhsfyErmp6dVipR/view?usp=sharing"
        className="ml-[40%] font-exo text-xl hover:text-white p-3 w-fit rounded-full  hover:bg-[#7263b3] transition-all duration-150 ease-in-out relative z-10"
      >
        My Resume
      </a>

      <Spline className="absolute bottom-0 right-0 w-full h-full z-0 "
       scene="https://prod.spline.design/TA6v0WtbHxdYhxoR/scene.splinecode"  
      />
 
    </div>
  );
};

export default HeroSection;
