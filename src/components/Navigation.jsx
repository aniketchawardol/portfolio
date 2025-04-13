import React, { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../utils/ThemeProvider";
import NavigationButton from "./NavigationButton";
import { NAV_ITEMS } from "../constants/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

      // Close mobile menu after navigation
      setMobileMenuOpen(false);

      // Disable scroll handling briefly to avoid conflicts
      const scrollHandler = window.onwheel;
      window.onwheel = null;
      setTimeout(() => {
        window.onwheel = scrollHandler;
      }, 1000);
    }
  };

  const getContainerClasses = () => {
    return `backdrop-blur-md flex font-mono text-md justify-evenly mt-[30px] ${
      isDarkMode
        ? "dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 backdrop-blur-md dark:text-slate-300"
        : "bg-white/20 border-white/20 text-slate-600"
    } border shadow-lg p-2 rounded-2xl`;
  };

  return (
    <div className="fixed top-0 w-full flex items-center justify-center z-50 px-4">
      {/* Desktop Navigation */}
      <div
        className={`hidden md:flex ${getContainerClasses()} md:w-[80%] lg:w-[60%] xl:w-[40%]`}
      >
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

      {/* Mobile Navigation */}
      <div
        className={`md:hidden flex ${getContainerClasses()} justify-between`}
      >
        <div className="flex items-center">
          <div className="mr-2">
            <ThemeToggle />
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg ${
              isDarkMode ? "dark:text-slate-200" : "text-slate-700"
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden fixed top-[100px] left-0 right-0 mx-4 p-4 rounded-lg shadow-lg backdrop-blur-md ${
            isDarkMode
              ? "dark:bg-[#2e1065]/20 dark:border-[#4c1d95]/30 backdrop-blur-md dark:text-slate-300"
              : "bg-white/20 border-white/20 text-slate-600"
          } border grid grid-cols-2 gap-3 z-50 transition-all duration-300 w-[80%] mx-auto`}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`p-2 text-center rounded-md ${
                activeSection === item.id
                  ? isDarkMode
                    ? "bg-[#4c1d95]/50 dark:text-purple-300"
                    : "bg-purple-100 text-purple-600"
                  : ""
              } hover:bg-opacity-20 ${
                isDarkMode ? "hover:bg-purple-800" : "hover:bg-purple-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navigation;
