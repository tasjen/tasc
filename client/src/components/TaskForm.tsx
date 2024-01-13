import { useState } from 'react';
import { NewTask } from '../types';

type Props = {
  addTask: (taskObject: NewTask) => Promise<void>;
  project: string;
};

const TaskForm = ({ addTask, project }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [due_date, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState(1);

  const createTask = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await addTask({
      name,
      description,
      due_date,
      priority,
      project,
    });
    setName('');
    setDescription('');
    setDueDate(new Date());
    setPriority(1);
  };

  const handlePriority = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(+event.target.value);
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
      <div id="priority-input-container">
        <label>Priority</label>
        <div>
          <input
            type="radio"
            name="priority"
            id="low"
            value={1}
            onChange={handlePriority}
          />
          <label htmlFor="low">Low</label>{' '}
          <input
            type="radio"
            name="priority"
            id="medium"
            value={2}
            onChange={handlePriority}
          />
          <label htmlFor="medium">Medium</label>{' '}
          <input
            type="radio"
            name="priority"
            id="high"
            value={3}
            onChange={handlePriority}
          />
          <label htmlFor="high">High</label>
        </div>
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
