import { Request, Response } from 'express';
import User, { UserDocument } from '../models/user_model';
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
  const newUser: UserDocument = new User(parseUser(req.body));
  const savedUser = await newUser.save();

  res.status(201).json(savedUser);
};

export default {
  getAllUsers,
  addUser,
};
