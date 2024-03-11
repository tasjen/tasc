import { Priority } from '../../server/src/models/task_model';

export type TaskAPI = {
  id: string;
  project: string
  name?: string;
  description?: string;
  due_date?: string
  priority?: Priority;
}

export type ProjectAPI = {
  id: string;
  name: string;
}

export type TTask = Required<Omit<TaskAPI, 'project'>>;
export type TProject = ProjectAPI & { tasks: TTask[] }

export type TUserData = Readonly<{
  username: string;
  projects: TProject[];
}>
