import React from "react";
import ThemedCard from "./ui/ThemedCard";
import PropTypes from "prop-types";
import { useIsDarkMode } from "../hooks/useIsDarkMode";

const ProjectTile = ({
  title,
  description,
  technologies,
  imageUrl,
  projectUrl,
  livelink,
}) => {
  const isDarkMode = useIsDarkMode();

  return (
    <ThemedCard className="flex flex-col h-full">
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden rounded-md mb-4">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h3
        className={`text-xl font-exo ${
          isDarkMode ? "dark:text-slate-200" : "text-slate-700"
        } mb-2 z-10`}
      >
        {title}
      </h3>

      <p
        className={`${
          isDarkMode ? "dark:text-slate-300" : "text-slate-600"
        } font-mono mb-4 flex-grow z-10`}
      >
        {description}
      </p>

      {technologies && technologies.length > 0 && (
        <div className="mb-4 z-10">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className={`text-xs ${
                  isDarkMode
                    ? "dark:bg-[#3b0764]/50 dark:text-slate-300"
                    : "bg-white/30 text-slate-700"
                } px-2 py-1 rounded-full`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-auto z-10">
        {livelink && (
          <a
            href={livelink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-grow text-center bg-[#5c4a99] text-white py-2 px-4 rounded-md hover:bg-[#473677] transition-colors ease-in-out duration-150"
          >
            Live Demo
          </a>
        )}

        {projectUrl && (
          <>
            {Array.isArray(projectUrl) &&
            projectUrl.length > 0 &&
            projectUrl[0] &&
            typeof projectUrl[0] === "object" ? (
              projectUrl.map((project, index) => {
                const [type, url] = Object.entries(project)[0];
                return (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow text-center bg-[#2d2545] text-white py-2 px-4 rounded-md hover:bg-[#221c34] transition-colors ease-in-out duration-150"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </a>
                );
              })
            ) : Array.isArray(projectUrl) ? (
              <a
                href={projectUrl[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-grow text-center bg-[#2d2545] text-white py-2 px-4 rounded-md hover:bg-[#221c34] transition-colors ease-in-out duration-150"
              >
                GitHub
              </a>
            ) : (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-grow text-center bg-[#2d2545] text-white py-2 px-4 rounded-md hover:bg-[#221c34] transition-colors ease-in-out duration-150"
              >
                View Project
              </a>
            )}
          </>
        )}
      </div>
    </ThemedCard>
  );
};

ProjectTile.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string,
  projectUrl: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    ),
  ]),
  livelink: PropTypes.string,
};

export default ProjectTile;
