import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { MONGO_URI } from './utils/config';
import userRouter from './routes/user_route';
import taskRouter from './routes/task_route';
import testingRouter from './routes/testing_route';
import { logger, unknownEndpoint, errorHandler } from './utils/middleware';
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
app.use(logger());

app.use(express.static('dist'));

app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/login', loginRouter);


if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
