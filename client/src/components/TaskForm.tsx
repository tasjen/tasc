import { useContext } from 'react';
import TaskFormContext from '../context/TaskFormContext';
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
    updatingTaskId,
    show,
    hide,
    setNameInput,
    setDescriptionInput,
    setDueDateInput,
    setPriorityInput,
    nameInputRef,
  } = useContext(TaskFormContext);

  const { addTask, updateTask } = useTaskMutation();

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (updatingTaskId !== null) {
      await updateTask({
        name: nameInput,
        description: descriptionInput,
        due_date: dueDateInput,
        priority: priorityInput,
        project: projectId,
        id: updatingTaskId,
      });
    } else {
      await addTask({
        name: nameInput,
        description: descriptionInput,
        due_date: new Date(dueDateInput),
        priority: priorityInput,
        project: projectId,
      });
    }
    hide();
  }

  function handlePriority(event: React.ChangeEvent<HTMLInputElement>) {
    setPriorityInput(+event.target.value as 1 | 2 | 3);
  }

  function handleDueDate(event: React.ChangeEvent<HTMLInputElement>) {
    setDueDateInput(event.target.value);
  }

  return (
    <div id="task-adder">
      {isVisible ? (
        <form id="task-form" onSubmit={handleSubmit}>
          <div id="name-input-container">
            <label htmlFor="name-input">Task name</label>
            <input
              type="text"
              id="name-input"
              placeholder="Task name"
              value={nameInput}
              onChange={({ target }) => setNameInput(target.value)}
              required
              autoFocus
              ref={nameInputRef}
            ></input>
          </div>
          <div id="description-input-container">
            <label htmlFor="description-input">Task description</label>
            <textarea
              id="description-input"
              placeholder="Task description"
              value={descriptionInput}
              onChange={({ target }) => setDescriptionInput(target.value)}
            ></textarea>
          </div>
          <div id="date-input-container">
            <label htmlFor="date-input">Due date</label>
            <input
              type="date"
              id="date-input"
              value={dueDateInput}
              onChange={handleDueDate}
              required
            />
          </div>
          <div id="priority-input-container">
            <label>Priority</label>
            <div>
              <input
                type="radio"
                id="low"
                name="priority"
                value="1"
                checked={priorityInput === 1}
                onChange={handlePriority}
                required
              />
              <label htmlFor="low">Low</label>{' '}
              <input
                type="radio"
                id="medium"
                name="priority"
                value="2"
                checked={priorityInput === 2}
                onChange={handlePriority}
              />
              <label htmlFor="medium">Medium</label>{' '}
              <input
                type="radio"
                id="high"
                name="priority"
                value="3"
                checked={priorityInput === 3}
                onChange={handlePriority}
              />
              <label htmlFor="high">High</label>
            </div>
          </div>
          <button type="submit">
            {updatingTaskId == null ? 'Add' : 'Update'}
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
