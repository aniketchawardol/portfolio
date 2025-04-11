import React from "react";
import TechIcon from "./TechIcon";

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
      className={`${gridSpan} bg-white/20 border border-white/20  rounded-md p-4 flex flex-col transition-all hover:scale-95 hover:shadow-lg cursor-pointer shadow-lg`}
    >
      <div className="flex items-center h-full">
        <div className="flex-shrink-0 mr-3">
          <TechIcon tech={tech} />
        </div>
        <span className={`text-slate-700 font-medium overflow-hidden text-ellipsis ${isLarge ? "text-2xl" : isMedium ? "text-xl" : "text-md"}`}>
          {tech}
        </span>
      </div>
    </div>
  );
};

export default TechTile;
