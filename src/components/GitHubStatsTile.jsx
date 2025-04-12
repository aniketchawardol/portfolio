import React from "react";
import {
  FaGithub,
  FaStar,
  FaCodeBranch,
  FaCode,
  FaUsers,
  FaUserFriends,
  FaArchive,
  FaPuzzlePiece,
  FaChartLine,
} from "react-icons/fa";
import { SiGithubactions } from "react-icons/si";
import { BiGitRepoForked } from "react-icons/bi";

const GitHubStatsTile = ({ title, value, category, icon, isDarkMode }) => {
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

  // Set grid span classes based on importance
  let gridSpan = isLarge
    ? "col-span-2 row-span-2" // Large 2x2 tiles
    : isMedium
    ? "col-span-2 row-span-1" // Medium wide tiles
    : "col-span-1 row-span-1"; // Small square tiles

  // Special handling for languages tile - make it 50% width (3 columns in a 6-column grid)
  if (category === "languages") {
    gridSpan = "col-span-3 row-span-2";
  }

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
    switch (category) {
      case "totalRepos":
        return (
          <FaGithub
            size={isLarge ? 80 : isMedium ? 48 : 28}
            color={getIconColor()}
          />
        );
      case "forks":
        return (
          <FaCodeBranch
            size={isLarge ? 80 : isMedium ? 48 : 28}
            color={getIconColor()}
          />
        );
      case "languages":
        return (
          <FaCode
            size={isLarge ? 80 : isMedium ? 48 : 28}
            color={getIconColor()}
          />
        );
      case "totalContributions":
        return (
          <SiGithubactions
            size={isLarge ? 80 : isMedium ? 48 : 28}
            color={getIconColor()}
          />
        );
      case "allRepos":
        return (
          <FaGithub
            size={isLarge ? 80 : isMedium ? 48 : 28}
            color={getIconColor()}
          />
        );
      case "profile":
        return (
          <FaUsers
            size={isLarge ? 80 : isMedium ? 48 : 28}
            color={getIconColor()}
          />
        );
      default:
        return (
          <FaChartLine
            size={isLarge ? 80 : isMedium ? 48 : 28}
            color={getIconColor()}
          />
        );
    }
  };

  // Special rendering for languages tile
  if (category === "languages" && Array.isArray(value)) {
    return (
      <div
        className={`${gridSpan} ${
          isDarkMode
            ? "dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 backdrop-blur-md"
            : "bg-white/20 border border-white/20"
        } shadow-lg rounded-md p-4 flex flex-col transition-all hover:shadow-lg`}
      >
        <div className="flex items-center mb-3">
          <div className="flex-shrink-0 mr-3">
            <FaCode size={32} color={getIconColor()} />
          </div>
          <span
            className={`${
              isDarkMode ? "dark:text-slate-200" : "text-slate-700"
            } font-medium`}
          >
            {title}
          </span>
        </div>

        <div className="flex flex-col space-y-2 flex-1">
          {value.slice(0, 8).map((lang, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{
                  backgroundColor: lang.color || getLanguageColor(lang.name),
                }}
              ></div>
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? "dark:text-slate-300" : "text-slate-600"
                } flex-1`}
              >
                {lang.name}
              </span>
              <span
                className={`text-xs ${
                  isDarkMode ? "dark:text-slate-400" : "text-slate-500"
                }`}
              >
                {lang.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Special rendering for profile tile
  if (category === "profile" && value) {
    return (
      <div
        className={`${gridSpan} ${
          isDarkMode
            ? "dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 backdrop-blur-md"
            : "bg-transparent border-slate-400"
        } border-2 rounded-md p-4 flex flex-col transition-all hover:shadow-lg`}
      >
        <div className="flex items-center mb-3">
          <div className="flex-shrink-0 mr-3">
            <img
              src={value.avatar_url}
              alt={`${value.login}'s avatar`}
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div>
            <span
              className={`${
                isDarkMode ? "dark:text-slate-200" : "text-slate-700"
              } font-medium block`}
            >
              {value.name || value.login}
            </span>
            <span
              className={`${
                isDarkMode ? "dark:text-slate-400" : "text-slate-500"
              } text-sm`}
            >
              {value.bio || "GitHub Developer"}
            </span>
          </div>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <div
            className={`${
              isDarkMode ? "dark:text-slate-300" : "text-slate-600"
            }`}
          >
            Following: {value.following}
          </div>
          <div
            className={`${
              isDarkMode ? "dark:text-slate-300" : "text-slate-600"
            }`}
          >
            Public Repos: {value.public_repos}
          </div>
        </div>
      </div>
    );
  }

  // Special rendering for all repositories
  if (category === "allRepos" && Array.isArray(value)) {
    return (
      <div
        className={`col-span-3 row-span-2 ${
          isDarkMode
            ? "dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 backdrop-blur-md"
            : "bg-white/20 border border-white/20"
        } shadow-lg rounded-md p-4 flex flex-col transition-all hover:shadow-lg`}
      >
        <div className="flex items-center mb-3">
          <div className="flex-shrink-0 mr-3">
            <FaGithub size={32} color="#2563eb" />
          </div>
          <span
            className={`${
              isDarkMode ? "dark:text-slate-200" : "text-slate-700"
            } font-medium`}
          >
            {title}
          </span>
        </div>

        <div className="flex flex-col space-y-1 overflow-y-auto max-h-48 pr-2">
          {value.slice(0, 10).map((repo, index) => (
            <a
              key={index}
              href={
                repo.html_url ||
                `https://github.com/${repo.full_name || repo.name}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm hover:underline ${
                isDarkMode ? "dark:text-slate-300" : "text-slate-700"
              } flex items-center py-1 border-b ${
                isDarkMode ? "dark:border-slate-700" : "border-slate-200"
              }`}
            >
              <span className="mr-auto truncate max-w-[70%]">{repo.name}</span>
              <div className="flex items-center space-x-2 flex-shrink-0">
                {repo.language && (
                  <span
                    className={`text-xs ${
                      isDarkMode ? "dark:bg-slate-700" : "bg-slate-200"
                    } px-1.5 py-0.5 rounded`}
                  >
                    {repo.language}
                  </span>
                )}
                {repo.forks_count > 0 && (
                  <div className="flex items-center">
                    <BiGitRepoForked
                      size={12}
                      className="text-emerald-500 mr-1"
                    />
                    <span
                      className={`text-xs ${
                        isDarkMode ? "dark:text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {repo.forks_count}
                    </span>
                  </div>
                )}
              </div>
            </a>
          ))}
          {value.length > 10 && (
            <span
              className={`text-xs text-center ${
                isDarkMode ? "dark:text-slate-400" : "text-slate-500"
              } italic pt-1`}
            >
              And {value.length - 10} more repositories...
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${gridSpan} ${
        isDarkMode
          ? "dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 backdrop-blur-md"
          : "bg-white/20 border border-white/20"
      } shadow-lg rounded-md p-4 flex flex-col transition-all hover:shadow-lg cursor-pointer`}
    >
      <div className="flex items-center h-full">
        <div className="flex-shrink-0 mr-3">{icon || getIcon()}</div>
        <div className="flex flex-col">
          <span
            className={`${
              isDarkMode ? "dark:text-slate-200" : "text-slate-700"
            } font-medium`}
          >
            {title}
          </span>
          <span
            className={`text-${isLarge ? "xl" : "lg"} font-bold ${
              isLarge ? "mt-2" : "mt-1"
            }`}
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
