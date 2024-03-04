import { useContext } from 'react';
import ProjectFormContext from '../context/ProjectFormContext';
import { useProjectMutation } from '../hooks';
import { useNavigate } from 'react-router-dom';

const ProjectForm = () => {
  const {
    nameInput,
    isVisible,
    updatingProjectId,
    show,
    hide,
    setNameInput,
    nameInputRef,
  } = useContext(ProjectFormContext);

  const { addProject, updateProject } = useProjectMutation();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (updatingProjectId !== null) {
      await updateProject({ name: nameInput, id: updatingProjectId });
    } else {
      await addProject({ name: nameInput });
    }
    navigate(`/projects/${nameInput}`);
    hide();
  };

  return (
    <div id="project-adder">
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
            ref={nameInputRef}
          />
          <button data-test="add-project-button" type="submit">
            {updatingProjectId !== null ? 'Update' : 'Add'}
          </button>
          <button type="button" onClick={hide}>
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
