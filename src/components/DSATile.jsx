import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FaAlgolia,
  FaCode,
  FaLaptopCode,
  FaTrophy,
  FaCheckCircle,
  FaCrown,
  FaChartLine,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const DSATile = ({
  title,
  value,
  category,
  icon,
  isHovered,
  isAnyHovered,
  onHover,
  onLeave,
}) => {
  // Determine tile size based on stat category
  const isLarge = ["totalSolved", "ranking"].includes(category);
  const isMedium = [
    "easySolved",
    "mediumSolved",
    "hardSolved",
    "acceptanceRate",
    "contributionPoints",
  ].includes(category);

  // Set grid span classes based on importance with responsive design
  const gridSpan = isLarge
    ? "col-span-2 row-span-2 sm:col-span-2 md:col-span-2" // Large 2x2 tiles
    : isMedium
    ? "col-span-2 row-span-1 sm:col-span-2 md:col-span-2" // Medium wide tiles
    : "col-span-1 row-span-1"; // Small square tiles

  // Choose color based on category
  const getIconColor = () => {
    switch (category) {
      case "totalSolved":
        return "#3182ce"; // Blue
      case "easySolved":
        return "#00b8a3"; // Green
      case "mediumSolved":
        return "#b89e19"; // Yellow
      case "hardSolved":
        return "#ef4743"; // Red
      case "ranking":
        return "#805ad5"; // Purple
      case "acceptanceRate":
        return "#38a169"; // Green
      case "contributionPoints":
        return "#e53e3e"; // Red
      case "submissionCalendar":
        return "#319795"; // Teal
      default:
        return "#718096"; // Gray
    }
  };

  // Get icon based on category
  const getIcon = () => {
    return (
      <>
        {(isLarge || isMedium) && (
          <div className="hidden sm:block">{renderIcon(isLarge ? 80 : 40)}</div>
        )}
        <div className="sm:hidden">
          {renderIcon(isLarge ? 50 : isMedium ? 30 : 24)}
        </div>
      </>
    );
  };

  const renderIcon = (size) => {
    switch (category) {
      case "totalSolved":
        return <SiLeetcode size={size} color={getIconColor()} />;
      case "easySolved":
        return <FaCode size={size} color={getIconColor()} />;
      case "mediumSolved":
        return <FaLaptopCode size={size} color={getIconColor()} />;
      case "hardSolved":
        return <FaAlgolia size={size} color={getIconColor()} />;
      case "ranking":
        return <FaTrophy size={size} color={getIconColor()} />;
      case "acceptanceRate":
        return <FaCheckCircle size={size} color={getIconColor()} />;
      case "contributionPoints":
        return <FaCrown size={size} color={getIconColor()} />;
      default:
        return <FaChartLine size={size} color={getIconColor()} />;
    }
  };

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
      className={`${gridSpan}
        dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 backdrop-blur-md
        bg-white/20 shadow-lg
        rounded-md p-2 sm:p-4 flex h-full`}
      style={{
        transition: "transform 0.3s ease-in-out, filter 0.2s ease-in-out",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-2 sm:mr-3">{icon || getIcon()}</div>
        <div>
          <span
            className={`dark:text-slate-200 text-slate-700
             font-medium text-sm sm:text-${isLarge ? "xl" : "sm"} block`}
          >
            {title}
          </span>
          <span
            className={`text-sm sm:text-${isLarge ? "xl" : "lg"} font-bold`}
            style={{ color: getIconColor() }}
          >
            {value}
          </span>
        </div>
      </div>
    </div>
  );
};

DSATile.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool,
  isHovered: PropTypes.bool,
  isAnyHovered: PropTypes.bool,
  onHover: PropTypes.func,
  onLeave: PropTypes.func,
};

export default DSATile;
