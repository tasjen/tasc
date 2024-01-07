export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export type Task = {
  name: string;
  description: string;
  date: Date;
  priority: Priority;
};

export type Project = {
  name: string;
  takss: Task[];
};
