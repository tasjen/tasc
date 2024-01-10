import app from './app';
import { PORT } from './config';

console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server running of port ${PORT}`);
});

