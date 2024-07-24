import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/user_route';
import taskRouter from './routes/task_route';
import testingRouter from './routes/testing_route';
import {
  logger,
  unknownEndpoint,
  errorHandler,
} from './controllers/middleware';
import loginRouter from './routes/login_route';
import projectRouter from './routes/project_route';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger());

app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'prod') {
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
} else if (['dev', 'test'].includes(process.env.NODE_ENV)) {
  app.use('/api/testing', testingRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
