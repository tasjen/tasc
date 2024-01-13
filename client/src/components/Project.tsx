import { ProjectJson } from '../types';

type Props = {
  project: ProjectJson;
};

const Project = ({ project }: Props) => {
  return (
    <li key={project.id} className="project on-page">
      <p className="project-name">{project.name}</p>
      <div>
        <p className="edit button">📝</p>
      </div>
    </li>
  );
};

export default Project;
