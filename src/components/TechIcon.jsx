// Import all Font Awesome icons individually
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

const TechIcon = ({ tech }) => {
  try {
    // Define size categories
    const largeIconTechs = [
      "MongoDB",
      "Express.js",
      "React JS",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "SQL",
    ];
    const mediumIconTechs = [
      "HTML",
      "CSS",
      "JavaScript",
      "TailwindCSS",
      "Docker",
      "Kubernetes",
      "Linux",
      "AWS",
    ];

    // Determine icon size based on category
    const getIconSize = (techName) => {
      if (largeIconTechs.includes(techName)) return 80; // Much larger for large containers
      if (mediumIconTechs.includes(techName)) return 48; // Larger for medium containers
      return 28; // Default size for small containers
    };

    // Get appropriate size for this technology
    const iconSize = getIconSize(tech);

    switch (tech) {
      case "AWS":
        return <FaAws size={iconSize} color="#FF9900" />;
      case "Linux":
        return <SiLinux size={iconSize} color="#FCC624" />;
      case "HTML":
        return <FaHtml5 size={iconSize} color="#E34F26" />;
      case "CSS":
        return <FaCss3Alt size={iconSize} color="#1572B6" />;
      case "JavaScript":
        return <FaJs size={iconSize} color="#F7DF1E" />;
      case "React JS":
        return <FaReact size={iconSize} color="#61DAFB" />;
      case "Next.js":
        return <SiNextdotjs size={iconSize} color="#000000" />;
      case "React Redux":
        return (
          <img
            src="https://cdn.worldvectorlogo.com/logos/redux.svg"
            alt="Redux"
            className={`w-${
              largeIconTechs.includes(tech)
                ? 24
                : mediumIconTechs.includes(tech)
                ? 12
                : 7
            } h-${
              largeIconTechs.includes(tech)
                ? 24
                : mediumIconTechs.includes(tech)
                ? 12
                : 7
            }`}
            style={{
              width: `${iconSize * 0.8}px`,
              height: `${iconSize * 0.8}px`,
            }}
          />
        );
      case "TailwindCSS":
        return <SiTailwindcss size={iconSize} color="#06B6D4" />;
      case "Node.js":
        return <FaNodeJs size={iconSize} color="#339933" />;
      case "Express.js":
        return <SiExpress size={iconSize} color="#000000" />;
      case "JWT":
        return <SiJsonwebtokens size={iconSize} color="#000000" />;
      case "Auth0":
        return <SiAuth0 size={iconSize} color="#EB5424" />;
      case "websockets":
        return <SiSocketdotio size={iconSize} color="#010101" />;
      case "Appwrite":
        return <SiAppwrite size={iconSize} color="#F02E65" />;
      case "Cloudinary":
        return <SiCloudinary size={iconSize} color="#3448C5" />;
      case "MongoDB":
        return <SiMongodb size={iconSize} color="#47A248" />;
      case "mongoose":
        return <FaDatabase size={iconSize} color="#880000" />;
      case "PostgreSQL":
        return <SiPostgresql size={iconSize} color="#336791" />;
      case "SQL":
        return (
          <img
            src="https://www.svgrepo.com/show/331760/sql-database-generic.svg"
            alt="SQL"
            style={{
              width: `${iconSize * 0.8}px`,
              height: `${iconSize * 0.8}px`,
            }}
          />
        );
      case "Git":
        return <FaGit size={iconSize} color="#F05032" />;
      case "Github":
        return <FaGithub size={iconSize} color="#181717" />;
      case "Postman":
        return <SiPostman size={iconSize} color="#FF6C37" />;
      case "Figma":
        return <FaFigma size={iconSize} color="#F24E1E" />;
      case "Canva":
        return <SiCanva size={iconSize} color="#00C4CC" />;
      case "C":
        return (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png"
            alt="C"
            style={{
              width: `${iconSize * 0.8}px`,
              height: `${iconSize * 0.8}px`,
            }}
          />
        );
      case "C++":
        return <SiCplusplus size={iconSize} color="#00599C" />;
      case "Python":
        return <SiPython size={iconSize} color="#3776AB" />;
      case "OCaml":
        return <FaTerminal size={iconSize} color="#EC6813" />;
      case "Docker":
        return <SiDocker size={iconSize} color="#2496ED" />;
      case "Kubernetes":
        return <SiKubernetes size={iconSize} color="#326CE5" />;
      default:
        return (
          <div
            style={{
              width: `${iconSize * 0.6}px`,
              height: `${iconSize * 0.6}px`,
              fontSize: `${iconSize * 0.4}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
            }}
          >
            {tech.charAt(0)}
          </div>
        );
    }
  } catch (error) {
    console.warn(`Failed to load icon for ${tech}`, error);
    return (
      <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
        {tech.charAt(0)}
      </div>
    );
  }
};

export default TechIcon;
