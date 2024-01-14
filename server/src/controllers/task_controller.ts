import Task from '../models/task_model';
import { Request, Response } from 'express';
import { parseTask } from '../utils/validator';
// import Project, { ProjectDocument } from '../models/project_model';

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

export default {
  getAllTasks,
  addTask,
};
