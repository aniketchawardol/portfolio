import React, { memo } from "react";
import GlowCard from "../GlowCard";
import PropTypes from "prop-types";

/**
 * A themed card component with spotlight effect and dark mode support
 */
const ThemedCard = memo(
  ({
    children,
    className = "",
    padding = "",
    withSpotlight = true,
    ...props
  }) => {
    const baseClasses = `bg-[#1a1a1a]/80 border border-[#FF5C00] border-2 rounded-xl backdrop-blur-md ${padding} ${className}`;

    if (!withSpotlight) {
      return (
        <div className={baseClasses} {...props}>
          {children}
        </div>
      );
    }

    return (
      <GlowCard className={baseClasses} customSize={true} {...props}>
        {children}
      </GlowCard>
    );
  },
);

ThemedCard.displayName = "ThemedCard";

ThemedCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.string,
  withSpotlight: PropTypes.bool,
};

export default ThemedCard;
