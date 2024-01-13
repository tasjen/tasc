import { TaskJson } from '../../server/src/utils/types';

export type {
  JwtFormat,
  NewTask,
  NewProject,
  NewUser,
  TaskJson,
  ProjectJson,
  UserJson,
} from '../../server/src/utils/types';

export type UserState = {
  username: string;
  projects: ProjectState[];
  id: string;
};

export type ProjectState = {
  name: string;
  tasks: Omit<TaskJson, 'project'>[];
  id: string;
};

export const initUserState: UserState = {
  username: '',
  projects: [],
  id: '',
};

export const initProjectState: ProjectState = {
  name: '',
  tasks: [],
  id: '',
};

export const initToggleRef = {
  toggleVisible: () => {} 
};
