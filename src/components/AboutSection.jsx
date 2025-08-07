import React from "react";
import BlurRevealText from "./BlurRevealText";
import MetaBalls from "../assets/Animations/MetaBalls/MetaBalls";
import { useIsDarkMode } from "../hooks/useIsDarkMode";
import ThemedCard from "./ui/ThemedCard";

const AboutSection = () => {
  const isDarkMode = useIsDarkMode();

  return (
    <div
      className="flex h-screen items-center justify-center w-full 
       bg-gradient-to-b dark:from-[#1e0438] dark:via-[#1d0c3a] dark:to-[#1a103c]
           from-[#6c5ca7] via-[#8771b8] to-[#a28cd1] relative"
    >
      <div className="absolute inset-0 flex items-center justify-center z-0 ">
        <MetaBalls
          color={isDarkMode ? "#7e22ce" : "#d4bdf4"}
          cursorBallColor={isDarkMode ? "#7e22ce" : "#d4bdf4"}
          cursorBallSize={2}
          ballCount={15}
          animationSize={30}
          enableMouseInteraction={true}
          enableTransparency={true}
          hoverSmoothness={0.05}
          clumpFactor={1}
          speed={0.3}
        />
      </div>

      <ThemedCard className="w-[80%] relative z-10" withSpotlight={false}>
        <div
          className="dark:text-slate-200 text-slate-700
           md:text-2xl items-center"
        >
          <BlurRevealText
            text="Hello! I'm Aniket, a passionate Full-Stack Developer with hands-on experience in building scalable web applications using React, Node.js, MongoDB, and real-time technologies like Socket.IO. Along with this I have a strong foundation in Data Structures and Algorithms, with a problem-solving mindset and a focus on writing efficient, clean code."
            className="leading-relaxed text-justify font-mono"
          />
        </div>
      </ThemedCard>
    </div>
  );
};

export default AboutSection;
