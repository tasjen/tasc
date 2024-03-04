import { useParams } from 'react-router-dom';
import { useUserDataQuery } from '../hooks';
import Task from '../components/Task';
import TaskForm from '../components/TaskForm';

const ProjectPage = () => {
  const { projectName } = useParams();
  const { userData } = useUserDataQuery();

  const project = userData?.projects.find((p) => p.name === projectName);

  if (!project) {
    return <></>;
  }

  return (
    <>
      <p id="tab-name">{project?.name}</p>
      <ul id="task-list">
        {project?.tasks.length === 0 ? (
          <p>No tasks here.</p>
        ) : (
          project?.tasks
            .sort(
              (a, b) =>
                new Date(a.due_date).getTime() - new Date(b.due_date).getTime(),
            )
            .map((t) => <Task key={t.id} task={t} />)
        )}
      </ul>
      <TaskForm projectId={project.id} />
    </>
  );
};

export default ProjectPage;
