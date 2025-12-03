import { memo } from "react";
import ProjectTile from "./ProjectTile";
import SectionContainer from "./layout/SectionContainer";
import SectionHeading from "./ui/SectionHeading";
import { PROJECTS, COLORS } from "../constants";

const ProjectsSection = memo(() => {
  return (
    <SectionContainer id="projects" gradient={COLORS.gradients.projects}>
      <SectionHeading
        title="Featured Projects"
        subtitle="A showcase of my recent development work and personal projects"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROJECTS.map((project, index) => (
          <ProjectTile key={index} {...project} />
        ))}
      </div>
    </SectionContainer>
  );
});

ProjectsSection.displayName = "ProjectsSection";

export default ProjectsSection;
