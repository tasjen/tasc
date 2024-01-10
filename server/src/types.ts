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

export type TaskJson = NewTask & Id;

export type NewProject = {
  name: string;
  user: string;
  tasks: [];
};

export type ProjectJson = Omit<NewProject, 'tasks'> & Id & {
  tasks: NewTask[];
};

export type NewUser = {
  username: string;
  password: string;
  projects: [];
};

export type UserJson = Omit<NewUser, 'password' | 'projects'> & Id & {
  projects: NewProject[]
};
