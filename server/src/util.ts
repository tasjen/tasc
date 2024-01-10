import User from './models/user_model';
import { NewProject, NewUser } from './types';
import { JwtFormat } from './types';

export class ValidationError extends Error {
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
    throw new ValidationError('Invalid username');
  }
  return username;
};

const parsePassword = (password: unknown): string => {
  if (!isString(password) || password.length <= 5) {
    throw new ValidationError('Invalid password');
  }
  return password;
};

export const parseUser = (object: unknown): NewUser => {
  if (
    !object ||
    typeof object !== 'object' ||
    !('username' in object && 'password' in object)
  ) {
    throw new ValidationError('Incorrect or missing data');
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
  user: string
): Promise<boolean> => {
  const projectsOfUser = await User.findById(user).populate('projects');
  if (projectsOfUser === null) {
    throw new Error('user not found');
  }
  return projectsOfUser.toJSON().projects.every((project) => {
    if (!('name' in project)) {
      throw new Error('name property not found in project document');
    }
    return project.name !== projectName;
  });
};

const parseProjectName = async (
  projectName: unknown,
  user: string
): Promise<string> => {
  if (!isString(projectName) || projectName.length < 1) {
    throw new ValidationError('Project name must be at least 1 character');
  }
  if (!(await isUniqueProjectName(projectName, user))) {
    throw new ValidationError('project name must be unique');
  }
  return projectName;
};

export const parseProject = async (
  object: unknown,
  user: string
): Promise<NewProject> => {
  if (!object || typeof object !== 'object' || !('name' in object)) {
    throw new ValidationError('Incorrect or missing data');
  }
  const newProject: NewProject = {
    name: await parseProjectName(object.name, user),
    user: user,
    tasks: [],
  };
  return newProject;
};

