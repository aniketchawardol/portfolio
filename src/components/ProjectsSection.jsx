import React from "react";
import ProjectTile from "./ProjectTile";

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
    projectUrl: ["https://github.com/aniketchawardol/blogappt"],
  },
];

const ProjectsSection = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-t from-[#cbb4f0] via-[#a28cd1] to-[#8672b8] py-16 relative">
      <div className="absolute inset-0 flex items-center justify-center z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-halfomania text-slate-700 text-center mb-6">
          Featured Projects
        </h2>
        <p className="text-center text-slate-600 mb-16 font-mono">
          A showcase of my recent development work and personal projects
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectTile key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
