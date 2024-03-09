import { Router, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user_model';
import { SECRET } from '../utils/config';
import { isString } from '../utils/validator';

const loginRouter = Router();

loginRouter.post('/', (async (req, res) => {
  const username: unknown = req.body.username;
  const password: unknown = req.body.password;
  if (!isString(username) || !isString(password)) {
    res.status(401).json({
      error: 'invalid username or password',
    });
    return;
  }

  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({
      error: 'invalid username or password',
    });
    return;
  }

  const { id }: { id: string } = user.toJSON();
  const token = jwt.sign({ userId: id }, SECRET);

  res.json({ token, username });
}) as RequestHandler);

export default loginRouter;
