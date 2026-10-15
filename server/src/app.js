import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import routes from './routes/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));

app.use('/api', routes);

// Static: generated/derived assets + production build
const publicDir = path.resolve(__dirname, '../../public');
const distDir = path.resolve(__dirname, '../../dist');
app.use('/assets', express.static(publicDir + '/assets', { maxAge: '7d' }));
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir, { maxAge: '7d', index: 'index.html' }));
  app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(distDir, 'index.html')));
}

// 404 + error handling
app.use('/api', (_req, res) => res.status(404).json({ error: 'not_found', message: 'Endpoint not found' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'server_error', message: 'Internal server error' });
});

export default app;
