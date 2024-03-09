import { useProjectMutation } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { useTaskFormContext } from '../context/TaskFormContext';
import { useProjectFormContext } from '../context/ProjectFormContext';

export default function ProjectForm() {
  const { nameInput, nameInputRef, isVisible, editingProject, show, hide } =
    useProjectFormContext();

  const taskForm = useTaskFormContext();

  const { addProject, updateProject } = useProjectMutation();
  const navigate = useNavigate();

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (editingProject) {
      if (nameInput.value !== editingProject.name) {
        await updateProject({ name: nameInput.value, id: editingProject.id });
      }
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
            ref={nameInputRef}
            {...nameInput}
          />
          <button data-test="add-project-button" type="submit">
            {editingProject !== null ? 'Update' : 'Add'}
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
