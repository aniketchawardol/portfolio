import React from "react";
import { useIsDarkMode } from "../../hooks/useIsDarkMode";
import PropTypes from "prop-types";

/**
 * A standardized container for page sections with consistent styling and dark mode support
 */
const SectionContainer = ({
  id,
  children,
  className = "",
  gradientLight = "from-[#cbb4f0] via-[#b6a6e3] to-[#a28cd1]",
  gradientDark = "dark:from-[#0f0a29] dark:via-[#191036] dark:to-[#1e0438]",
  heightClass = "min-h-screen",
}) => {
  const isDarkMode = useIsDarkMode();

  return (
    <div
      id={id}
      className={`w-full ${heightClass} flex items-center justify-center ${
        isDarkMode
          ? `bg-gradient-to-b ${gradientDark}`
          : `bg-gradient-to-b ${gradientLight}`
      } py-16 relative ${className}`}
    >
      <div className="container mx-auto px-4 relative z-10">{children}</div>
    </div>
  );
};

SectionContainer.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  gradientLight: PropTypes.string,
  gradientDark: PropTypes.string,
  heightClass: PropTypes.string,
};

export default SectionContainer;
