import { Router, RequestHandler } from 'express';
import projectService from '../services/project_service';
import { userExtractor } from '../middleware';
const projectRouter = Router();

projectRouter.get('/', (async (_req, res) => {
  res.json(await projectService.getProjects());
}) as RequestHandler);

projectRouter.post('/', userExtractor, (async (req, res) => {
  const savedProject = await projectService.addProject(
    req.body,
    req.user as string
  );
  res.status(201).json(savedProject);
}) as RequestHandler);

export default projectRouter;
