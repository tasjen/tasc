import { Router, RequestHandler } from 'express';
import User from '../models/user_model';
import Project from '../models/project_model';
import Task from '../models/task_model';

const testingRouter = Router();

testingRouter.post('/reset', (async (_req, res) => {
  await User.deleteMany({});
  await Project.deleteMany({});
  await Task.deleteMany({});
  res.json({ message: `${process.env.NODE_ENV}TodoList database has been successfully reset` });
}) as RequestHandler);

export default testingRouter;