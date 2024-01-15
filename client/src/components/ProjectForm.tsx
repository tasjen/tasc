import { useState } from 'react';

type Props = {
  addProject: (projectObject: { name: string }) => Promise<void>;
  hideProjectForm: () => void;
};

const ProjectForm = ({ addProject, hideProjectForm }: Props) => {
  const [projectName, setProjectName] = useState('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await addProject({ name: projectName });
    hideProjectForm();
    setProjectName('');
  };

  const handleCancel = () => {
    hideProjectForm();
    setProjectName('');
  };

  return (
    <form id="project-form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="project-name-input"
        placeholder="Project name"
        value={projectName}
        onChange={({ target }) => {
          setProjectName(target.value);
        }}
        required
      />
      <button type="submit">Add</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default ProjectForm;
