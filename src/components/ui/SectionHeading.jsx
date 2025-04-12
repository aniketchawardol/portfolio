import React from "react";
import { useIsDarkMode } from "../../hooks/useIsDarkMode";
import PropTypes from "prop-types";

/**
 * Standardized section heading with subtitle support and dark mode compatibility
 */
const SectionHeading = ({
  title,
  subtitle,
  titleClassName = "",
  subtitleClassName = "",
}) => {
  const isDarkMode = useIsDarkMode();

  return (
    <>
      <h2
        className={`text-4xl font-halfomania ${
          isDarkMode ? "dark:text-slate-200" : "text-slate-700"
        } text-center mb-6 ${titleClassName}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-center ${
            isDarkMode ? "dark:text-slate-300" : "text-slate-600"
          } mb-16 font-mono ${subtitleClassName}`}
        >
          {subtitle}
        </p>
      )}
    </>
  );
};

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  titleClassName: PropTypes.string,
  subtitleClassName: PropTypes.string,
};

export default SectionHeading;
