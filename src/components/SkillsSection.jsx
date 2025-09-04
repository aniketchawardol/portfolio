import React, { useState } from "react";
import TechTile from "./TechTile";
import SectionContainer from "./layout/SectionContainer";
import SectionHeading from "./ui/SectionHeading";
import { TECHNOLOGIES, COLORS } from "../constants";

const SkillsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <SectionContainer
      id="skills"
      gradientDark={COLORS.gradients.skillsDark}
      gradientLight={COLORS.gradients.skillsLight}
    >
      <SectionHeading title="Skills & Technologies" />
      {/* Windows 10 start menu style grid */}
      <div className="grid grid-cols-6 auto-rows-auto gap-6 grid-auto-flow-dense">
        {TECHNOLOGIES.map((tech, index) => (
          <TechTile
            key={index}
            tech={tech}
            index={index}
            isHovered={hoveredIndex === index}
            isAnyHovered={hoveredIndex !== null}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default SkillsSection;
