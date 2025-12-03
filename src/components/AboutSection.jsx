import { memo } from "react";
import SimpleRevealText from "./SimpleRevealText";
import MetaBalls from "../assets/Animations/MetaBalls/MetaBalls";
import ThemedCard from "./ui/ThemedCard";
import { COLORS } from "../constants";

const AboutSection = memo(() => {
  return (
    <div
      className="flex h-screen items-center justify-center w-full 
       bg-gradient-to-b from-[#1e0438] via-[#1d0c3a] to-[#1a103c] relative"
    >
      <div className="absolute inset-0 flex items-center justify-center z-0 ">
        <MetaBalls
          color={COLORS.primary}
          cursorBallColor={COLORS.primary}
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
        <div className="text-slate-200 md:text-2xl items-center">
          <SimpleRevealText
            text="I view software through the lens of efficiency and constraints. Whether it’s debouncing socket events to reduce server load or implementing singleton patterns to prevent connection exhaustion, I focus on the invisible metrics that define user experience. I write code that respects resources and optimizes for the milliseconds that actually matter."
            className="leading-relaxed text-justify font-mono"
          />
        </div>
      </ThemedCard>
    </div>
  );
});

AboutSection.displayName = "AboutSection";

export default AboutSection;
