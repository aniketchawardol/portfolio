import { useState, useEffect } from "react";

export const useDeviceDetection = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // Check for touch capability
      const hasTouch = 
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;

      // Check for mobile screen size
      const isMobileSize = window.innerWidth <= 768;
      
      // Check user agent for mobile devices
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      setIsTouchDevice(hasTouch);
      setIsMobile(isMobileSize || isMobileUA);
    };

    checkDevice();

    // Listen for resize events to update mobile status
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isTouchDevice, isMobile };
};
