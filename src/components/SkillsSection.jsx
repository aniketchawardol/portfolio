import React, { useState } from "react";
import TechTile from "./TechTile";
import SectionContainer from "./layout/SectionContainer";
import SectionHeading from "./ui/SectionHeading";


const allTechnologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "React JS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "SQL",
  "TailwindCSS",
  "React Redux",
  "Postman",
  "JWT",
  "Auth0",
  "bcrypt",
  "websockets",
  "multer",
  "Appwrite",
  "Cloudinary",
  "Vercel",
  "mongoose",
  "Render",
  "Git",
  "Github",
  "Figma",
  "Canva",
  "Photoshop",
  "Lucid Chart",
  "C",
  "C++",
  "Python",
  "OCaml",
];

const SkillsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const gradientDark =
    "dark:from-[#1a103c] dark:via-[#18103a] dark:to-[#150d37]";
  const gradientLight = "from-[#a28cd1] via-[#b6a6e3] to-[#cbb4f0]";

  return (
    <SectionContainer
      id="skills"
      gradientDark={gradientDark}
      gradientLight={gradientLight}
    >
      <SectionHeading title="Skills & Technologies" />
      {/* Windows 10 start menu style grid */}
      <div className="grid grid-cols-6 auto-rows-auto gap-5 grid-auto-flow-dense">
        {allTechnologies.map((tech, index) => (
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
