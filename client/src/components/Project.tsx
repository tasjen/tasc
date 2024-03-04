import { useContext } from 'react';
import ProjectFormContext from '../context/ProjectFormContext';
import { ProjectState } from '../types';
import { useProjectMutation } from '../hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import TaskFormContext from '../context/TaskFormContext';

type Props = {
  project: ProjectState;
};

const Project = ({ project }: Props) => {
  const projectForm = useContext(ProjectFormContext);
  const taskForm = useContext(TaskFormContext);
  const { removeProject } = useProjectMutation();
  const navigate = useNavigate();

  return (
    <li key={project.id} className="project">
      <NavLink
        to={`/projects/${project.name}`}
        onClick={() => {
          projectForm.hide();
          taskForm.hide();
        }}
      >
        <p className="project-name">{project.name}</p>
      </NavLink>
      {project.name !== 'Default' && (
        <div>
          <p
            className="edit button"
            onClick={() => {
              navigate(`/projects/${project.name}`);
              projectForm.showEdit(project);
              projectForm.nameInputRef.current?.focus();
            }}
          >
            📝
          </p>
          <p
            className="remove button"
            onClick={() => {
              removeProject(project.id);
              navigate('/projects/Default');
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
