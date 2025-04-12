import React from "react";
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

const DSATile = ({ title, value, category, icon, isDarkMode }) => {
  // Determine tile size based on stat category
  const isLarge = ["totalSolved", "ranking", "submissionCalendar"].includes(
    category
  );
  const isMedium = [
    "easySolved",
    "mediumSolved",
    "hardSolved",
    "acceptanceRate",
    "contributionPoints",
  ].includes(category);

  // Set grid span classes based on importance
  const gridSpan = isLarge
    ? "col-span-2 row-span-2" // Large 2x2 tiles
    : isMedium
    ? "col-span-2 row-span-1" // Medium wide tiles
    : "col-span-1 row-span-1"; // Small square tiles

  // Choose color based on category
  const getIconColor = () => {
    switch (category) {
      case "totalSolved":
        return "#3182ce"; // Blue
      case "easySolved":
        return "#00b8a3"; // Green
      case "mediumSolved":
        return "#ffc01e"; // Yellow
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
    switch (category) {
      case "totalSolved":
        return <SiLeetcode size={isLarge ? 80 : 40} color={getIconColor()} />;
      case "easySolved":
        return <FaCode size={isLarge ? 80 : 40} color={getIconColor()} />;
      case "mediumSolved":
        return <FaLaptopCode size={isLarge ? 80 : 40} color={getIconColor()} />;
      case "hardSolved":
        return <FaAlgolia size={isLarge ? 80 : 40} color={getIconColor()} />;
      case "ranking":
        return <FaTrophy size={isLarge ? 80 : 40} color={getIconColor()} />;
      case "acceptanceRate":
        return (
          <FaCheckCircle size={isLarge ? 80 : 40} color={getIconColor()} />
        );
      case "contributionPoints":
        return <FaCrown size={isLarge ? 80 : 40} color={getIconColor()} />;
      default:
        return <FaChartLine size={isLarge ? 80 : 40} color={getIconColor()} />;
    }
  };

  return (
    <div
      className={`${gridSpan} ${
        isDarkMode
          ? "dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 backdrop-blur-md"
          : "bg-white/20 shadow-lg"
      } rounded-md p-4 flex h-full transition-all hover:shadow-lg cursor-pointer`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-3">{icon || getIcon()}</div>
        <div>
          <span
            className={`${
              isDarkMode ? "dark:text-slate-200" : "text-slate-700"
            } font-medium text-${isLarge ? "xl" : "lg"} block`}
          >
            {title}
          </span>
          <span
            className={`text-${isLarge ? "2xl" : "lg"} font-bold`}
            style={{ color: getIconColor() }}
          >
            {value}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DSATile;
