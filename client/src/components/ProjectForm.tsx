import { useState } from 'react';

type Props = {
  addProject: (projectObject: { name: string }) => Promise<void>;
};

const ProjectForm = ({ addProject }: Props) => {
  const [projectName, setProjectName] = useState('');

  const createProject = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await addProject({ name: projectName });
    setProjectName('');
  };
  return (
    <form onSubmit={createProject}>
      <input
        type="text"
        id="project-name-input"
        placeholder="Project name"
        value={projectName}
        onChange={({ target }) => {
          setProjectName(target.value);
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default ProjectForm;
