namespace NodeJS {
  interface ProcessEnv {
    [key: string]: any;
    PROD_MONGO_URI: string;
    DEV_MONGO_URI: string;
    TEST_MONGO_URI: string;
    PORT: string | number;
    SECRET: string;
    NODE_ENV: 'prod' | 'dev' | 'test';
  }
}