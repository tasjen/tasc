import dotenv from 'dotenv';
import { isString } from './validator';

dotenv.config();

export const PORT = process.env.PORT || 3000;

if (!isString(process.env.SECRET)) {
  throw new Error(
    'SECRET must be specified as a string. Add one in `.env` file',
  );
}
export const SECRET = process.env.SECRET;

if (
  !(
    'NODE_ENV' in process.env &&
    typeof process.env.NODE_ENV === 'string' &&
    ['prod', 'dev', 'test'].includes(process.env.NODE_ENV)
  )
) {
  throw new Error(
    'NODE_ENV must be specified as a string. Add one in `.env` file',
  );
}

let MONGO_URI = '';
switch (process.env.NODE_ENV) {
  case 'prod':
    if (!isString(process.env.PROD_MONGO_URI)) {
      throw new Error(
        'PROD_MONGO_URI must be specified as a string. Add one in `.env` file',
      );
    }
    MONGO_URI = process.env.PROD_MONGO_URI;
    break;
  case 'dev':
    if (!isString(process.env.DEV_MONGO_URI)) {
      throw new Error(
        'DEV_MONGO_URI must be specified as a string. Add one in `.env` file',
      );
    }
    MONGO_URI = process.env.DEV_MONGO_URI;
    break;
  case 'test':
    if (!isString(process.env.TEST_MONGO_URI)) {
      throw new Error(
        'TEST_MONGO_URI must be specified as a string. Add one in `.env` file',
      );
    }
    MONGO_URI = process.env.TEST_MONGO_URI;
    break;
  default:
    break;
}
export { MONGO_URI };
