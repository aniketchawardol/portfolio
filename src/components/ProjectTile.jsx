import React, { memo } from "react";
import ThemedCard from "./ui/ThemedCard";
import PropTypes from "prop-types";
import { useDeviceDetection } from "../hooks/useDeviceDetection";

const ButtonClassName = ({ isTouchDevice, secondary = false }) => {
  const baseClass = `grow text-center text-white py-2 px-4 rounded-md transition-colors ease-in-out duration-150`;
  const primaryClass = `bg-[#5c4a99] ${
    !isTouchDevice ? "hover:bg-[#473677]" : "active:bg-[#473677]"
  }`;
  const secondaryClass = `bg-[#2d2545] ${
    !isTouchDevice ? "hover:bg-[#221c34]" : "active:bg-[#221c34]"
  }`;
  return `${baseClass} ${secondary ? secondaryClass : primaryClass}`;
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
          <div className="w-full h-48 overflow-hidden rounded-xl mb-6">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h3 className="text-xl font-exo text-slate-200 mb-2 z-10">{title}</h3>

        <p className="text-slate-300 font-mono mb-6 grow z-10">{description}</p>

        {technologies && technologies.length > 0 && (
          <div className="mb-6 z-10">
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-[#3b0764]/50 text-slate-300 px-2 py-1 rounded-full"
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
  }
);

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

ProjectTile.displayName = "ProjectTile";

export default ProjectTile;
