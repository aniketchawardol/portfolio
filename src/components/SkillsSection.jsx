import React from "react";
import TechTile from "./TechTile";

const allTechnologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "React JS",
  "React Redux",
  "TailwindCSS",
  "Postman",
  "Node.js",
  "Express.js",
  "JWT",
  "Auth0",
  "bcrypt",
  "websockets",
  "multer",
  "Appwrite",
  "Cloudinary",
  "Vercel",
  "MongoDB",
  "mongoose",
  "PostgreSQL",
  "Render",
  "SQL",
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
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-lav to-offwhite py-16 font-exo">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-halfomania text-slate-700 text-center mb-16">
          Skills & Technologies
        </h2>

        <div className="p-8 rounded-xl mx-auto">
          {/* Windows 10 start menu style grid */}
          <div className="grid grid-cols-6 auto-rows-auto gap-3 grid-auto-flow-dense">
            {allTechnologies.map((tech, index) => (
              <TechTile key={index} tech={tech} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
