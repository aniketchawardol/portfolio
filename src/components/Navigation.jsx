import React, { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../utils/ThemeProvider";
import NavigationButton from "./NavigationButton";
import { NAV_ITEMS } from "../constants/navigation";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const { theme } = useTheme();
  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    // Function to determine which section is currently in view
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => item.id);

      const scrollPosition = window.scrollY + 100; // Add offset for navbar height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

      // Set active section immediately for better UX
      setActiveSection(sectionId);

      // Disable scroll handling briefly to avoid conflicts
      const scrollHandler = window.onwheel;
      window.onwheel = null;
      setTimeout(() => {
        window.onwheel = scrollHandler;
      }, 1000);
    }
  };

  const getContainerClasses = () => {
    return `backdrop-blur-md flex font-mono text-md w-[40%] justify-evenly mt-[30px] ${
      isDarkMode
        ? "dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 backdrop-blur-md dark:text-slate-300"
        : "bg-white/20 border-white/20 text-slate-600"
    } border shadow-lg p-2 rounded-2xl`;
  };

  return (
    <div className="fixed top-0 w-full flex items-center justify-center z-50">
      <div className={getContainerClasses()}>
        {NAV_ITEMS.map((item) => (
          <NavigationButton
            key={item.id}
            label={item.label}
            id={item.id}
            isActive={activeSection === item.id}
            isDarkMode={isDarkMode}
            onClick={scrollToSection}
          />
        ))}

        <div className="mx-3">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
