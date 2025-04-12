import React from "react";
import SpotlightCard from "../assets/Components/SpotlightCard/SpotlightCard";

const ProjectTile = ({
  title,
  description,
  technologies,
  imageUrl,
  projectUrl,
  livelink,
}) => {
  return (
    <SpotlightCard
      className="custom-spotlight-card flex flex-col bg-white/20 border border-white/20 shadow-lg rounded-md p-6 h-full backdrop-blur-md hover:scale-110 transition-all duration-200 ease-in-out"
      spotlightColor="#9b7dcf"
    >
      {imageUrl && (
        <div className="mb-4 z-10 overflow-hidden rounded-md">
          <img src={imageUrl} alt={title} className="w-full h-48" />
        </div>
      )}

      <h3 className="text-xl font-exo text-slate-700 mb-2 z-10">{title}</h3>

      <p className="text-slate-600 font-mono mb-4 flex-grow z-10">
        {description}
      </p>

      {technologies && technologies.length > 0 && (
        <div className="mb-4 z-10">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="text-xs bg-white/30 px-2 py-1 rounded-full text-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-auto z-10">
        {/* Live site link */}
        {livelink && (
          <a
            href={livelink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-grow text-center bg-[#7263b3] text-white py-2 px-4 rounded-md hover:bg-[#5e4b9c] transition-colors ease-in-out duration-150"
          >
            Live Demo
          </a>
        )}

        {/* Repository links */}
        {projectUrl && (
          <>
            {/* Handle array of objects with frontend/backend keys */}
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
                    className="flex-grow text-center bg-[#3f3860] text-white py-2 px-4 rounded-md hover:bg-[#332d4d] transition-colors ease-in-out duration-150"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </a>
                );
              })
            ) : /* Handle array of strings or single string */
            Array.isArray(projectUrl) ? (
              <a
                href={projectUrl[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-grow text-center bg-[#3f3860] text-white py-2 px-4 rounded-md hover:bg-[#332d4d] transition-colors ease-in-out duration-150"
              >
                GitHub
              </a>
            ) : (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-grow text-center bg-[#3f3860] text-white py-2 px-4 rounded-md hover:bg-[#332d4d] transition-colors ease-in-out duration-150"
              >
                View Project
              </a>
            )}
          </>
        )}
      </div>
    </SpotlightCard>
  );
};

export default ProjectTile;
