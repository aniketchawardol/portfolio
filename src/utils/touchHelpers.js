// Utility functions for handling touch and hover interactions

/**
 * Returns appropriate event handlers based on device type
 * @param {Object} handlers - Object containing onHover and onLeave functions
 * @param {boolean} isTouchDevice - Whether the device is a touch device
 * @returns {Object} Event handlers object
 */
export const getInteractionHandlers = (handlers, isTouchDevice) => {
  const { onHover, onLeave } = handlers;
  
  if (isTouchDevice) {
    return {
      onClick: onHover,
      onTouchStart: onHover,
      onTouchEnd: onLeave,
    };
  }
  
  return {
    onMouseEnter: onHover,
    onMouseLeave: onLeave,
  };
};

/**
 * Returns appropriate CSS classes for hover/active states
 * @param {string} baseClasses - Base CSS classes
 * @param {string} hoverClasses - Classes to apply on hover (desktop)
 * @param {string} activeClasses - Classes to apply on active/touch (mobile) 
 * @param {boolean} isTouchDevice - Whether the device is a touch device
 * @returns {string} Combined CSS classes
 */
export const getResponsiveClasses = (
  baseClasses, 
  hoverClasses, 
  activeClasses = hoverClasses, 
  isTouchDevice
) => {
  const interactionClasses = isTouchDevice 
    ? activeClasses.replace(/hover:/g, 'active:')
    : hoverClasses;
    
  return `${baseClasses} ${interactionClasses}`;
};

/**
 * Returns appropriate cursor style based on device and element type
 * @param {boolean} isTouchDevice - Whether the device is a touch device
 * @param {boolean} isClickable - Whether the element is clickable
 * @returns {string} Cursor style
 */
export const getCursorStyle = (isTouchDevice, isClickable = true) => {
  if (!isClickable) return '';
  return isTouchDevice ? '' : 'cursor-pointer';
};
