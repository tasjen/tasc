import User, { UserDocument } from '../models/user_model';
import { parseUser } from '../util';
// import { UserJson } from '../types';

const getUsers = async () => {
  const users: UserDocument[] = await User.find({}).populate({
    path: 'projects',
    select: 'name',
    populate: {
      path: 'tasks',
      select: ['name', 'description', 'due_date', 'priority'],
    },
  });
  // const users = await User.findOne().populate('projects');
  // console.log(users?.toJSON());
  return users;
};

const addUser = async (body: unknown) => {
  const newUser: UserDocument = new User(parseUser(body));
  return await newUser.save();
};

const deleteUser = async (id: string) => {
  await User.findByIdAndDelete(id);
};
export default {
  getUsers,
  addUser,
  deleteUser,
};
