import Project, { ProjectDocument } from '../models/project_model';
import User from '../models/user_model';
import { parseProject } from '../util';

const getProjects = async (): Promise<ProjectDocument[]> => {
  return await Project.find({})
    .populate({
      path: 'user',
      select: 'username',
    })
    .populate({
      path: 'tasks',
      select: ['name', 'description', 'due_date', 'priority'],
    });
};

const addProject = async (
  body: unknown,
  user: string
): Promise<ProjectDocument> => {

  const newProject = new Project(await parseProject(body, user));
  const savedProject = await newProject.save();

  const userToUpdate = await User.findById(user);
  if (userToUpdate === null) {
    throw new Error('userToUpdate is null');
  }

  userToUpdate.projects = [...userToUpdate.projects, savedProject._id];
  await userToUpdate.save();

  return savedProject;
};

export default {
  getProjects,
  addProject,
};
