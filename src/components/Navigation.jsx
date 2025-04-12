import React, { useState, useEffect } from "react";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Function to determine which section is currently in view
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "dsa",
        "github",
        "projects",
        "contact",
      ];

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
    }
  };

  // Navigation items with labels and section IDs
  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="fixed top-0 w-full flex items-center justify-center z-50">
      <div className="flex font-mono text-md w-[40%] justify-evenly mt-[30px] bg-white/20 backdrop-blur-md border border-white/20 shadow-lg text-slate-600 p-2 rounded-2xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`navbutton ${
              activeSection === item.id ? "text-purple-600 after:w-full" : ""
            }`}
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
