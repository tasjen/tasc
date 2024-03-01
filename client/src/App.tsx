import { useState, useEffect, useContext } from 'react';
import userService from './services/user';
import { NewTask, TaskJson, initProjectState, initUserState } from './types';
import LogInForm from './components/LogInForm';
import Project from './components/Project';
import ProjectForm from './components/ProjectForm';
import projectService from './services/project';
import TaskForm from './components/TaskForm';
import taskService from './services/task';
import Task from './components/Task';
import { handleError } from './services/util';
import RegisterForm from './components/RegisterForm';
import Notification from './components/Notification';
import Footer from './components/Footer';
import ProjectFormContext from './context/ProjectFormContext';
import TaskFormContext from './context/TaskFormContext';
// import { isSameDay, isSameWeek } from 'date-fns';

const App = () => {
  const [userData, setUserData] = useState(initUserState);
  const [showingProject, setShowingProject] = useState(initProjectState);
  const [noti, setNoti] = useState({ text: '', error: false });

  const projectForm = useContext(ProjectFormContext);
  const taskForm = useContext(TaskFormContext);

  const fetchUserData = async () => {
    try {
      const userData = await userService.getUserData();
      setUserData(userData);
      setShowingProject({ ...userData.projects[0] });
    } catch (err: unknown) {
      handleError(err, setNoti);
    }
    setTimeout(() => {
      setNoti({ text: '', error: false });
    }, 5000);
  };

  const clearUserData = () => {
    localStorage.clear();
    setUserData(initUserState);
    setShowingProject(initProjectState);
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
      setShowingProject(newProject);
    } catch (err: unknown) {
      handleError(err, setNoti);
    }
    setTimeout(() => {
      setNoti({ text: '', error: false });
    }, 5000);
  };

  const removeProject = (projectId: string) => {
    try {
      projectService.remove(projectId);
      setUserData({
        ...userData,
        projects: userData.projects.filter((e) => e.id !== projectId),
      });
      setShowingProject(userData.projects.find((p) => p.name === 'Default')!);
    } catch (err: unknown) {
      handleError(err, setNoti);
    }
    setTimeout(() => {
      setNoti({ text: '', error: false });
    }, 5000);
  };

  const updateProject = async (projectObject: { name: string; id: string }) => {
    try {
      const updatedProject = await projectService.update(projectObject);

      const updatedshowingProject = {
        ...showingProject,
        name: updatedProject.name,
      };

      setUserData({
        ...userData,
        projects: userData.projects.map((p) =>
          p.id !== showingProject.id ? p : updatedshowingProject,
        ),
      });
      setShowingProject(updatedshowingProject);
    } catch (err: unknown) {
      handleError(err, setNoti);
    }
    setTimeout(() => {
      setNoti({ text: '', error: false });
    }, 5000);
  };

  const addTask = async (taskObject: NewTask) => {
    try {
      const newTask = await taskService.create(taskObject);
      setShowingProject({
        ...showingProject,
        tasks: [...showingProject.tasks, newTask],
      });
      setUserData({
        ...userData,
        projects: userData.projects.map((p) =>
          p.id !== showingProject.id
            ? p
            : { ...p, tasks: [...p.tasks, newTask] },
        ),
      });
    } catch (err: unknown) {
      handleError(err, setNoti);
    }
    setTimeout(() => {
      setNoti({ text: '', error: false });
    }, 5000);
  };

  const removeTask = (taskId: string) => {
    try {
      taskService.remove(taskId);

      const updatedshowingProject = {
        ...showingProject,
        tasks: showingProject.tasks.filter((t) => t.id !== taskId),
      };

      setUserData({
        ...userData,
        projects: userData.projects.map((p) =>
          p.id !== showingProject.id ? p : updatedshowingProject,
        ),
      });
      setShowingProject(updatedshowingProject);
    } catch (err: unknown) {
      handleError(err, setNoti);
    }
    setTimeout(() => {
      setNoti({ text: '', error: false });
    }, 5000);
  };

  const updateTask = async (taskObject: TaskJson) => {
    try {
      const updatedTask = await taskService.update(taskObject);

      const updatedshowingProject = {
        ...showingProject,
        tasks: showingProject.tasks.map((t) =>
          t.id !== updatedTask.id ? t : updatedTask,
        ),
      };

      setUserData({
        ...userData,
        projects: userData.projects.map((p) =>
          p.id !== showingProject.id ? p : updatedshowingProject,
        ),
      });
      setShowingProject(updatedshowingProject);
    } catch (err: unknown) {
      handleError(err, setNoti);
    }
    setTimeout(() => {
      setNoti({ text: '', error: false });
    }, 5000);
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

  return (
    <>
      <header>
        <p id="logo">Todo List</p>
        <Notification noti={noti} />
        {userData !== initUserState && (
          <>
            <b id="username">{userData.username ?? ''}</b>
            <button id="logout-button" onClick={handleLogOut}>
              log out
            </button>
          </>
        )}
      </header>
      <main>
        {userData === initUserState ? (
          <div>
            <LogInForm fetchUserData={fetchUserData} setNoti={setNoti} />
            <RegisterForm setNoti={setNoti} />
          </div>
        ) : (
          <>
            <nav>
              <p id="project-header">Projects</p>
              <ul id="project-list" data-test="project-list">
                {userData.projects.map((p) => (
                  <Project
                    key={p.id}
                    project={p}
                    showingProject={showingProject}
                    removeProject={removeProject}
                    setProjectFormEdit={() => {
                      projectForm.setNameInput(p.name);
                      projectForm.setUpdatingProjectId(p.id);
                      projectForm.show();
                    }}
                  />
                ))}
              </ul>
              <div id="project-adder">
                <ProjectForm
                  addProject={addProject}
                  updateProject={updateProject}
                />
              </div>
            </nav>
            <div id="main-section">
              <p id="tab-name">{showingProject.name}</p>
              <ul id="task-list">
                {showingProject.tasks.length === 0 ? (
                  <p>No tasks here.</p>
                ) : (
                  showingProject.tasks
                    .sort(
                      (a, b) =>
                        new Date(a.due_date).getTime() -
                        new Date(b.due_date).getTime(),
                    )
                    .map((t) => (
                      <Task
                        key={t.id}
                        task={t}
                        removeTask={removeTask}
                        setTaskFormEdit={() => taskForm.setUpdatingTask(t)}
                      />
                    ))
                )}
              </ul>
              <div id="task-adder">
                <TaskForm
                  addTask={addTask}
                  updateTask={updateTask}
                  project={showingProject.id}
                />
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default App;
