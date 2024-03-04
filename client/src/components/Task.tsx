import { useContext, useState } from 'react';
import { TaskJson } from '../types';
import { useTaskMutation } from '../hooks';
import TaskFormContext from '../context/TaskFormContext';

type Props = {
  task: Omit<TaskJson, 'project'>;
};

const Task = ({ task }: Props) => {
  const [showDescription, setShowDescription] = useState(false);

  const { removeTask } = useTaskMutation();
  const taskForm = useContext(TaskFormContext);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
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
        <p
          className="edit button"
          onClick={() => {
            taskForm.showEdit(task);
            taskForm.nameInputRef.current?.focus();
          }}
        >
          📝
        </p>
        <p
          className="remove button"
          onClick={() => {
            removeTask(task.id);
          }}
        >
          ❌
        </p>
      </div>
      {showDescription && (
        <p className="task-description">{task.description}</p>
      )}
    </li>
  );
};

export default Task;
