import PropTypes from "prop-types";
import { memo } from "react";

/**
 * Standardized section heading with subtitle support and dark mode compatibility
 */
const SectionHeading = memo(({ title, subtitle, subtitleClassName = "" }) => {
  return (
    <>
      <h2
        className="text-4xl font-halfomania 
         text-white
       text-center mb-6"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-center 
            text-white
          mb-16 font-mono ${subtitleClassName}`}
        >
          {subtitle}
        </p>
      )}
    </>
  );
});

SectionHeading.displayName = "SectionHeading";

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  subtitleClassName: PropTypes.string,
};

export default SectionHeading;
