import { useState, useEffect, useCallback, memo } from "react";
import NavigationButton from "./NavigationButton";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDeviceDetection } from "../hooks/useDeviceDetection";
import { NAV_ITEMS } from "../constants";

const CONTAINER_CLASSES =
  "mx-auto my-4 flex justify-evenly items-center bg-[#2e1065]/30 border-[#4c1d95]/30 text-slate-300 backdrop-blur-md border shadow-lg p-2 rounded-xl";

const Navigation = memo(() => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isTouchDevice } = useDeviceDetection();

  const sections = NAV_ITEMS.map((item) => item.id);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 100;

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection(sections[i]);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  }, []);

  return (
    <div className="fixed top-0 font-mono w-full flex items-center justify-center z-50 px-4">
      {/* Desktop Navigation */}
      <div
        className={`hidden md:flex ${CONTAINER_CLASSES} md:w-[80%] lg:w-[60%] xl:w-[40%]`}
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

      {/* Mobile Navigation Toggle */}
      <div className="md:hidden w-full flex justify-end my-4">
        <div className="flex items-center bg-[#2e1065]/30 border-[#4c1d95]/30 text-slate-300 backdrop-blur-md border shadow-lg p-2 rounded-xl">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-200"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[100px] left-0 right-0 p-4 rounded-lg shadow-lg backdrop-blur-md transition-all ease-in-out duration-300 bg-[#2e1065]/20 border-[#4c1d95]/30 text-slate-300 border grid grid-cols-2 gap-3 z-50 w-[80%] mx-auto ${
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
              activeSection === item.id ? "bg-[#4c1d95]/50 text-purple-300" : ""
            } ${
              !isTouchDevice ? "hover:bg-purple-800" : "active:bg-purple-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
});

Navigation.displayName = "Navigation";
export default memo(Navigation);
