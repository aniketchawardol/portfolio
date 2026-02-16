// Import all Font Awesome icons individually
import { memo } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGit,
  FaGithub,
  FaFigma,
  FaAws,
} from "react-icons/fa";
import { FaDatabase, FaTerminal } from "react-icons/fa";
// Import additional technology icons
import {
  SiTailwindcss,
  SiExpress,
  SiJsonwebtokens,
  SiAuth0,
  SiSocketdotio,
  SiPostman,
  SiMongodb,
  SiPostgresql,
  SiLinux,
  SiCanva,
  SiCplusplus,
  SiPython,
  SiAppwrite,
  SiCloudinary,
  SiNextdotjs,
  SiDocker,
  SiKubernetes,
} from "react-icons/si";

const LARGE_ICON_TECHS = [
  "MongoDB",
  "Express.js",
  "React JS",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "SQL",
];

const MEDIUM_ICON_TECHS = [
  "HTML",
  "CSS",
  "JavaScript",
  "TailwindCSS",
  "Docker",
  "Kubernetes",
  "Linux",
  "AWS",
];

const getIconSize = (techName) => {
  if (LARGE_ICON_TECHS.includes(techName)) return 96; // Larger for large containers (was 80)
  if (MEDIUM_ICON_TECHS.includes(techName)) return 48; // Larger for medium containers
  return 28; // Default size for small containers
};

// Colors for known techs (brand/recognizable colors)
const ICON_COLORS = {
  AWS: "#FF9900",
  Linux: "#FCC624",
  HTML: "#E34F26",
  CSS: "#1572B6",
  JavaScript: "#F7DF1E",
  "React JS": "#61DAFB",
  "Next.js": "#FFFFFF",
  "React Redux": "#764ABC",
  TailwindCSS: "#06B6D4",
  "Node.js": "#3C873A",
  "Express.js": "#FFFFFF",
  JWT: "#F7C948",
  Auth0: "#EB5424",
  websockets: "#FFFFFF",
  Appwrite: "#FF4F99",
  Cloudinary: "#2B66FF",
  MongoDB: "#47A248",
  mongoose: "#47A248",
  PostgreSQL: "#336791",
  SQL: "#336791",
  Git: "#F34F29",
  Github: "#FFFFFF",
  Postman: "#FF6C37",
  Figma: "#F24E1E",
  Canva: "#00C4CC",
  C: "#00599C",
  "C++": "#00599C",
  Python: "#3776AB",
  OCaml: "#EC6813",
  Docker: "#2496ED",
  Kubernetes: "#326CE5",
};

const getColorForTech = (tech) => ICON_COLORS[tech] || "#94A3B8";

const TechIcon = memo(({ tech }) => {
  try {
    // Get appropriate size for this technology
    const iconSize = getIconSize(tech);

    switch (tech) {
      case "AWS":
        return <FaAws size={iconSize} color={getColorForTech("AWS")} title="AWS" />;
      case "Linux":
        return <SiLinux size={iconSize} color={getColorForTech("Linux")} title="Linux" />;
      case "HTML":
        return <FaHtml5 size={iconSize} color={getColorForTech("HTML")} title="HTML" />;
      case "CSS":
        return <FaCss3Alt size={iconSize} color={getColorForTech("CSS")} title="CSS" />;
      case "JavaScript":
        return <FaJs size={iconSize} color={getColorForTech("JavaScript")} title="JavaScript" />;
      case "React JS":
        return <FaReact size={iconSize} color={getColorForTech("React JS")} title="React JS" />;
      case "Next.js":
        return <SiNextdotjs size={iconSize} color={getColorForTech("Next.js")} title="Next.js" />;
      case "React Redux":
        return (
          <img
            src="https://cdn.worldvectorlogo.com/logos/redux.svg"
            alt="Redux"
            title="React Redux"
            style={{
              width: `${iconSize * 0.8}px`,
              height: `${iconSize * 0.8}px`,
              objectFit: "contain",
            }}
          />
        );
      case "TailwindCSS":
        return <SiTailwindcss size={iconSize} color={getColorForTech("TailwindCSS")} title="TailwindCSS" />;
      case "Node.js":
        return <FaNodeJs size={iconSize} color={getColorForTech("Node.js")} title="Node.js" />;
      case "Express.js":
        return <SiExpress size={iconSize} color={getColorForTech("Express.js")} title="Express.js" />;
      case "JWT":
        return <SiJsonwebtokens size={iconSize} color={getColorForTech("JWT")} title="JWT" />;
      case "Auth0":
        return <SiAuth0 size={iconSize} color={getColorForTech("Auth0")} title="Auth0" />;
      case "websockets":
        return <SiSocketdotio size={iconSize} color={getColorForTech("websockets")} title="websockets" />;
      case "Appwrite":
        return <SiAppwrite size={iconSize} color={getColorForTech("Appwrite")} title="Appwrite" />;
      case "Cloudinary":
        return <SiCloudinary size={iconSize} color={getColorForTech("Cloudinary")} title="Cloudinary" />;
      case "MongoDB":
        return <SiMongodb size={iconSize} color={getColorForTech("MongoDB")} title="MongoDB" />;
      case "mongoose":
        return <FaDatabase size={iconSize} color={getColorForTech("mongoose")} title="mongoose" />;
      case "PostgreSQL":
        return <SiPostgresql size={iconSize} color={getColorForTech("PostgreSQL")} title="PostgreSQL" />;
      case "SQL":
        return (
          <img
            src="https://www.svgrepo.com/show/331760/sql-database-generic.svg"
            alt="SQL"
            title="SQL"
            style={{
              width: `${iconSize * 0.8}px`,
              height: `${iconSize * 0.8}px`,
              objectFit: "contain",
            }}
          />
        );
      case "Git":
        return <FaGit size={iconSize} color={getColorForTech("Git")} title="Git" />;
      case "Github":
        return <FaGithub size={iconSize} color={getColorForTech("Github")} title="Github" />;
      case "Postman":
        return <SiPostman size={iconSize} color={getColorForTech("Postman")} title="Postman" />;
      case "Figma":
        return <FaFigma size={iconSize} color={getColorForTech("Figma")} title="Figma" />;
      case "Canva":
        return <SiCanva size={iconSize} color={getColorForTech("Canva")} title="Canva" />;
      case "C":
        return (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png"
            alt="C"
            title="C"
            style={{
              width: `${iconSize * 0.8}px`,
              height: `${iconSize * 0.8}px`,
              objectFit: "contain",
            }}
          />
        );
      case "C++":
        return <SiCplusplus size={iconSize} color={getColorForTech("C++")} title="C++" />;
      case "Python":
        return <SiPython size={iconSize} color={getColorForTech("Python")} title="Python" />;
      case "OCaml":
        return <FaTerminal size={iconSize} color={getColorForTech("OCaml")} title="OCaml" />;
      case "Docker":
        return <SiDocker size={iconSize} color={getColorForTech("Docker")} title="Docker" />;
      case "Kubernetes":
        return <SiKubernetes size={iconSize} color={getColorForTech("Kubernetes")} title="Kubernetes" />;
      default: {
        const bgColor = getColorForTech(tech);
        return (
          <div
            title={tech}
            style={{
              width: `${iconSize * 0.6}px`,
              height: `${iconSize * 0.6}px`,
              fontSize: `${iconSize * 0.4}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              backgroundColor: bgColor,
              color: "#fff",
              fontWeight: 600,
            }}
          >
            {tech.charAt(0)}
          </div>
        );
      }
    }
  } catch (error) {
    console.warn(`Failed to load icon for ${tech}`, error);
    return (
      <div
        title={tech}
        style={{
          width: "2rem",
          height: "2rem",
          backgroundColor: getColorForTech(tech),
          color: "#fff",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {tech.charAt(0)}
      </div>
    );
  }
});

TechIcon.displayName = "TechIcon";

export default TechIcon;
