import React from "react";
import {
  FaGithub,
  FaCodeBranch,
  FaCode,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import { SiGithubactions } from "react-icons/si";
import { BiGitRepoForked } from "react-icons/bi";

const GitHubStatsTile = ({ title, value, category, icon}) => {
  // Determine tile size based on stat category
  const isLarge = [
    "totalRepos",
    "totalContributions",
    "allRepos",
    "profile",
    "forks",
  ].includes(category);
  const isMedium = [
    "stars",
    "followers",
    "topRepos",
    "commitActivity",
  ].includes(category);

  // Get responsive grid classes
  const getGridSpan = () => {
    // Languages tile
    if (category === "languages") {
      return "col-span-1 sm:col-span-3 row-span-2";
    }

    // All repos tile
    if (category === "allRepos") {
      return "col-span-1 sm:col-span-3 row-span-2";
    }

    // Other tiles
    if (isLarge) {
      return "col-span-1 sm:col-span-2 row-span-2"; // Large tiles
    }

    if (isMedium) {
      return "col-span-1 sm:col-span-2 row-span-1"; // Medium tiles
    }

    return "col-span-1 row-span-1"; // Default small tiles
  };

  // Choose color based on category
  const getIconColor = () => {
    switch (category) {
      case "totalRepos":
        return "#2563eb"; // Blue
      case "stars":
        return "#f59e0b"; // Amber
      case "forks":
        return "#10b981"; // Emerald
      case "followers":
        return "#6366f1"; // Indigo
      case "languages":
        return "#8b5cf6"; // Violet
      case "totalContributions":
        return "#ec4899"; // Pink
      case "topRepos":
        return "#14b8a6"; // Teal
      case "commitActivity":
        return "#ef4444"; // Red
      case "pullRequests":
        return "#7c3aed"; // Purple
      case "issues":
        return "#f97316"; // Orange
      default:
        return "#6b7280"; // Gray
    }
  };

  // Get icon based on category
  const getIcon = () => {
    const iconSize = isLarge ? 40 : isMedium ? 32 : 24;

    switch (category) {
      case "totalRepos":
        return (
          <FaGithub
            size={iconSize}
            className="md:text-6xl lg:text-7xl"
            color={getIconColor()}
          />
        );
      case "forks":
        return (
          <FaCodeBranch
            size={iconSize}
            className="md:text-6xl lg:text-7xl"
            color={getIconColor()}
          />
        );
      case "languages":
        return (
          <FaCode
            size={iconSize}
            className="md:text-6xl lg:text-7xl"
            color={getIconColor()}
          />
        );
      case "totalContributions":
        return (
          <SiGithubactions
            size={iconSize}
            className="md:text-6xl lg:text-7xl"
            color={getIconColor()}
          />
        );
      case "allRepos":
        return (
          <FaGithub
            size={iconSize}
            className="md:text-6xl lg:text-7xl"
            color={getIconColor()}
          />
        );
      case "profile":
        return (
          <FaUsers
            size={iconSize}
            className="md:text-6xl lg:text-7xl"
            color={getIconColor()}
          />
        );
      default:
        return (
          <FaChartLine
            size={iconSize}
            className="md:text-6xl lg:text-7xl"
            color={getIconColor()}
          />
        );
    }
  };

  // Special rendering for languages tile
  if (category === "languages" && Array.isArray(value)) {
    return (
      <div
        className={`${getGridSpan()} bg-white/20 border-white/20 dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 backdrop-blur-md shadow-lg rounded-md p-3 md:p-4 flex flex-col transition-all hover:shadow-lg`}
      >
        <div className="flex items-center mb-2 md:mb-3">
          <div className="flex-shrink-0 mr-2 md:mr-3">
            <FaCode size={24} className="md:text-3xl" color={getIconColor()} />
          </div>
          <span className="text-slate-700 dark:text-slate-200 font-medium text-sm md:text-base">
            {title}
          </span>
        </div>

        <div className="flex flex-col space-y-1 md:space-y-2 flex-1 overflow-y-auto">
          {value.slice(0, 6).map((lang, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-2 h-2 md:w-3 md:h-3 rounded-full mr-2"
                style={{
                  backgroundColor: lang.color || getLanguageColor(lang.name),
                }}
              ></div>
              <span className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300 flex-1 truncate">
                {lang.name}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {lang.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Special rendering for all repositories
  if (category === "allRepos" && Array.isArray(value)) {
    return (
      <div
        className={`${getGridSpan()} 
            dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 backdrop-blur-md
            bg-white/20 border border-white/20
       shadow-lg rounded-md p-3 md:p-4 flex flex-col transition-all hover:shadow-lg`}
      >
        <div className="flex items-center mb-2 md:mb-3">
          <div className="flex-shrink-0 mr-2 md:mr-3">
            <FaGithub size={24} className="md:text-3xl" color="#2563eb" />
          </div>
          <span
            className="dark:text-slate-200 text-slate-700
           font-medium text-sm md:text-base"
          >
            {title}
          </span>
        </div>

        <div className="flex flex-col space-y-0.5 md:space-y-1 overflow-y-auto max-h-36 md:max-h-48 pr-1 md:pr-2">
          {value.slice(0, 6).map((repo, index) => (
            <a
              key={index}
              href={
                repo.html_url ||
                `https://github.com/${repo.full_name || repo.name}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm hover:underline 
              dark:text-slate-300 text-slate-700
            flex items-center py-0.5 md:py-1 border-b 
               dark:border-slate-700 border-slate-200"
            >
              <span className="mr-auto truncate max-w-[70%]">{repo.name}</span>
              <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
                {repo.language && (
                  <span
                    className="text-xs dark:bg-slate-700 bg-slate-200
                    px-1 py-0.5 rounded hidden md:inline"
                  >
                    {repo.language}
                  </span>
                )}
                {repo.forks_count > 0 && (
                  <div className="flex items-center">
                    <BiGitRepoForked
                      size={12}
                      className="text-emerald-500 mr-0.5"
                    />
                    <span
                      className= "text-xs dark:text-slate-400 text-slate-500"
    
                    >
                      {repo.forks_count}
                    </span>
                  </div>
                )}
              </div>
            </a>
          ))}
          {value.length > 6 && (
            <span
              className="text-xs text-center 
                dark:text-slate-400 text-slate-500
              italic pt-1"
            >
              And {value.length - 6} more repositories...
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${getGridSpan()} bg-white/20 border-white/20 dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 backdrop-blur-md shadow-lg rounded-md p-3 md:p-4 flex flex-col transition-all hover:shadow-lg cursor-pointer`}
    >
      <div className="flex items-center h-full">
        <div className="flex-shrink-0 mr-2 md:mr-3">{icon || getIcon()}</div>
        <div className="flex flex-col">
          <span className="text-slate-700 dark:text-slate-200 font-medium text-sm md:text-base">
            {title}
          </span>
          <span
            className="text-lg md:text-xl font-bold"
            style={{ color: getIconColor() }}
          >
            {value}
          </span>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine language color
const getLanguageColor = (language) => {
  const colors = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Python: "#3572A5",
    Java: "#b07219",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Go: "#00ADD8",
    Rust: "#dea584",
    Swift: "#ffac45",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    Shell: "#89e051",
    // Add more as needed
  };

  return colors[language] || "#6b7280"; // Gray as fallback
};

export default GitHubStatsTile;
