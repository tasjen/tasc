import { Request, Response } from 'express';
import Project from '../models/project_model';
import { parseProject, parseProjectForUpdate } from '../utils/validator';

// const getAllProjects = async (_req: Request, res: Response): Promise<void> => {
//   const allProjects = await Project.find({})
//     .populate({
//       path: 'user',
//       select: 'username',
//     })
//     .populate({
//       path: 'tasks',
//       select: ['name', 'description', 'due_date', 'priority'],
//     });
//   res.status(200).json(allProjects);
// };

const addProject = async (req: Request, res: Response): Promise<void> => {
  const newProject = await parseProject(req.body, req.user);
  const docProject = new Project(newProject);
  const { name, _id } = await docProject.save();

  res.status(201).json({ name, id: _id });
};

const deleteProject = async (req: Request, res: Response): Promise<void> => {
  const project = await Project.findById(req.params.id);

  if (project !== null && project.user.toString() === req.user) {
    await project.deleteOne();
  }
  res.status(201).end();
};

const updateProject = async (req: Request, res: Response): Promise<void> => {
  const { name, id } = await parseProjectForUpdate(
    req.body,
    req.user
  );

  const updatedProject = await Project.findByIdAndUpdate(
    id,
    { name },
    { new: true, runValidators: true, context: 'query' }
  ).select('name id');

  res.status(201).json(updatedProject);
};

export default {
  // getAllProjects,
  addProject,
  deleteProject,
  updateProject,
};
