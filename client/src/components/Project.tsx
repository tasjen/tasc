import { ProjectState } from '../types';

type Props = {
  project: ProjectState;
  handleProjectSwitch: (project: ProjectState) => void;
  showingProject: ProjectState;
  removeProject: (projectId: string) => void;
  hideAllForms: () => void;
  setProjectFormEdit: (projectObject: { name: string; id: string }) => void;
};

const Project = ({
  project,
  handleProjectSwitch,
  showingProject,
  removeProject,
  hideAllForms,
  setProjectFormEdit,
}: Props) => {
  return (
    <li
      key={project.id}
      className={`project ${project.id === showingProject.id ? 'on-page' : ''}`}
      onClick={() => {
        handleProjectSwitch(project);
        hideAllForms();
      }}
    >
      <p className="project-name">{project.name}</p>
      {project.name !== 'Default' && (
        <div>
          <p
            className="edit button"
            onClick={(event) => {
              event.stopPropagation();
              setProjectFormEdit(project);
              handleProjectSwitch(project);
            }}
          >
            📝
          </p>
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
        </div>
      )}
    </li>
  );
};

export default Project;
