import { createContext, useContext, useEffect } from "react";

// Create theme context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Apply theme based on system preference
  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = () => {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme();

    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme();

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Provide a simplified context with only system theme
  return (
    <ThemeContext.Provider value={{ theme: "system" }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
