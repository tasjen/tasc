import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;

export const SECRET = process.env.SECRET as string;

let MONGO_URI = '';
switch (process.env.NODE_ENV) {
  case 'prod':
    MONGO_URI = process.env.PROD_MONGO_URI as string;
    break;
  case 'dev':
    MONGO_URI = process.env.DEV_MONGO_URI as string;
    break;
  case 'test':
    MONGO_URI = process.env.TEST_MONGO_URI as string;
    break;
  default:
    break;
}
export { MONGO_URI };
