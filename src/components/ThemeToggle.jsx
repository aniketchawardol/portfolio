import { useTheme } from "../utils/ThemeProvider";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, updateTheme } = useTheme();
  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div
      className={`flex items-center ${
        isDarkMode ? "dark:bg-slate-900/60" : "bg-white/30"
      } rounded-full p-1 shadow-inner`}
    >
      <button
        onClick={() => updateTheme("light")}
        className={`p-1.5 rounded-full transition-colors ${
          theme === "light"
            ? "bg-white text-purple-600"
            : isDarkMode
            ? "dark:text-slate-400 dark:hover:text-purple-300"
            : "text-slate-600 hover:text-purple-600"
        }`}
        aria-label="Light mode"
        title="Light mode"
      >
        <FaSun size={14} />
      </button>

      <button
        onClick={() => updateTheme("system")}
        className={`p-1.5 rounded-full transition-colors mx-0.5 ${
          theme === "system"
            ? isDarkMode
              ? "dark:bg-slate-800 dark:text-purple-300"
              : "bg-white text-purple-600"
            : isDarkMode
            ? "dark:text-slate-400 dark:hover:text-purple-300"
            : "text-slate-600 hover:text-purple-600"
        }`}
        aria-label="System preference"
        title="System preference"
      >
        <FaDesktop size={14} />
      </button>

      <button
        onClick={() => updateTheme("dark")}
        className={`p-1.5 rounded-full transition-colors ${
          theme === "dark"
            ? "bg-slate-800 text-purple-300"
            : isDarkMode
            ? "dark:text-slate-400 dark:hover:text-purple-300"
            : "text-slate-600 hover:text-purple-600"
        }`}
        aria-label="Dark mode"
        title="Dark mode"
      >
        <FaMoon size={14} />
      </button>
    </div>
  );
};

export default ThemeToggle;
