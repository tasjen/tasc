import { useProjectMutation } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { useTaskFormContext } from '../context/TaskFormContext';
import { useProjectFormContext } from '../context/ProjectFormContext';

export default function ProjectForm() {
  const { nameInput, isVisible, editingProjectId, show, hide } =
    useProjectFormContext();

  const taskForm = useTaskFormContext();

  const { addProject, updateProject } = useProjectMutation();
  const navigate = useNavigate();

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (editingProjectId !== null) {
      await updateProject({ name: nameInput.value, id: editingProjectId });
    } else {
      await addProject({ name: nameInput.value });
    }
    hide(); //hide project form
    taskForm.hide();
    navigate(`/projects/${nameInput.value}`);
  }

  return (
    <div id="project-adder">
      {isVisible ? (
        <form id="project-form" onSubmit={handleSubmit}>
          <input
            id="project-name-input"
            data-test="project-name-input"
            placeholder="Project name"
            required
            autoFocus
            {...nameInput}
          />
          <button data-test="add-project-button" type="submit">
            {editingProjectId !== null ? 'Update' : 'Add'}
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
}
