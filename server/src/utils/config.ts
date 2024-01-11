import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;

export const SECRET = process.env.SECRET as string;

export const MONGO_URI =
  process.env.NODE_ENV === 'test'
    ? (process.env.TEST_MONGO_URI as string)
    : (process.env.MONGO_URI as string);
