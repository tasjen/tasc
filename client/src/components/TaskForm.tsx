import { useTaskFormContext } from '../context/TaskFormContext';
import { useTaskMutation } from '../hooks';

type Props = {
  projectId: string;
};

export default function TaskForm({ projectId }: Props) {
  const {
    nameInput,
    descriptionInput,
    dueDateInput,
    priorityInput,
    isVisible,
    editingTaskId,
    show,
    hide,
  } = useTaskFormContext();

  const { addTask, updateTask } = useTaskMutation();

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (editingTaskId !== null) {
      await updateTask({
        name: nameInput.value,
        description: descriptionInput.value,
        due_date: dueDateInput.value,
        priority: +priorityInput.value,
        project: projectId,
        id: editingTaskId,
      });
    } else {
      await addTask({
        name: nameInput.value,
        description: descriptionInput.value,
        due_date: new Date(dueDateInput.value),
        priority: +priorityInput.value,
        project: projectId,
      });
    }
    hide();
  }

  return (
    <div id="task-adder">
      {isVisible ? (
        <form id="task-form" onSubmit={handleSubmit}>
          <div id="name-input-container">
            <label htmlFor="name-input">Task name</label>
            <input
              id="name-input"
              placeholder="Task name"
              required
              autoFocus
              {...nameInput}
            ></input>
          </div>
          <div id="description-input-container">
            <label htmlFor="description-input">Task description</label>
            <input
              id="description-input"
              placeholder="Task description"
              {...descriptionInput}
            ></input>
          </div>
          <div id="date-input-container">
            <label htmlFor="date-input">Due date</label>
            <input id="date-input" required {...dueDateInput} />
          </div>
          <div id="priority-input-container">
            <label>Priority</label>
            <div>
              <input
                id="low"
                type="radio"
                name="priority"
                value="1"
                checked={priorityInput.value === '1'}
                onChange={priorityInput.onChange}
                required
              />
              <label htmlFor="low">Low</label>{' '}
              <input
                type="radio"
                id="medium"
                name="priority"
                value="2"
                checked={priorityInput.value === '2'}
                onChange={priorityInput.onChange}
              />
              <label htmlFor="medium">Medium</label>{' '}
              <input
                type="radio"
                id="high"
                name="priority"
                value="3"
                checked={priorityInput.value === '3'}
                onChange={priorityInput.onChange}
              />
              <label htmlFor="high">High</label>
            </div>
          </div>
          <button type="submit">
            {editingTaskId == null ? 'Add' : 'Update'}
          </button>
          <button type="button" onClick={hide}>
            Cancel
          </button>
        </form>
      ) : (
        <button onClick={show}>+ Add task</button>
      )}
    </div>
  );
}
