import React from "react";
import TechTile from "./TechTile";
import SectionContainer from "./layout/SectionContainer";
import SectionHeading from "./ui/SectionHeading";
import { TECHNOLOGIES, COLORS } from "../constants";

const SkillsSection = React.memo(() => {
  return (
    <SectionContainer id="skills" gradient={COLORS.gradients.skills}>
      <SectionHeading title="Skills & Technologies" />
      {/* Windows 10 start menu style grid */}
      <div className="grid grid-cols-6 auto-rows-auto gap-6 grid-auto-flow-dense tech-skills-grid">
        {TECHNOLOGIES.map((tech) => (
          <TechTile key={tech} tech={tech} />
        ))}
      </div>
    </SectionContainer>
  );
});

SkillsSection.displayName = "SkillsSection";

export default SkillsSection;
