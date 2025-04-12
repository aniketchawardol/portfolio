import React from "react";
import { useIsDarkMode } from "../../hooks/useIsDarkMode";
import SpotlightCard from "../../assets/Components/SpotlightCard/SpotlightCard";
import PropTypes from "prop-types";

/**
 * A themed card component with spotlight effect and dark mode support
 */
const ThemedCard = ({
  children,
  className = "",
  padding = "p-6",
  withSpotlight = true,
  ...props
}) => {
  const isDarkMode = useIsDarkMode();

  const baseClasses = `${
    isDarkMode
      ? "dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 backdrop-blur-md"
      : "bg-white/20 border border-white/20"
  } shadow-lg rounded-md ${padding} ${className}`;

  if (!withSpotlight) {
    return (
      <div className={baseClasses} {...props}>
        {children}
      </div>
    );
  }

  return (
    <SpotlightCard
      className={baseClasses}
      spotlightColor={isDarkMode ? "#4c1d95" : "#9b7dcf"}
      {...props}
    >
      {children}
    </SpotlightCard>
  );
};

ThemedCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.string,
  withSpotlight: PropTypes.bool,
};

export default ThemedCard;
