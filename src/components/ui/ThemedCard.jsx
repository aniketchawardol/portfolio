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
    padding = "p-6",
    withSpotlight = true,
    ...props
  }) => {
    const baseClasses = `bg-[#2e1065]/30 border border-[#4c1d95]/30 shadow-lg rounded-xl backdrop-blur-md ${padding} ${className}`;

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
  }
);

ThemedCard.displayName = "ThemedCard";

ThemedCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.string,
  withSpotlight: PropTypes.bool,
};

export default ThemedCard;
