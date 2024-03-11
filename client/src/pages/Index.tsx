import { Outlet, redirect } from 'react-router-dom';
import { useLocalStorage } from '../hooks';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';

export async function loader() {
  const user = useLocalStorage('loggedUser').getItem();

  if (!user) return redirect('/login');

  return null;
}

export default function Index() {
  return (
    <main>
      <nav>
        <p id="project-header">Projects</p>
        <ul id="project-list" data-test="project-list">
          <ProjectList />
        </ul>
        <ProjectForm />
      </nav>
      <div id="main-section">
        <Outlet />
      </div>
    </main>
  );
}
