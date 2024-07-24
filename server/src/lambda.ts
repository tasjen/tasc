/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import app from './app';
import serverlessExpress from '@codegenie/serverless-express';
import mongoose from 'mongoose';
import { MONGO_URI } from './config';
import type { Context } from 'aws-lambda';

let serverlessExpressInstance: any;

async function connectToDB() {
  return mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  });
}

async function bootstrap(event: any, context: Context) {
  await connectToDB();
  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
}

export function handler(event: any, context: Context) {
  return (serverlessExpressInstance ?? bootstrap)(event, context);
}
