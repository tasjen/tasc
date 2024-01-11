import { Request, Response } from 'express';
import User from '../models/user_model';
import { parseUser } from '../utils/validator';

const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  const users = await User.find({}).populate({
    path: 'projects',
    select: 'name',
    populate: {
      path: 'tasks',
      select: ['name', 'description', 'due_date', 'priority'],
    },
  });

  res.status(200).json(users);
};

const addUser = async (req: Request, res: Response): Promise<void> => {
  const newUser = parseUser(req.body);
  const docUser = new User(newUser);
  const savedUser = await docUser.save();

  res.status(201).json(savedUser);
};

export default {
  getAllUsers,
  addUser,
};
