import app from './app';
import { PORT } from './utils/config';

app.listen(PORT, () => {
  console.log(`Server running of port ${PORT}`);
});

if (process.env.IS_VERCEL) {
  module.exports = app;
}
