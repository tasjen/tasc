import { ProjectState } from '../types';

type Props = {
  project: ProjectState;
};

const Project = ({ project }: Props) => {
  return (
    <li key={project.id} className="project on-page">
      <p className="project-name">{project.name}</p>
      <div>
        <p className="edit button">📝</p>
        {project.name !== 'Default' && <p className="remove button">❌</p>}
      </div>
    </li>
  );
};

export default Project;
