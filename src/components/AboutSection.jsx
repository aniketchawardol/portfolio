import { memo } from "react";
import SimpleRevealText from "./SimpleRevealText";
import MetaBalls from "../assets/Animations/MetaBalls/MetaBalls";
import ThemedCard from "./ui/ThemedCard";
import { COLORS } from "../constants";

const AboutSection = memo(() => {
  return (
    <div
      className="flex min-h-screen items-center justify-center w-full 
       bg-[#000000] relative"
    >
      <div className="absolute inset-0 flex items-center justify-center z-0 " id="metaballs">
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

      <div className="flex items-center justify-center w-full h-full z-10">
        <ThemedCard
          className="w-[80%] mx-auto relative z-20 lg:w-[35%]"
          withSpotlight={false}
        >
          <div className="text-white text-sm md:text-2xl lg:text-[25px] items-center m-6">
            <SimpleRevealText
              text="I view software through the lens of efficiency and constraints. Whether it’s debouncing socket events to reduce server load or implementing singleton patterns to prevent connection exhaustion, I focus on the invisible metrics that define user experience. I write code that respects resources and optimizes for the milliseconds that actually matter."
              className="leading-relaxed text-justify font-mono"
            />
          </div>
        </ThemedCard>
      </div>
    </div>
  );
});

AboutSection.displayName = "AboutSection";

export default AboutSection;
