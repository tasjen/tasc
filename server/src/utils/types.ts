export type Id = {
  id: string;
};

export type JwtFormat = {
  userId: string;
  iat: number;
};

export enum Priority {
  Low = 1,
  Medium = 2,
  High = 3,
}
export type NewTask = {
  name: string;
  description: string;
  due_date: Date;
  priority: Priority;
  project: string;
};

export type TaskJson = Omit<NewTask, 'due_date'> & { due_date: string } & Id;

export type NewProject = {
  name: string;
  user: string;
  tasks: string[];
};

export type ProjectJson = Omit<NewProject, 'tasks'> &
  Id & {
    tasks: TaskJson[];
  };

export type NewUser = {
  username: string;
  password: string;
  projects: string[];
};

export type UserJson = Omit<NewUser, 'password' | 'projects'> &
  Id & {
    projects: ProjectJson[];
  };
