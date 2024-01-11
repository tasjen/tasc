import express, { RequestHandler } from 'express';
import userController from '../controllers/user_constoller';

const userRouter = express.Router();

userRouter.get('/', (async (req, res) => {
  await userController.getAllUsers(req, res);
}) as RequestHandler);

userRouter.post('/', (async (req, res) => {
  await userController.addUser(req, res);
}) as RequestHandler);

export default userRouter;
