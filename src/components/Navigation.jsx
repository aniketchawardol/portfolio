import React, { useState, useEffect } from "react";
import NavigationButton from "./NavigationButton";
import { NAV_ITEMS } from "../constants/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDeviceDetection } from "../hooks/useDeviceDetection";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isTouchDevice } = useDeviceDetection();

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
    return `mx-auto my-4 flex justify-evenly items-center bg-white/20 border-white/20 text-slate-600 dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 dark:text-slate-300 backdrop-blur-md border shadow-lg p-2 rounded-xl`;
  };

  return (
    <div className="fixed top-0 font-mono w-full flex items-center justify-center z-50 px-4">
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
            onClick={scrollToSection}
          />
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden w-full flex justify-end my-4">
        <div className="flex items-center bg-white/20 border-white/20 text-slate-600 dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 dark:text-slate-300 backdrop-blur-md border shadow-lg p-2 rounded-xl">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg dark:text-slate-200 text-slate-700"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden fixed top-[100px] left-0 right-0 p-4 rounded-lg shadow-lg backdrop-blur-md transition-all ease-in-out duration-300 
        bg-white/20 border-white/20 text-slate-600 dark:bg-[#2e1065]/20 dark:border-[#4c1d95]/30 dark:text-slate-300
        border grid grid-cols-2 gap-3 z-50 w-[80%] mx-auto ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`p-2 text-center rounded-md ${
              activeSection === item.id
                ? "bg-[#4c1d95]/50 dark:text-purple-300 text-purple-600"
                : ""
            } ${
              !isTouchDevice 
                ? "hover:bg-opacity-20 hover:bg-purple-100 dark:hover:bg-purple-800" 
                : "active:bg-opacity-20 active:bg-purple-100 dark:active:bg-purple-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
