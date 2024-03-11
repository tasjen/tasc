import { useUserDataQuery } from '../hooks';
import Project from './Project';

export default function ProjectList() {
  const { userData, isLoading, isError, error } = useUserDataQuery();

  if (isLoading) {
    return <p>Loading projects...</p>;
  }
  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  return userData?.projects.map(({ id, name }) => (
    <Project key={id} project={{ id, name }} />
  ));
}
