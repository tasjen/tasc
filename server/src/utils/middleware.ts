import { Request, Response, NextFunction, RequestHandler } from 'express';
import morgan from 'morgan';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user_model';
import { SECRET } from './config';

export const userExtractor = (async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = '';

  const authorization = req.get('authorization');
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.replace('Bearer ', '');
  }

  const decodedToken = jwt.verify(token, SECRET) as JwtPayload;

  const user = await User.findById(decodedToken.userId);
  if (user === null) {
    res.status(401).json({ error: 'token valid but user not found' });
    return;
  }

  req.user = decodedToken.userId as string;
  next();
}) as RequestHandler;

export const logger = () => {
  morgan.token('data', (req: Request) => JSON.stringify(req.body));
  return process.env.NODE_ENV !== 'test'
    ? morgan(
      ':method :url :status :res[content-length] - :response-time ms :data'
    )
    : (((_req, _res, next) => {
      next();
    }) as RequestHandler);
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
