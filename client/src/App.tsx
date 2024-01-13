import { useState, useEffect, useRef } from 'react';
import userService from './services/user';
import {
  NewTask,
  ProjectState,
  UserState,
  initialProjectState,
  initialUserState,
} from './types';
import LogInForm from './components/LogInForm';
import Project from './components/Project';
import Togglable from './components/Togglable';
import ProjectForm from './components/ProjectForm';
import projectService from './services/project';
import TaskForm from './components/TaskForm';
import taskService from './services/task';
import { isAxiosError } from 'axios';

const App = () => {
  const [userData, setUserData] = useState<UserState>(initialUserState);
  const [workingProject, setWorkingProject] =
    useState<ProjectState>(initialProjectState);

  const projectFormRef = useRef();
  const taskFormRef = useRef();

  const setData = async () => {
    try {
      const userData = await userService.getUserData();
      setUserData(userData);
      setWorkingProject(userData.projects.find((p) => p.name === 'Default')!);
    } catch (err: unknown) {
      if (isAxiosError(err) && err.response) {
        console.log(err.response.data.error);
      } else if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

  const clearData = () => {
    localStorage.clear();
    setUserData(initialUserState);
    setWorkingProject(initialProjectState);
  };

  const handleLogOut = () => {
    clearData();
  };

  const addProject = async (projectObject: { name: string }) => {
    try {
      const newProject = await projectService.create(projectObject);
      setUserData({
        ...userData,
        projects: [...userData.projects, newProject],
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (projectFormRef as any).current.toggleVisible();
    } catch (err: unknown) {
      if (isAxiosError(err) && err.response) {
        console.log(err.response.data.error);
      } else if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

  const addTask = async (taskObject: NewTask) => {
    try {
      const newTask = await taskService.create(taskObject);
      setWorkingProject({
        ...workingProject,
        tasks: [...workingProject.tasks, newTask],
      });
      setUserData({
        ...userData,
        projects: userData.projects.map((p) =>
          p !== workingProject ? p : { ...p, tasks: [...p.tasks, newTask] }
        ),
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (taskFormRef as any).current.toggleVisible();
    } catch (err: unknown) {
      if (isAxiosError(err) && err.response) {
        console.log(err.response.data.error);
      } else if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('loggedUser') !== null) {
      setData();
    }
  }, []);

  if (
    localStorage.getItem('loggedUser') !== null &&
    userData === initialUserState
  ) {
    return <></>;
  }

  return userData === initialUserState ? (
    <LogInForm setData={setData} />
  ) : (
    <>
      <header>
        <p>Todo List</p>
        <button onClick={handleLogOut}>log out</button>
      </header>
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
            {userData.projects.map((p) => (
              <Project key={p.id} project={p} />
            ))}
          </ul>
          <Togglable buttonLabel={'Add project'} ref={projectFormRef}>
            <ProjectForm addProject={addProject} />
          </Togglable>
        </nav>
        <div id="main-section">
          <p id="tab-name">{workingProject.name}</p>
          <ul id="task-list">
            {workingProject!.tasks.map((t) => (
              <li className="task" key={t.id}>
                {t.name}
              </li>
            ))}
          </ul>
          <Togglable buttonLabel={'Add task'} ref={taskFormRef}>
            <TaskForm project={workingProject.id} addTask={addTask} />
          </Togglable>
        </div>
      </main>
      <footer>
        <a href="https://github.com/tasjen/todo-list-fullstack">
          <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" />
        </a>
      </footer>
    </>
  );
};

export default App;