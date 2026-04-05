// Navigation items
export const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

// GitHub configuration
const sanitizeEnvValue = (value = "") =>
  typeof value === "string" ? value.trim().replace(/^["']|["']$/g, "") : "";

export const GITHUB_CONFIG = {
  username: "aniketchawardol",
  token: sanitizeEnvValue(import.meta.env.VITE_APP_GITHUB_TOKEN),
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
    title: "Code Sathi",
    description:
      "Real-time collaborative code editor. Built a full-stack platform supporting live code editing, multi-user cursor tracking, chat, AI coding assistant and file sync.",
    technologies: ["React", "TailwindCSS", "Socket.IO", "Auth0", "REST APIs"],
    imageUrl: "./CodeSathi.png",
    projectUrl: ["https://github.com/aniketchawardol/CodeSync"],
    livelink: "https://codesarthi.onrender.com/",
  },
  {
    title: "Clinical Trials Prototype",
    description:
      "A clinical trials platform featuring a conversational chatbot with interactive map. Processes natural language queries to retrieve and display matching trial sites.",
    technologies: ["React", "FastAPI", "LangGraph", "ChromaDB", "MapLibre"],
    imageUrl: "./clinicaltrials.png", // Ensure you have an image with this name in your assets
    projectUrl: [
      {
        frontend: "https://github.com/aniketchawardol/clinical-trials-frontend",
      },
      { backend: "https://github.com/aniketchawardol/clinical-trials-backend" },
    ],
    livelink: "https://clinical-trials-canada.vercel.app/", // Add your actual deployment link here if you have one
  },
  {
    title: "Gazebot",
    description:
      "An open-source visual regression testing tool that monitors web pages for UI regressions, broken layouts, and dynamic content failures via automated daily scans.", //
    technologies: [
      "Node.js",
      "Puppeteer",
      "MongoDB",
      "GitHub Actions",
    ],
    imageUrl: "./gazebot.png",
    projectUrl: ["https://github.com/aniketchawardol/gazebot"],
  },
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
    ],
    imageUrl: "./Doctors.com.png",
    projectUrl: [
      { frontend: "https://github.com/aniketchawardol/Doctors.com-frontend" },
      { backend: "https://github.com/aniketchawardol/Doctors.com-backend" },
    ],
    livelink: "https://doctors-com-frontend.vercel.app/",
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
  hero: {
    triggerDelay: 100,
    riseDuration: 260,
    shrinkDuration: 390,
  },
  rotatingText: {
    interval: 2000,
    staggerDuration: 0.025,
  },
};
