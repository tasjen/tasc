import { format } from 'date-fns';
import { useTaskFormContext } from '../context/TaskFormContext';
import { useTaskMutation } from '../hooks';

type Props = {
  projectId: string;
};

export default function TaskForm({ projectId }: Props) {
  const {
    nameInput,
    nameInputRef,
    descriptionInput,
    dueDateInput,
    priorityInput,
    isVisible,
    editingTask,
    show,
    hide,
  } = useTaskFormContext();

  const { addTask, updateTask } = useTaskMutation();

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (editingTask) {
      const toUpdate = JSON.parse(
        JSON.stringify({
          name:
            nameInput.value.trim() === editingTask.name
              ? undefined
              : nameInput.value,
          description:
            descriptionInput.value.trim() === editingTask.description
              ? undefined
              : descriptionInput.value,
          due_date:
            dueDateInput.value === format(editingTask.due_date, 'yyyy-MM-dd')
              ? undefined
              : dueDateInput.value,
          priority:
            +priorityInput.value === editingTask.priority
              ? undefined
              : +priorityInput.value,
        }),
      );
      if (Object.keys(toUpdate).length !== 0) {
        await updateTask({
          ...toUpdate,
          project: projectId,
          id: editingTask.id,
        });
      }
    } else {
      await addTask({
        name: nameInput.value,
        description: descriptionInput.value,
        due_date: dueDateInput.value,
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
              ref={nameInputRef}
              {...nameInput}
            ></input>
          </div>
          <div id="description-input-container">
            <label htmlFor="description-input">Task description</label>
            <textarea
              id="description-input"
              placeholder="Task description"
              {...descriptionInput}
            ></textarea>
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
            {editingTask == null ? 'Add' : 'Update'}
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
