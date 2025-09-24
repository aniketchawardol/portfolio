import TechIcon from "./TechIcon";
import PropTypes from "prop-types";

const TechTile = ({ tech }) => {
  // Determine tile size based on technology category
  const isLarge = [
    "MongoDB",
    "Express.js",
    "React JS",
    "Next.js",
    "Node.js",
  ].includes(tech);
  const isMedium = [
    "HTML",
    "CSS",
    "JavaScript",
    "TailwindCSS",
    "PostgreSQL",
    "SQL",
    "Docker",
    "Kubernetes",
    "Linux",
    "AWS",
  ].includes(tech);

  // Set grid span classes based on importance
  const gridSpan = isLarge
    ? "col-span-2 row-span-2" // Large 2x2 tiles
    : isMedium
    ? "col-span-2 row-span-1" // Medium wide tiles
    : "col-span-1 row-span-1"; // Small square tiles

  return (
    <div className={`${gridSpan} tech-skills-tile`}>
      <div className="font-exo bg-white/20 border border-white/20 rounded-xl p-6 flex flex-col shadow-lg dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 h-full w-full">
        <div className="flex items-center justify-center md:justify-start h-full">
          <div className="flex-shrink-0 md:mr-3">
            <TechIcon tech={tech} />
          </div>
          <span
            className={`dark:text-slate-200 text-slate-700 font-medium hidden md:inline overflow-hidden text-ellipsis ${
              isLarge ? "text-2xl" : isMedium ? "text-xl" : "text-md"
            }`}
          >
            {tech}
          </span>
        </div>
      </div>
    </div>
  );
};

TechTile.propTypes = {
  tech: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default TechTile;
