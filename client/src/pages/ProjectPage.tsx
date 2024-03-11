import { useParams } from 'react-router-dom';
import { useUserDataQuery } from '../hooks';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function ProjectPage() {
  const { projectName } = useParams();
  const { userData } = useUserDataQuery();

  const project = userData?.projects.find((p) => p.name === projectName);

  if (!project) {
    return <></>;
  }

  return (
    <>
      <p id="tab-name">{project.name}</p>
      <TaskList tasks={project.tasks} />
      <TaskForm projectId={project.id} />
    </>
  );
}
