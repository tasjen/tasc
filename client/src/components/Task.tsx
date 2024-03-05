import { useState } from 'react';
import { TaskJson } from '../types';
import { useTaskMutation } from '../hooks';
import { useTaskFormContext } from '../context/TaskFormContext';
import { useProjectFormContext } from '../context/ProjectFormContext';

type Props = {
  task: Omit<TaskJson, 'project'>;
};

export default function Task({ task }: Props) {
  const [showDescription, setShowDescription] = useState(false);

  const { removeTask } = useTaskMutation();

  const projectForm = useProjectFormContext();
  const taskForm = useTaskFormContext();

  function toggleDescription() {
    setShowDescription(!showDescription);
  }

  function toDateFormat(date: Date): string {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

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
            projectForm.hide();
            taskForm.showEdit(task);
            taskForm.nameInput.ref.current?.focus();
          }}
        >
          📝
        </p>
        <p
          className="remove button"
          onClick={() => {
            removeTask(task.id);
            taskForm.hide();
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
}
