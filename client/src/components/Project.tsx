import { ProjectState } from '../types';

type Props = {
  project: ProjectState;
  handleProjectSwitch: (project: ProjectState) => void;
  workingProject: ProjectState;
};

const Project = ({ project, handleProjectSwitch, workingProject }: Props) => {
  return (
    <li
      key={project.id}
      className={`project ${project === workingProject ? 'on-page' : ''}`}
      onClick={() => handleProjectSwitch(project)}
    >
      <p className="project-name">{project.name}</p>
      <div>
        <p className="edit button">📝</p>
        {project.name !== 'Default' && <p className="remove button">❌</p>}
      </div>
    </li>
  );
};

export default Project;
