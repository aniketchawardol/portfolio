import SimpleRevealText from "./SimpleRevealText";
import MetaBalls from "../assets/Animations/MetaBalls/MetaBalls";
import ThemedCard from "./ui/ThemedCard";
import { COLORS } from "../constants";

const AboutSection = () => {
  return (
    <div
      className="flex h-screen items-center justify-center w-full 
       bg-gradient-to-b from-[#1e0438] via-[#1d0c3a] to-[#1a103c] relative"
    >
      <div className="absolute inset-0 flex items-center justify-center z-0 ">
        <MetaBalls
          color={COLORS.metaBalls.dark}
          cursorBallColor={COLORS.metaBalls.dark}
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
          className="text-slate-200 md:text-2xl items-center"
        >
          <SimpleRevealText
            text="Hello! I'm Aniket, a passionate Full-Stack Developer with hands-on experience in building scalable web applications using React, Node.js, MongoDB, and real-time technologies like Socket.IO. Along with this I have a strong foundation in Data Structures and Algorithms, with a problem-solving mindset and a focus on writing efficient, clean code."
            className="leading-relaxed text-justify font-mono"
          />
        </div>
      </ThemedCard>
    </div>
  );
};

export default AboutSection;
