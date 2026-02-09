import React, { memo } from "react";
import ThemedCard from "./ui/ThemedCard";
import PropTypes from "prop-types";
import { useDeviceDetection } from "../hooks/useDeviceDetection";

const ButtonClassName = ({ isTouchDevice, secondary = false }) => {
  const baseClass = `grow text-center text-white py-2 px-4 transition-colors ease-in-out duration-150`;
  const primaryClass = `bg-[#FF5C00] ${
    !isTouchDevice ? "hover:bg-[#FF8533]" : "active:bg-[#FF8533]"
  }`;
  const secondaryClass = `bg-[#1a1a1a] ${
    !isTouchDevice ? "hover:bg-[#2a2a2a]" : "active:bg-[#2a2a2a]"
  }`;
  return `${baseClass} ${secondary ? secondaryClass : primaryClass} border-2 border-[#FF5C00] rounded-[9px]`;
};

const normalizeProjectUrl = (projectUrl) => {
  if (!projectUrl) return [];
  if (typeof projectUrl === "string")
    return [{ label: "GitHub", url: projectUrl }];
  if (Array.isArray(projectUrl)) {
    return projectUrl.map((project) => {
      if (typeof project === "string") return { label: "GitHub", url: project };
      const [type, url] = Object.entries(project)[0];
      return { label: type.charAt(0).toUpperCase() + type.slice(1), url };
    });
  }
  return [];
};

const ProjectTile = memo(
  ({ title, description, technologies, imageUrl, projectUrl, livelink }) => {
    const { isTouchDevice } = useDeviceDetection();
    const projects = normalizeProjectUrl(projectUrl);

    return (
      <ThemedCard className="flex flex-col h-full">
        {imageUrl && (
          <div className="w-full h-68 overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover rounded-t-[10px]"
            />
          </div>
        )}

        <h3 className="text-xl font-exo text-white m-6 z-10">{title}</h3>

        <p className="text-white font-mono m-6 grow z-10">{description}</p>

        {technologies && technologies.length > 0 && (
          <div className="m-6 z-10">
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-[#FF5C00] border-2 text-white px-2 py-1 rounded-full border-[#FF5C00]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-6 m-6 z-10">
          {livelink && (
            <a
              href={livelink}
              target="_blank"
              rel="noopener noreferrer"
              className={ButtonClassName({ isTouchDevice, secondary: false })}
            >
              Live Demo
            </a>
          )}
          {projects.map((project) => (
            <a
              key={project.label}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={ButtonClassName({ isTouchDevice, secondary: true })}
            >
              {project.label}
            </a>
          ))}
        </div>
      </ThemedCard>
    );
  },
);

ProjectTile.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string,
  projectUrl: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    ),
  ]),
  livelink: PropTypes.string,
};

ProjectTile.displayName = "ProjectTile";

export default ProjectTile;
