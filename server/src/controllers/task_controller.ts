import Task from '../models/task_model';
import { Request, Response } from 'express';
import { parseTask, parseTaskForUpdate } from '../utils/validator';
import Project from '../models/project_model';

// const getAllTasks = async (_req: Request, res: Response): Promise<void> => {
//   const allTasks = await Task.find({}).populate({
//     path: 'project',
//     select: 'name',
//     populate: { path: 'user', select: 'username' },
//   });

//   res.status(200).json(allTasks);
// };

const addTask = async (req: Request, res: Response): Promise<void> => {
  const newTask = await parseTask(req.body, req.user);
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
    project.user.toString() === req.user
  ) {
    await task.deleteOne();
  }
  res.status(201).end();
};

const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { name, description, due_date, priority, id } =
    await parseTaskForUpdate(req.body, req.user);

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { name, description, due_date, priority },
    { new: true, runValidators: true, context: 'query' }
  );

  res.status(201).json(updatedTask);
};

export default {
  // getAllTasks,
  addTask,
  deleteTask,
  updateTask,
};
