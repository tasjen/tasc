import { Request, Response } from 'express';
import User from '../models/user_model';
import { parseUser } from '../utils/validator';

// const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
//   const users = await User.find({}).populate({
//     path: 'projects',
//     select: 'name',
//     populate: {
//       path: 'tasks',
//       select: ['name', 'description', 'due_date', 'priority'],
//     },
//   });

//   res.status(200).json(users);
// };

const getUser = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.user)
    .select('-_id')
    .populate({
      path: 'projects',
      select: 'name',
      populate: {
        path: 'tasks',
        select: ['name', 'description', 'due_date', 'priority'],
      },
    });

  if (user === null) {
    res.status(401).json({ error: 'user not found' });
    return;
  }
  res.status(200).json(user);
};

const addUser = async (req: Request, res: Response): Promise<void> => {
  const newUser = await parseUser(req.body);
  const docUser = new User(newUser);

  const savedUser = await docUser.save();

  res.status(201).json(savedUser);
};

export default {
  // getAllUsers,
  getUser,
  addUser,
};
