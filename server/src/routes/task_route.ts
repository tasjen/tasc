import { Router, RequestHandler } from 'express';
import taskController from '../controllers/task_controller';
import { userExtractor } from '../controllers/middleware';

const taskRouter = Router();

// taskRouter.get('/', (async (req, res) => {
//   await taskController.getAllTasks(req, res);
// }) as RequestHandler);

taskRouter.post('/', userExtractor, (async (req, res) => {
  await taskController.addTask(req, res);
}) as RequestHandler);

taskRouter.delete('/:id', userExtractor, (async (req, res) => {
  await taskController.deleteTask(req, res);
}) as RequestHandler);

taskRouter.put('/:id', userExtractor, (async (req, res) => {
  await taskController.updateTask(req, res);
}) as RequestHandler);

export default taskRouter;
