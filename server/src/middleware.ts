import { Request, Response } from 'express';
import morgan from 'morgan';

morgan.token('data', (req: Request) => JSON.stringify(req.body));
const logger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :data'
);

const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).json({ error: 'unknown endpoint' });
};

const errorHandler = (err: Error, _req: Request, res: Response) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: err.message });
  }
  return res.status(500).json({ error: 'Internal Server Error' });
};

export default {
  logger,
  unknownEndpoint,
  errorHandler,
};
