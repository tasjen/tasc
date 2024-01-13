import { useState, useEffect } from 'react';
import userService from './services/user';
import { ProjectJson, TaskJson, UserState } from './types';
import LogInForm from './components/LogInForm';
import Project from './components/Project';
import Togglable from './components/Togglable';
import ProjectForm from './components/ProjectForm';
import projectService from './services/project';

const App = () => {
  const [user, setUser] = useState<UserState>(null);
  const [projects, setProjects] = useState<ProjectJson[]>([]);
  const [tasks, setTasks] = useState<TaskJson[]>([]);

  const setData = async () => {
    try {
      const { username, projects: projData } = await userService.getUserData();
      setUser({ username });
      setProjects(projData);
      setTasks(projData.find((p) => p.name === 'Default')!.tasks);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMessage = (err as any).response.data.error;
      console.log(errorMessage);
    }
  };

  const clearData = () => {
    localStorage.clear();
    setUser(null);
    setProjects([]);
    setTasks([]);
  };

  const handleLogOut = () => {
    clearData();
  };

  const addProject = async (projectObject: { name: string }) => {
    try {
      const newProject = await projectService.create(projectObject);
      setProjects([...projects, newProject]);
      // projectFormRef.current.toggleVisible()
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMessage = (err as any).response.data.error;
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('loggedUser') !== null) {
      setData();
    }
  }, []);

  if (localStorage.getItem('loggedUser') !== null && user === null) {
    return <></>;
  }

  return (
    <>
      <header>
        <p>Todo List</p>
        {user === null ? (
          <LogInForm setData={setData} />
        ) : (
          <button onClick={handleLogOut}>log out</button>
        )}
      </header>
      {user !== null && (
        <main>
          <nav>
            <ul id="menu-list">
              <li id="all-task" className="menu">
                All tasks
              </li>
              <li id="today-task" className="menu">
                Today
              </li>
              <li id="this-week-task" className="menu">
                This week
              </li>
            </ul>
            <p id="project-header">Projects</p>
            <ul id="project-list">
              {projects.map((p) => (
                <Project key={p.id} project={p} />
              ))}
            </ul>
            <Togglable buttonLabel={'Add project'}>
              <ProjectForm addProject={addProject} />
            </Togglable>
          </nav>
          <div id="main-section">
            <ul id="task-list">
              {tasks.map((t) => (
                <li key={t.id}>{t.name}</li>
              ))}
            </ul>
            <Togglable buttonLabel={''}>
              <ProjectForm addProject={addProject} />
            </Togglable>
          </div>
        </main>
      )}
      <footer>
        <a href="https://github.com/tasjen/todo-list-fullstack">
          <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" />
        </a>
      </footer>
    </>
  );
};

export default App;
