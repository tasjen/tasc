import { ProjectState } from '../types';

type Props = {
  project: ProjectState;
  showingProject: ProjectState;
  removeProject: (projectId: string) => void;
  setProjectFormEdit: (projectObject: { name: string; id: string }) => void;
};

const Project = ({
  project,
  showingProject,
  removeProject,
  setProjectFormEdit,
}: Props) => {
  return (
    <li
      key={project.id}
      className={`project ${project.id === showingProject.id ? 'on-page' : ''}`}
      onClick={() => {}}
    >
      <p className="project-name">{project.name}</p>
      {project.name !== 'Default' && (
        <div>
          <p
            className="edit button"
            onClick={(event) => {
              event.stopPropagation();
              setProjectFormEdit(project);
            }}
          >
            📝
          </p>
          <p
            className="remove button"
            onClick={(event) => {
              event.stopPropagation();
              removeProject(project.id);
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
