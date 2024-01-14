import { useState, useEffect, useRef } from 'react';
import userService from './services/user';
import {
  NewTask,
  initProjectState,
  initToggleRef,
  initUserState,
} from './types';
import LogInForm from './components/LogInForm';
import Project from './components/Project';
import Togglable from './components/Togglable';
import ProjectForm from './components/ProjectForm';
import projectService from './services/project';
import TaskForm from './components/TaskForm';
import taskService from './services/task';
import { isAxiosError } from 'axios';
import Task from './components/Task';

const App = () => {
  const [userData, setUserData] = useState(initUserState);
  const [workingProject, setWorkingProject] = useState(initProjectState);

  const projectFormRef = useRef(initToggleRef);
  const taskFormRef = useRef(initToggleRef);

  const fetchUserData = async () => {
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

  const clearUserData = () => {
    localStorage.clear();
    setUserData(initUserState);
    setWorkingProject(initProjectState);
  };

  const handleLogOut = () => {
    clearUserData();
  };

  const addProject = async (projectObject: { name: string }) => {
    try {
      const newProject = await projectService.create(projectObject);
      setUserData({
        ...userData,
        projects: [...userData.projects, newProject],
      });
      projectFormRef.current.toggleVisible();
      setWorkingProject(newProject);
    } catch (err: unknown) {
      if (isAxiosError(err) && err.response) {
        console.log(err.response.data.error);
      } else if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

  const removeProject = async (projectId: string) => {
    try {
      await projectService.remove(projectId);
      setUserData({
        ...userData,
        projects: userData.projects.filter((e) => e.id !== projectId),
      });
      setWorkingProject(userData.projects.find(p => p.name === 'Default')!);
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
          p.id !== workingProject.id
            ? p
            : { ...p, tasks: [...p.tasks, newTask] }
        ),
      });
      taskFormRef.current.toggleVisible();
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
      fetchUserData();
    }
  }, []);

  if (
    localStorage.getItem('loggedUser') !== null &&
    userData === initUserState
  ) {
    return <></>;
  }

  return userData === initUserState ? (
    <LogInForm fetchUserData={fetchUserData} />
  ) : (
    <>
      <header>
        <p>Todo List</p>
        <button id="logout-button" onClick={handleLogOut}>log out</button>
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
              <Project
                key={p.id}
                project={p}
                handleProjectSwitch={setWorkingProject}
                workingProject={workingProject}
                removeProject={removeProject}
              />
            ))}
          </ul>
          <div id="project-adder">
            <Togglable buttonLabel={'+ Add project'} ref={projectFormRef}>
              <ProjectForm
                addProject={addProject}
                toggleVisible={() => {}}
              />
            </Togglable>
          </div>
        </nav>
        <div id="main-section">
          <p id="tab-name">{workingProject.name}</p>
          <ul id="task-list">
            {workingProject!.tasks.map((t) => (
              <Task key={t.id} task={t} />
            ))}
          </ul>
          <div id="task-adder">
            <Togglable buttonLabel={'+ Add task'} ref={taskFormRef}>
              <TaskForm
                project={workingProject.id}
                addTask={addTask}
                toggleVisible={() => {}}
              />
            </Togglable>
          </div>
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
