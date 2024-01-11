import { Request, Response, NextFunction, RequestHandler } from 'express';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import User from '../models/user_model';
import { SECRET } from './config';
import { JwtFormat } from './types';

export const userExtractor = (async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = '';
  req.user = '';

  const authorization = req.get('authorization');
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.replace('Bearer ', '');
  }

  const decodedToken = jwt.verify(token, SECRET) as JwtFormat;

  const user = await User.findById(decodedToken.userId);
  if (user === null) {
    res.status(401).json({ error: 'token valid but user not found' });
    return;
  }

  req.user = decodedToken.userId;
  next();
}) as RequestHandler;

morgan.token('data', (req: Request) => JSON.stringify(req.body));
export const logger: RequestHandler =
  process.env.NODE_ENV !== 'test'
    ? morgan(
        ':method :url :status :res[content-length] - :response-time ms :data'
      )
    : (_req, _res, next) => {
        next();
      };

export const unknownEndpoint: RequestHandler = (_req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  switch (err.name) {
    case 'CastError':
      res.status(400).json({ error: 'malformatted id' });
      return;
    case 'ValidationError':
      res.status(400).json({ error: err.message });
      return;
    case 'JsonWebTokenError':
      res.status(401).json({ error: err.message });
      return;
    case 'InvalidCredentialsError':
      res.status(401).json({ error: err.message });
      return;
    default:
      res.status(500).json({ error: err.message });
  }
  next(err);
};
