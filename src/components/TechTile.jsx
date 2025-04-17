import React, { useRef, useEffect } from "react";
import TechIcon from "./TechIcon";
import PropTypes from "prop-types";

const TechTile = ({
  tech,
  isHovered,
  isAnyHovered,
  onHover,
  onLeave,
}) => {
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

  const tileRef = useRef(null);

  // Direct DOM manipulation for smoother transitions
  useEffect(() => {
    const el = tileRef.current;
    if (!el) return;

    if (isHovered) {
      el.style.transform = "scale(1.1)";
      el.style.zIndex = "10";
      el.style.filter = "blur(0px)";
    } else if (isAnyHovered) {
      el.style.transform = "scale(1)";
      el.style.zIndex = "1";
      el.style.filter = "blur(2px)";
    } else {
      el.style.transform = "scale(1)";
      el.style.zIndex = "1";
      el.style.filter = "blur(0px)";
    }
  }, [isHovered, isAnyHovered]);

  return (
    <div
      ref={tileRef}
      className={`${gridSpan} font-exo
          bg-white/20 border border-white/20
          rounded-md p-4 flex flex-col shadow-lg cursor-pointer dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30`}
      style={{
        transition: "transform 0.3s ease-in-out, filter 0.2s",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
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
  isHovered: PropTypes.bool,
  isAnyHovered: PropTypes.bool,
  onHover: PropTypes.func,
  onLeave: PropTypes.func,
};

export default TechTile;
