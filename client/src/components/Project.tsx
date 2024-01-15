import { ProjectState } from '../types';

type Props = {
  project: ProjectState;
  handleProjectSwitch: (project: ProjectState) => void;
  workingProject: ProjectState;
  removeProject: (projectId: string) => void;
  hideAllForms: () => void;
};

const Project = ({
  project,
  handleProjectSwitch,
  workingProject,
  removeProject,
  hideAllForms,
}: Props) => {
  return (
    <li
      key={project.id}
      className={`project ${project.id === workingProject.id ? 'on-page' : ''}`}
      onClick={() => {
        handleProjectSwitch(project);
        hideAllForms();
      }}
    >
      <p className="project-name">{project.name}</p>
      <div>
        <p className="edit button">📝</p>
        {project.name !== 'Default' && (
          <p
            className="remove button"
            onClick={(event) => {
              event.stopPropagation();
              removeProject(project.id);
              hideAllForms();
            }}
          >
            ❌
          </p>
        )}
      </div>
    </li>
  );
};

export default Project;
