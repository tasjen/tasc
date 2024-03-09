// import { TaskJson } from '../../server/src/types';
import { Priority } from '../../server/src/models/task_model';

export type TaskAPI = {
  id: string;
  name: string;
  project: string
  description?: string;
  due_date?: string
  priority?: Priority;
}

export type ProjectAPI = {
  id: string;
  name: string;
}

export type TTask = Required<TaskAPI>;
export type TProject = ProjectAPI & { tasks: TTask[] }

export type TUserData = Readonly<{
  username: string;
  projects: TProject[];
}>

export type {
  JwtFormat,
} from '../../server/src/types';

// export type UserState = {
//   username: string;
//   projects: ProjectState[];
//   id: string;
// };

// export type ProjectState = {
//   name: string;
//   tasks: Omit<TaskJson, 'project'>[];
//   id: string;
// };

// export const initUserState: UserState = {
//   username: '',
//   projects: [],
//   id: '',
// };

// export const initProjectState: ProjectState = {
//   name: '',
//   tasks: [],
//   id: '',
// };
