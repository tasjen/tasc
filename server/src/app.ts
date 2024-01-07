import express from 'express';
import cors from 'cors';
import middleware from './middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.logger);

app.get('/', (_req, res) => {
  res.end('/');
});
app.get('/123', (_req, res) => {
  res.end('/456');
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
