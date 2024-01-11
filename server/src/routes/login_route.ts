import { Router, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user_model';
import { SECRET } from '../utils/config';

const loginRouter = Router();

loginRouter.post('/', (async (req, res) => {
  const { username = '', password = '' } = req.body as {
    username: string;
    password: string;
  };

  const user = await User.findOne({ username });
  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!user || !isPasswordCorrect) {
    res.status(401).json({
      error: 'invalid username or password',
    });
    return;
  }

  const { id: userId }: { id: string } = user.toJSON();
  const token = jwt.sign({ userId }, SECRET);

  res.json({ token, username });
}) as RequestHandler);

export default loginRouter;
