import React from "react";
import ProjectTile from "./ProjectTile";
import SectionContainer from "./layout/SectionContainer";
import SectionHeading from "./ui/SectionHeading";

const projects = [
  {
    title: "Doctors.com",
    description:
      "Developed Doctors.com, a comprehensive healthcare platform enabling secure patient report uploads, hospital searches, and efficient report management.",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Express.js",
      "TailwindCSS",
      "JWT",
    ],
    imageUrl: "./Doctors.com.png",
    projectUrl: [
      { frontend: "https://github.com/aniketchawardol/Doctors.com-frontend" },
      { backend: "https://github.com/aniketchawardol/Doctors.com-backend" },
    ],
    livelink: "https://doctors-com-frontend.vercel.app/",
  },
  {
    title: "Code Sathi",
    description:
      "Real-time collaborative code editor. Built a full-stack platform supporting live code editing, multi-user cursor tracking, chat, AI coding assistant and file sync.",
    technologies: ["React", "TailwindCSS", "Socket.IO", "Auth0", "REST APIs"],
    imageUrl: "./CodeSathi.png",
    projectUrl: ["https://github.com/aniketchawardol/CodeSync"],
    livelink: "https://codesarthi.onrender.com/",
  },
  {
    title: "Blog App",
    description:
      "A full-stack blogging application. Implemented user authentication, blog post management (create, edit, delete), rich text editor and a responsive UI.",
    technologies: ["React", "Node.js", "Appwrite", "TinyMCE", "React Redux"],
    imageUrl: "./blogapp.png",
    projectUrl: ["https://github.com/aniketchawardol/blogapp"],
  },
];

const ProjectsSection = () => {
  const gradientDark =
    "dark:from-[#0f0a29] dark:via-[#16073a] dark:to-[#1e0438]";
  const gradientLight = "from-[#cbb4f0] via-[#b6a6e3] to-[#a28cd1]";

  return (
    <SectionContainer
      id="projects"
      gradientDark={gradientDark}
      gradientLight={gradientLight}
    >
      <SectionHeading
        title="Featured Projects"
        subtitle="A showcase of my recent development work and personal projects"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectTile key={index} {...project} />
        ))}
      </div>
    </SectionContainer>
  );
};

export default ProjectsSection;
