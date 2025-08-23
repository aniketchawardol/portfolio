import React, { useRef, useEffect } from "react";
import TechIcon from "./TechIcon";
import PropTypes from "prop-types";
import { useDeviceDetection } from "../hooks/useDeviceDetection";

const TechTile = ({ tech, isHovered, isAnyHovered, onHover, onLeave }) => {
  const { isTouchDevice } = useDeviceDetection();
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
  ].includes(tech);

  // Set grid span classes based on importance
  const gridSpan = isLarge
    ? "col-span-2 row-span-2" // Large 2x2 tiles
    : isMedium
    ? "col-span-2 row-span-1" // Medium wide tiles
    : "col-span-1 row-span-1"; // Small square tiles

  const tileRef = useRef(null);

  // Use CSS classes for better performance and to avoid jitter
  const getTransformClasses = () => {
    if (isTouchDevice) return "";

    if (isHovered) {
      return "scale-105 z-10 blur-none tile-hovered";
    } else if (isAnyHovered) {
      return "scale-100 z-[1] blur-[5px]";
    } else {
      return "scale-100 z-[1] blur-none";
    }
  };

  return (
    <div
      ref={tileRef}
      className={`${gridSpan} font-exo
          bg-white/20 border border-white/20
          rounded-xl p-6 flex flex-col shadow-lg ${
            !isTouchDevice ? "cursor-pointer" : ""
          } dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30
          ${!isTouchDevice ? `transition-tile ${getTransformClasses()}` : ""}
          will-change-transform`}
      onMouseEnter={!isTouchDevice ? onHover : undefined}
      onMouseLeave={!isTouchDevice ? onLeave : undefined}
      onClick={isTouchDevice ? onHover : undefined}
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
