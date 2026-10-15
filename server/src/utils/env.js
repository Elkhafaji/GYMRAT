// Minimal .env loader (no dependency). Prisma CLI reads .env itself.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*("?)(.*)\2\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[3];
  }
}
if (!process.env.DATABASE_URL) process.env.DATABASE_URL = 'postgresql://localhost/gymrat';
if (!process.env.JWT_SECRET) process.env.JWT_SECRET = 'gymrat-dev-secret-change-me';
