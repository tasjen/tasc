/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { PORT } from './utils/config';
import app from './app';
import serverlessExpress from '@codegenie/serverless-express';
import mongoose from 'mongoose';
import { MONGO_URI } from './utils/config';
import type { Context } from 'aws-lambda';

let serverlessExpressInstance: any;

async function connectToDB() {
  return mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  });
  // if (process.env.NODE_ENV !== 'test') {
  //   console.log('connected to MongoDB');
  // }
}

async function bootstrap(event: any, context: Context) {
  await connectToDB();
  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
}

export function handler(event: any, context: Context) {
  return (serverlessExpressInstance ?? bootstrap)(event, context);
}

// app.listen(PORT, () => {
//   console.log(`Server running of port ${PORT}`);
// });
