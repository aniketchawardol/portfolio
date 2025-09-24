
import ProjectTile from "./ProjectTile";
import SectionContainer from "./layout/SectionContainer";
import SectionHeading from "./ui/SectionHeading";
import { PROJECTS, COLORS } from "../constants";

const ProjectsSection = () => {
  return (
    <SectionContainer
      id="projects"
      gradientDark={COLORS.gradients.projectsDark}
      gradientLight={COLORS.gradients.projectsLight}
    >
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
};

export default ProjectsSection;
