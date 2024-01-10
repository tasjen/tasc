import express, { RequestHandler } from 'express';
import userService from '../services/user_service';
// import { userExtractor } from '../middleware';

const userRouter = express.Router();

userRouter.get('/', (async (_req, res) => {
  res.json(await userService.getUsers());
}) as RequestHandler);

userRouter.post('/', (async (req, res) => {
  const savedUser = await userService.addUser(req.body);
  res.status(201).json(savedUser);
}) as RequestHandler);

// userRouter.delete('/:id', userExtractor, (async (req, res) => {
//   await userService.deleteUser(req.params.id);
//   res.status(204).end();
// }) as RequestHandler);

export default userRouter;
