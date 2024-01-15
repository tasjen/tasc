import Task from '../models/task_model';
import { Request, Response } from 'express';
import { parseTask } from '../utils/validator';
import Project from '../models/project_model';

const getAllTasks = async (_req: Request, res: Response): Promise<void> => {
  const allTasks = await Task.find({}).populate({
    path: 'project',
    select: 'name',
    populate: { path: 'user', select: 'username' },
  });

  res.status(200).json(allTasks);
};

const addTask = async (req: Request, res: Response): Promise<void> => {
  const newTask = await parseTask(req.body, req.user as string);
  const docTask = new Task(newTask);
  const savedTask = await docTask.save();

  res.status(201).json(savedTask);
};

const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const task = await Task.findById(req.params.id);
  const project = await Project.findById(task?.project);
  if (
    task !== null &&
    project !== null &&
    project.toJSON().user.toString() === req.user
  ) {
    void task.deleteOne();
  }
  res.status(201).end();
};

export default {
  getAllTasks,
  addTask,
  deleteTask,
};
