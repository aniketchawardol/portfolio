import { createContext, useContext, useEffect, useState } from "react";

// Create theme context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize theme state from localStorage or default to system
  const [theme, setTheme] = useState(() => {
    // Check if we have theme preference in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    // Otherwise, default to system
    return "system";
  });

  // Function to update theme and apply changes
  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply theme based on current selection
  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = () => {
      if (theme === "dark") {
        root.classList.add("dark");
      } else if (theme === "light") {
        root.classList.remove("dark");
      } else {
        // System preference
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    };

    applyTheme();

    // Listen for system preference changes if using system theme
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme();

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
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
