import express, { RequestHandler } from 'express';
import userController from '../controllers/user_constoller';
import { userExtractor } from '../utils/middleware';

const userRouter = express.Router();

// userRouter.get('/', (async (req, res) => {
//   await userController.getAllUsers(req, res);
// }) as RequestHandler);

userRouter.get('/:username', userExtractor, (async (req, res) => {
  await userController.getUser(req, res);
}) as RequestHandler);

userRouter.post('/', (async (req, res) => {
  await userController.addUser(req, res);
}) as RequestHandler);

export default userRouter;
