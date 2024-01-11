import app from './app';
import { PORT } from './utils/config';

console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server running of port ${PORT}`);
});

