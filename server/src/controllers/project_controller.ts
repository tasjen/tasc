import { Request, Response } from 'express';
import Project from '../models/project_model';
import User from '../models/user_model';
import { parseProject } from '../utils/validator';

const getAllProjects = async (_req: Request, res: Response): Promise<void> => {
  const allProjects = await Project.find({})
    .populate({
      path: 'user',
      select: 'username',
    })
    .populate({
      path: 'tasks',
      select: ['name', 'description', 'due_date', 'priority'],
    });
  res.status(200).json(allProjects);
};

const addProject = async (req: Request, res: Response): Promise<void> => {
  const newProject = await parseProject(req.body, req.user as string);
  const docProject = new Project(newProject);
  const savedProject = await docProject.save();

  const userToUpdate = await User.findById(req.user);
  if (userToUpdate === null) {
    throw new Error('userToUpdate is null');
  }

  userToUpdate.projects = [...userToUpdate.projects, savedProject._id];
  await userToUpdate.save();

  res.status(201).json(
    await savedProject.populate({
      path: 'tasks',
      select: ['name', 'description', 'due_date', 'priority'],
    })
  );
};

export default {
  getAllProjects,
  addProject,
};