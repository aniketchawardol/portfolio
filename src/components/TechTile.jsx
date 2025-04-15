import React from "react";
import TechIcon from "./TechIcon";
import PropTypes from "prop-types";

const TechTile = ({ tech, index }) => {

  // Determine tile size based on technology category
  const isLarge = ["MongoDB", "Express.js", "React JS", "Node.js"].includes(
    tech
  );
  const isMedium = [
    "HTML",
    "CSS",
    "JavaScript",
    "TailwindCSS",
    "PostgreSQL",
    "SQL",
  ].includes(tech);

  // Set grid span classes based on importance
  const gridSpan = isLarge
    ? "col-span-2 row-span-2" // Large 2x2 tiles
    : isMedium
    ? "col-span-2 row-span-1" // Medium wide tiles
    : "col-span-1 row-span-1"; // Small square tiles

  return (
    <div
      key={index}
      className={`${gridSpan} dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 backdrop-blur-md
          bg-white/20 border border-white/20
      rounded-md p-4 flex flex-col transition-all hover:shadow-lg cursor-pointer shadow-lg`}
    >
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
  );
};

TechTile.propTypes = {
  tech: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default TechTile;
