import { useState } from 'react';
import { NewTask } from '../types';

type Props = {
  addTask: (taskObject: NewTask) => Promise<void>;
  project: string;
  turnOffVisible: () => void;
};

const TaskForm = ({ addTask, project, turnOffVisible }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(1);

  const createTask = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await addTask({
      name,
      description,
      due_date: new Date(dueDate),
      priority,
      project,
    });
    turnOffVisible();
    setName('');
    setDescription('');
    setDueDate('');
    setPriority(1);
  };

  const handleCancel = () => {
    turnOffVisible();
    setName('');
    setDescription('');
    setDueDate('');
    setPriority(1);
  };

  const handlePriority = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(+event.target.value);
  };

  const handleDueDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(event.target.value);
  };

  return (
    <form id="task-form" onSubmit={createTask}>
      <div id="name-input-container">
        <label htmlFor="name-input">Task name</label>
        <input
          type="text"
          id="name-input"
          placeholder="Task name"
          value={name}
          onChange={({ target }) => setName(target.value)}
          required
        ></input>
      </div>
      <div id="description-input-container">
        <label htmlFor="description-input">Task description</label>
        <textarea
          id="description-input"
          placeholder="Task description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        ></textarea>
      </div>
      <div id="date-input-container">
        <label htmlFor="date-input">Due date</label>
        <input
          type="date"
          id="date-input"
          value={dueDate}
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
            checked={priority === 1}
            onChange={handlePriority}
            required
          />
          <label htmlFor="low">Low</label>{' '}
          <input
            type="radio"
            id="medium"
            name="priority"
            value="2"
            checked={priority === 2}
            onChange={handlePriority}
          />
          <label htmlFor="medium">Medium</label>{' '}
          <input
            type="radio"
            id="high"
            name="priority"
            value="3"
            checked={priority === 3}
            onChange={handlePriority}
          />
          <label htmlFor="high">High</label>
        </div>
      </div>
      <button type="submit">Add</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default TaskForm;
