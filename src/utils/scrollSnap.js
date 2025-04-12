import { useEffect } from "react";

export function useScrollSnap() {
  useEffect(() => {
    let isScrolling = false;
    let sections = [];
    let currentSectionIndex = 0;

    const initSections = () => {
      sections = Array.from(
        document.querySelectorAll(
          '[id^="home"], [id^="about"], [id^="skills"], [id^="dsa"], [id^="github"], [id^="projects"], [id^="contact"]'
        )
      );
      // Find current section on initial load
      const scrollPosition = window.scrollY + 100;
      currentSectionIndex =
        sections.findIndex((section) => {
          return section.offsetTop > scrollPosition;
        }) - 1;

      if (currentSectionIndex < 0) currentSectionIndex = 0;
    };

    const handleWheel = (e) => {
      if (isScrolling) return;

      // Detect scroll direction
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.min(
        Math.max(currentSectionIndex + direction, 0),
        sections.length - 1
      );

      if (nextIndex !== currentSectionIndex) {
        isScrolling = true;
        currentSectionIndex = nextIndex;

        // Scroll to the next section
        sections[nextIndex].scrollIntoView({
          behavior: "smooth",
        });

        // Prevent multiple scroll events
        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }

      e.preventDefault();
    };

    // Initialize
    initSections();

    // Add event listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", initSections);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", initSections);
    };
  }, []);
}
