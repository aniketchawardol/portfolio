import React from "react";
import GlowCard from "../../assets/Components/GlowCard/GlowCard";
import PropTypes from "prop-types";
import { useTheme } from "../../utils/ThemeProvider";

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
  const { theme } = useTheme();
  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const baseClasses = `bg-white/20 border border-white/20 dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 shadow-lg rounded-xl backdrop-blur-md ${padding} ${className}`;

  if (!withSpotlight) {
    return (
      <div className={baseClasses} {...props}>
        {children}
      </div>
    );
  }

  return (
    <GlowCard
      className={baseClasses}
      customSize={true}
      isDarkMode={isDarkMode}
      {...props}
    >
      {children}
    </GlowCard>
  );
};

ThemedCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.string,
  withSpotlight: PropTypes.bool,
};

export default ThemedCard;
