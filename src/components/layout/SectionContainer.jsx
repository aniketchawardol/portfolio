
import PropTypes from "prop-types";

/**
 * A standardized container for page sections with consistent styling
 */
const SectionContainer = ({
  id,
  children,
  className = "",
  gradientDark = "from-[#0f0a29] via-[#191036] to-[#1e0438]",
  heightClass = "min-h-screen",
}) => {
  return (
    <div
      id={id}
      className={`w-full ${heightClass} flex items-center justify-center 
      bg-gradient-to-b ${gradientDark} py-16 relative ${className}`}
    >
      <div className="container mx-auto px-4 relative z-10">{children}</div>
    </div>
  );
};

SectionContainer.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  gradientDark: PropTypes.string,
  heightClass: PropTypes.string,
};

export default SectionContainer;
