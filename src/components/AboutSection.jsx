import React from "react";
import BlurRevealText from "./BlurRevealText";
import MetaBalls from "../assets/Animations/MetaBalls/MetaBalls";

const AboutSection = () => {
  return (
    <div className="flex h-screen items-center justify-center w-full bg-linear-to-t from-lav to-offwhite relative">
      <div className="absolute inset-0 flex items-center justify-center z-0 ">
        <MetaBalls
          color="#f4f7fc"
          cursorBallColor="#f4f7fc"
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
      <div className="w-[80%] relative z-10 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
        <div className="font-mono text-slate-700 p-6 rounded-2xl text-2xl items-center">
          <BlurRevealText
            text="Hello I'm Aniket, a passionate Full-Stack Developer with hands-on experience in building scalable web applications using React, Node.js, MongoDB, and real-time technologies like Socket.IO. Along with this I have a strong foundation in Data Structures and Algorithms, with a problem-solving mindset and a focus on writing efficient, clean code."
            className="leading-relaxed text-justify"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
