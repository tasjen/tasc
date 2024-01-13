import { useState } from 'react';
import { NewTask } from '../types';

type Props = {
  addTask: (taskObject: NewTask) => Promise<void>;
};

const TaskForm = ({ addTask }: Props) => {
  const [taskName, setTaskName] = useState('');

  const createTask = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setTaskName('');
  };
  return (
    <form onSubmit={createTask}>
      <input
        type="text"
        id="task-name-input"
        placeholder="Task name"
        value={taskName}
        onChange={({ target }) => {
          setTaskName(target.value);
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
