import mongoose from 'mongoose';
import app from './app';
import { MONGO_URI, PORT } from './config';

if (process.env.NODE_ENV !== 'prod') {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      if (process.env.NODE_ENV !== 'test') {
        console.log('connected to MongoDB');
      }
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((err) => console.log('Failed to start server: ', err));
}

export { handler } from './lambda';
