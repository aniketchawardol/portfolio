
import PropTypes from "prop-types";

/**
 * Standardized section heading with subtitle support and dark mode compatibility
 */
const SectionHeading = ({
  title,
  subtitle,

  subtitleClassName = "",
}) => {

  return (
    <>
      <h2
        className="text-4xl font-halfomania 
         text-slate-200
       text-center mb-6 ${titleClassName}"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-center 
            text-slate-300
          mb-16 font-mono ${subtitleClassName}`}
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
