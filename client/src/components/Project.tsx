import { useProjectFormContext } from '../context/ProjectFormContext';
import { ProjectAPI } from '../types';
import { useProjectMutation } from '../hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTaskFormContext } from '../context/TaskFormContext';

type Props = {
  project: ProjectAPI;
};

export default function Project({ project }: Props) {
  const projectForm = useProjectFormContext();
  const taskForm = useTaskFormContext();
  const { removeProject } = useProjectMutation();
  const navigate = useNavigate();

  return (
    <li className="project">
      <NavLink
        className="project-name"
        to={`/projects/${project.name}`}
        onClick={() => {
          projectForm.hide();
          taskForm.hide();
        }}
      >
        {project.name}
      </NavLink>
      {project.name !== 'Default' && (
        <div>
          <p
            className="edit button"
            onClick={() => {
              navigate(`/projects/${project.name}`);
              taskForm.hide();
              projectForm.showEdit(project);
            }}
          >
            📝
          </p>
          <p
            className="remove button"
            onClick={() => {
              removeProject(project.id);
              projectForm.hide();
              taskForm.hide();
              navigate('/projects/Default');
            }}
          >
            ❌
          </p>
        </div>
      )}
    </li>
  );
}
