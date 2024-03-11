import { TTask } from '../types';
import Task from './Task';

type Props = {
  tasks: TTask[];
};

export default function TaskList({ tasks }: Props) {
  return (
    <ul id="task-list">
      {tasks.length === 0 ? (
        <p>No tasks here.</p>
      ) : (
        tasks
          .sort(
            (a, b) =>
              new Date(a.due_date).getTime() - new Date(b.due_date).getTime(),
          )
          .map((t) => <Task key={t.id} task={t} />)
      )}
    </ul>
  );
}
