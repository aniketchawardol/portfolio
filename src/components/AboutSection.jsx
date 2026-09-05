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
      <div className="absolute inset-0 flex items-center justify-center z-0 mt-20" id="metaballs">
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

      <div className="flex items-center justify-center w-full h-full z-10 mt-20">
        <ThemedCard
          className="w-[80%] mx-auto relative z-20 lg:w-[80%]"
          withSpotlight={false}
        >
          <div className="text-white text-sm md:text-2xl lg:text-[25px] items-center m-6">
            <SimpleRevealText
              text="B.Tech CSE student at IIITM Gwalior (CGPA: 8.18).  Open Source & Mentorship: Software Engineering Mentee at Linux Foundation Decentralized Trust; Contributor to CNCF kgateway (Go, Kubernetes).  Systems Engineering: Built real-time collaborative editors utilizing WebSockets and MongoDB, AI-driven clinical trial platforms via FastAPI and LangGraph, and automated regression pipelines using Puppeteer and GitHub Actions.  Problem Solving: Codeforces Specialist (1485), LeetCode Knight (Top 0.5% in Biweekly Contest 186), 700+ problems solved; Semifinalist in Amazon HackOn 6.0 and Google BigCode. "
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
