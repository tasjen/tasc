import { Outlet, redirect } from 'react-router-dom';
import { useLocalStorage } from '../hooks';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';

export const loader = async () => {
  const user = useLocalStorage('loggedUser').getItem();

  if (!user) return redirect('/login');

  return null;
};

const Index = () => {
  return (
    <main>
      <nav>
        <p id="project-header">Projects</p>
        <ProjectList />
        <ProjectForm />
      </nav>
      <div id="main-section">
        <Outlet />
      </div>
    </main>
  );
};

export default Index;
