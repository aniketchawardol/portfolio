import PropTypes from "prop-types";
import { memo } from "react";

/**
 * A standardized container for page sections with consistent styling
 */
const SectionContainer = memo(
  ({
    id,
    children,
    className = "",
    gradient = "from-[#000000] via-[#0a0a0a] to-[#000000]",
    heightClass = "min-h-screen",
  }) => {
    return (
      <div
        id={id}
        className={`w-full ${heightClass} flex items-center justify-center 
      bg-gradient-to-b ${gradient} py-16 relative ${className}`}
      >
        <div className="container mx-auto px-4 relative z-10">{children}</div>
      </div>
    );
  },
);

SectionContainer.displayName = "SectionContainer";

SectionContainer.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  gradient: PropTypes.string,
  heightClass: PropTypes.string,
};

export default SectionContainer;
