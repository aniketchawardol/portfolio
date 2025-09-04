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

// Color schemes
export const COLORS = {
  gradients: {
    lightDefault: "from-[#cbb4f0] via-[#b6a6e3] to-[#a28cd1]",
    darkDefault: "dark:from-[#0f0a29] dark:via-[#191036] dark:to-[#1e0438]",
    heroLight: "from-[#cbb4f0] via-[#b6a6e3] to-[#6c5ca7]",
    heroDark: "dark:from-[#0f0a29] dark:via-[#191036] dark:to-[#1e0438]",
    aboutLight: "from-[#6c5ca7] via-[#8771b8] to-[#a28cd1]",
    aboutDark: "dark:from-[#1e0438] dark:via-[#1d0c3a] dark:to-[#1a103c]",
    skillsLight: "from-[#a28cd1] via-[#b6a6e3] to-[#cbb4f0]",
    skillsDark: "dark:from-[#1a103c] dark:via-[#18103a] dark:to-[#150d37]",
    githubLight: "from-[#cbb4f0] via-[#b6a6e3] to-[#cbb4f0]",
    githubDark: "dark:from-[#150d37] dark:via-[#0c0825] dark:to-[#0f0a29]",
    projectsLight: "from-[#cbb4f0] via-[#b6a6e3] to-[#a28cd1]",
    projectsDark: "dark:from-[#0f0a29] dark:via-[#16073a] dark:to-[#1e0438]",
    contactLight: "from-[#a28cd1] via-[#b6a6e3] to-[#cbb4f0]",
    contactDark: "dark:from-[#1e0438] dark:via-[#170732] dark:to-[#0f0a29]",
  },
  metaBalls: {
    light: "#d4bdf4",
    dark: "#7e22ce",
  },
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
  "Web Developer",
  "Problem Solver",
  "DSA Enthusiast",
  "UI/UX Designer",
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
