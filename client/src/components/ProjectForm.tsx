import { useContext } from 'react';
import ProjectFormContext from '../context/ProjectFormContext';

type Props = {
  addProject: (projectObject: { name: string }) => Promise<void>;
  updateProject: (projectObject: { name: string; id: string }) => Promise<void>;
};

const ProjectForm = ({ addProject, updateProject }: Props) => {
  const { nameInput, isVisible, updatingProjectId, show, hide, setNameInput } =
    useContext(ProjectFormContext);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (updatingProjectId !== null) {
      await updateProject({ name: nameInput, id: updatingProjectId });
    } else {
      await addProject({ name: nameInput });
    }
    setNameInput('');
    hide();
  };

  return (
    <div>
      {isVisible ? (
        <form id="project-form" onSubmit={handleSubmit}>
          <input
            id="project-name-input"
            data-test="project-name-input"
            placeholder="Project name"
            required
            type="text"
            value={nameInput}
            autoFocus
            onChange={({ target }) => setNameInput(target.value)}
          />
          <button data-test="add-project-button" type="submit">
            {updatingProjectId !== null ? 'Update' : 'Add'}
          </button>
          <button
            type="button"
            onClick={() => {
              setNameInput('');
              hide();
            }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <button onClick={show}>+ Add project</button>
      )}
    </div>
  );
};

export default ProjectForm;
