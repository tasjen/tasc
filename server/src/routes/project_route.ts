import { Router, RequestHandler } from 'express';
import projectController from '../controllers/project_controller';
import { userExtractor } from '../utils/middleware';

const projectRouter = Router();

projectRouter.get('/', (async (req, res) => {
  await projectController.getAllProjects(req, res);
}) as RequestHandler);

projectRouter.post('/', userExtractor, (async (req, res) => {
  await projectController.addProject(req, res);
}) as RequestHandler);

projectRouter.delete('/:id', userExtractor, (async (req, res) => {
  await projectController.deleteProject(req, res);
}) as RequestHandler);

export default projectRouter;
