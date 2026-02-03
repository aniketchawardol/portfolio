// Navigation items
export const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

// GitHub configuration
export const GITHUB_CONFIG = {
  username: "aniketchawardol",
  token: import.meta.env.VITE_APP_GITHUB_TOKEN,
};

// Color schemes - Dark theme only
export const COLORS = {
  gradients: {
    hero: "from-[#000000] to-[#000000]",
    about: "from-[#000000] to-[#000000]",
    skills: "from-[#000000] to-[#000000]",
    github: "from-[#000000] to-[#000000]",
    projects: "from-[#000000] to-[#000000]",
    contact: "from-[#000000] to-[#000000]",
  },
  primary: "#FF5C00", // Neon Orange
};

// Technologies list
export const TECHNOLOGIES = [
  "HTML",
  "CSS",
  "JavaScript",
  "React JS",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "SQL",
  "TailwindCSS",
  "Docker",
  "Kubernetes",
  "Linux",
  "AWS",
  "C",
  "C++",
  "React Redux",
  "Postman",
  "JWT",
  "Auth0",
  "websockets",
  "Appwrite",
  "Cloudinary",
  "Git",
  "Github",
  "Figma",
  "Canva",
  "Python",
];

// Projects data
export const PROJECTS = [
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
    title: "YouTube Clone",
    description:
      "A video sharing platform with user authentication, video uploads with thumbnails, and a dynamic feed displaying the latest content.",
    technologies: [
      "Next.js",
      "MongoDB",
      "TailwindCSS",
      "NextAuth.js",
      "ImageKit",
    ],
    imageUrl: "./blogapp.png",
    projectUrl: ["https://github.com/aniketchawardol/nextjs-yt-clone"],
  },
];

// Social links
export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/aniketchawardol",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/aniket-chawardol/",
  },
  {
    name: "Email",
    url: "mailto:aniketchawardol@gmail.com",
  },
];

// Hero rotating texts
export const ROTATING_TEXTS = [
  "Full-Stack Developer",
  "Competitive Programmer",
  "Open Source Contributor",
  "Software Engineer",
];

// Animation settings
export const ANIMATION_SETTINGS = {
  loading: {
    duration: 2500,
    fadeOutDuration: 200,
  },
  lottie: {
    defaultOptions: {
      loop: true,
      autoplay: true,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    },
  },
  meteors: {
    activationDelay: 500,
  },
  gradualSpacing: {
    duration: 0.6,
    delayMultiple: 0.08,
  },
  rotatingText: {
    interval: 2000,
    staggerDuration: 0.025,
  },
};
