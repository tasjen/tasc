// import { UserJson } from './src/types';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      MONGO_URI: string;
      PORT: string | number;
      SECRET: string;
      NODE_ENV: string;
    }
  }
}

// declare global {
//   namespace Express {
//       interface Request {
//           user?: UserJson
//       }
//   }
// }