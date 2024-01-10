// import { UserJson } from './src/types';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      MONGODB_URI: string;
      PORT: string;
      SECRET: string;
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