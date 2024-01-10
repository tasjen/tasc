import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { MONGO_URI } from './config';
import userRouter from './routes/users_route';
import taskRouter from './routes/tasks_route';
import { logger, unknownEndpoint, errorHandler } from './middleware';
import loginRouter from './routes/login_route';
import projectRouter from './routes/project_route';

const app = express();

mongoose
  .connect(MONGO_URI)
  .then(() => {
    if (process.env.NODE_ENV !== 'test') {
      console.log('connected to MongoDB');
    }
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (_req, res) => {
  res.end('/');
});

app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/login', loginRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
