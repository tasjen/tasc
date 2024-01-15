import { useState } from 'react';
import { TaskJson } from '../types';

type Props = {
  task: Omit<TaskJson, 'project'>;
  removeTask: (taskId: string) => void;
};

const Task = ({ task, removeTask }: Props) => {
  const [seeDescription, setSeeDescription] = useState(false);

  const toggleDescription = () => {
    setSeeDescription(!seeDescription);
  };

  const toDateFormat = (date: Date): string => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
  return (
    <li className="task">
      <div className="task-detail">
        <p className="task-name">{task.name}</p>
        <p className="priority">{'★'.repeat(task.priority)}</p>
        <p className="description button" onClick={toggleDescription}>
          {'description'}
        </p>
        <p className="due-date">{toDateFormat(new Date(task.due_date))}</p>
        <p className="edit button">📝</p>
        <p className="remove button" onClick={() => removeTask(task.id)}>
          ❌
        </p>
      </div>
      {seeDescription && <p className="task-description">{task.description}</p>}
    </li>
  );
};

export default Task;
