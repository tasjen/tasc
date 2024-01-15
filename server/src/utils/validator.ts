import User from '../models/user_model';
import Project from '../models/project_model';
import Task from '../models/task_model';
import { NewUser, NewProject, NewTask, Priority } from './types';
import { JwtFormat } from './types';

export class ValError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

export const isJwtFormat = (param: unknown): param is JwtFormat => {
  return (
    param !== undefined &&
    param !== null &&
    typeof param === 'object' &&
    'username' in param &&
    'id' in param &&
    isString(param.username) &&
    isString(param.id)
  );
};

const parseUsername = (username: unknown): string => {
  if (!isString(username) || username.length <= 5) {
    throw new ValError('Invalid username');
  }
  return username;
};

const parsePassword = (password: unknown): string => {
  if (!isString(password) || password.length <= 5) {
    throw new ValError('Invalid password');
  }
  return password;
};

export const parseUser = (object: unknown): NewUser => {
  if (
    !object ||
    typeof object !== 'object' ||
    !('username' in object && 'password' in object)
  ) {
    throw new ValError('Incorrect or missing data');
  }
  const newUser: NewUser = {
    username: parseUsername(object.username),
    password: parsePassword(object.password),
    projects: [],
  };
  return newUser;
};

const isUniqueProjectName = async (
  projectName: string,
  userId: string
): Promise<boolean> => {
  let projectsOfUser = await User.findById(userId).populate('projects');
  if (projectsOfUser === null) {
    throw new Error('user not found');
  }

  projectsOfUser = projectsOfUser.toJSON();
  return projectsOfUser.projects.every((project) => {
    if (!('name' in project)) {
      throw new Error('name property not found in project document');
    }
    return project.name !== projectName;
  });
};

const parseProjectName = async (
  projectName: unknown,
  userId: string
): Promise<string> => {
  if (!isString(projectName) || projectName.length < 1) {
    throw new ValError('Project name must be at least 1 character');
  }
  if (!(await isUniqueProjectName(projectName, userId))) {
    throw new ValError('project name must be unique');
  }
  return projectName;
};

export const parseProject = async (
  object: unknown,
  userId: string
): Promise<NewProject> => {
  if (!object || typeof object !== 'object' || !('name' in object)) {
    throw new ValError('Incorrect or missing data');
  }
  const newProject: NewProject = {
    name: await parseProjectName(object.name, userId),
    user: userId,
    tasks: [],
  };
  return newProject;
};

export const parseProjectForUpdate = async (
  object: unknown,
  userId: string
): Promise<Omit<NewProject, 'tasks' | 'user'> & { id: string }> => {
  if (
    !object ||
    typeof object !== 'object' ||
    !('name' in object) ||
    !('id' in object) ||
    !isString(object.id)
  ) {
    throw new ValError('Incorrect or missing data');
  }
  const newProject = {
    name: await parseProjectNameForUpdate(object.name, userId, object.id),
    id: object.id,
  };
  return newProject;
};

const parseProjectNameForUpdate = async (
  projectName: unknown,
  userId: string,
  projectId: string
): Promise<string> => {
  if (!isString(projectName) || projectName.length < 1) {
    throw new ValError('Project name must be at least 1 character');
  }
  if (!(await isUniqueProjectNameForUpdate(projectName, userId, projectId))) {
    throw new ValError('project name must be unique');
  }
  return projectName;
};

const isUniqueProjectNameForUpdate = async (
  projectName: string,
  userId: string,
  projectId: string
): Promise<boolean> => {
  let projectsOfUser = await User.findById(userId).populate('projects');
  const currentProject = await Project.findById(projectId);
  if (projectsOfUser === null) {
    throw new Error('user not found');
  }
  if (currentProject === null) {
    throw new ValError('isUniqueProjectNameForUpdate error: project not found');
  }

  projectsOfUser = projectsOfUser.toJSON();
  return projectsOfUser.projects
    .filter((project) => {
      if (!('name' in project)) {
        throw new ValError(
          'isUniqueProjectName error: `name` is not in project document'
        );
      }
      return project.name !== currentProject.name;
    })
    .every((project) => {
      if (!('name' in project)) {
        throw new Error('name property not found in project document');
      }
      return project.name !== projectName;
    });
};

export const parseTask = async (
  object: unknown,
  userId: string
): Promise<NewTask> => {
  if (
    !object ||
    typeof object !== 'object' ||
    !(
      'name' in object &&
      'description' in object &&
      'due_date' in object &&
      'priority' in object &&
      'project' in object
    ) ||
    !isString(object.project)
  ) {
    throw new ValError('Incorrect or missing data');
  }
  const newTask: NewTask = {
    name: await parseTaskName(object.name, object.project),
    description: parseDescription(object.description),
    due_date: parseDueDate(object.due_date),
    priority: parsePriority(object.priority),
    project: await parseProjectId(object.project, userId),
  };
  return newTask;
};

export const parseTaskForUpdate = async (
  object: unknown,
  userId: string
): Promise<Omit<NewTask, 'project'> & { id: string }> => {
  if (
    !object ||
    typeof object !== 'object' ||
    !(
      'name' in object &&
      'description' in object &&
      'due_date' in object &&
      'priority' in object &&
      'project' in object &&
      'id' in object
    ) ||
    !isString(object.project) ||
    !isString(object.id) ||
    !(await isYourProject(object.project, userId))
  ) {
    throw new ValError('Incorrect or missing data');
  }
  const parsedTask = {
    name: await parseTaskNameForUpdate(object.name, object.project, object.id),
    description: parseDescription(object.description),
    due_date: parseDueDate(object.due_date),
    priority: parsePriority(object.priority),
    id: object.id,
  };
  return parsedTask;
};

const isNumber = (param: unknown): param is number => {
  return typeof param === 'number' || param instanceof Number;
};

const isPriority = (param: number): param is Priority => {
  return Object.values(Priority).includes(param);
};

const parsePriority = (priority: unknown): Priority => {
  if (!isNumber(priority) || !isPriority(priority)) {
    throw new ValError(`Incorrect or missing Priority: ${priority}`);
  }
  return priority;
};

const parseDueDate = (dueDate: unknown): Date => {
  if (!isString(dueDate) || !isDate(dueDate)) {
    throw new ValError(`Incorrect or missing due date: ${dueDate}`);
  }
  return new Date(dueDate);
};

const isDate = (param: string): boolean => {
  return new Date(param).toString() !== 'Invalid Date';
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new ValError('Incorrect or missing Description');
  }
  return description;
};

const parseTaskName = async (
  name: unknown,
  projectId: string
): Promise<string> => {
  if (!isString(name) || name.length < 1) {
    throw new ValError('Incorrect or missing name');
  }

  if (!(await isUniqueTaskName(name, projectId))) {
    throw new ValError('task name must be unique');
  }
  return name;
};

const parseTaskNameForUpdate = async (
  name: unknown,
  projectId: string,
  taskId: string
): Promise<string> => {
  if (!isString(name) || name.length < 1) {
    throw new ValError('Incorrect or missing name');
  }
  if (!(await isUniqueTaskNameForUpdate(name, projectId, taskId))) {
    throw new ValError('task name must be unique');
  }
  return name;
};

const parseProjectId = async (
  projectId: string,
  userId: string
): Promise<string> => {
  if (!(await isYourProject(projectId, userId))) {
    throw new ValError("can't add task to other usersnot your project");
  }

  return projectId;
};

const isYourProject = async (
  projectId: string,
  userId: string
): Promise<boolean> => {
  const userInfo = await User.findById(userId).populate('projects');
  if (userInfo === null) {
    throw new ValError('isYourProject error: `userInfo` is null');
  }

  return !!userInfo.toJSON().projects.find((project) => {
    if (!('id' in project)) {
      throw new ValError('isYourProject error: `id` is not in project');
    }
    return project.id === projectId;
  });
};

const isUniqueTaskName = async (
  taskName: string,
  projectId: string
): Promise<boolean> => {
  const tasksOfProject = await Project.findById(projectId).populate('tasks');
  if (tasksOfProject === null) {
    throw new ValError('isUniqueTaskName error: project not found');
  }
  return tasksOfProject.toJSON().tasks.every((task) => {
    if (!('name' in task)) {
      throw new ValError(
        'isUniqueTaskName error: `name` is not in task document'
      );
    }
    return task.name !== taskName;
  });
};

const isUniqueTaskNameForUpdate = async (
  taskName: string,
  projectId: string,
  taskId: string
): Promise<boolean> => {
  const tasksOfProject = await Project.findById(projectId).populate('tasks');
  const currentTask = await Task.findById(taskId);
  if (tasksOfProject === null) {
    throw new ValError('isUniqueTaskNameForUpdate error: project not found');
  }
  if (currentTask === null) {
    throw new ValError('isUniqueTaskNameForUpdate error: task not found');
  }

  return tasksOfProject
    .toJSON()
    .tasks.filter((task) => {
      if (!('name' in task)) {
        throw new ValError(
          'isUniqueTaskName error: `name` is not in task document'
        );
      }
      return task.name !== currentTask.name;
    })
    .every((task) => {
      if (!('name' in task)) {
        throw new ValError(
          'isUniqueTaskName error: `name` is not in task document'
        );
      }
      return task.name !== taskName;
    });
};
