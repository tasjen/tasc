import { useState } from 'react';

type Props = {
  addProject: (projectObject: { name: string }) => Promise<void>;
  toggleVisible: () => void;
};

const ProjectForm = ({ addProject, toggleVisible }: Props) => {
  const [projectName, setProjectName] = useState('');

  const createProject = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await addProject({ name: projectName });
    setProjectName('');
  };
  return (
    <form id="project-form" onSubmit={createProject}>
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
      <button type="button" onClick={toggleVisible}>
        Cancel
      </button>
    </form>
  );
};

export default ProjectForm;
