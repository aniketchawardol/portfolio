import { useTheme } from "../utils/ThemeProvider";
import { useEffect, useState } from "react";

/**
 * Custom hook that returns whether the current theme is dark mode
 * @returns {boolean} - True if dark mode is active
 */
export function useIsDarkMode() {
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initial check
    const checkDarkMode = () => {
      return (
        theme === "dark" ||
        (theme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    };

    setIsDarkMode(checkDarkMode());

    // Set up listener for system preference changes if using system theme
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => setIsDarkMode(checkDarkMode());

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  return isDarkMode;
}
