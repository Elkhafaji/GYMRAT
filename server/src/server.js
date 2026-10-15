import './utils/env.js';
import app from './app.js';

const port = Number(process.env.PORT) || 4000;
app.listen(port, '0.0.0.0', () => {
  console.log(`GYMRAT API listening on http://0.0.0.0:${port}`);
});
