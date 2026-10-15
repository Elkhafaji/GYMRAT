import bcrypt from 'bcryptjs';
import prisma from '../services/db.js';
import { signToken, publicUser } from '../middleware/auth.js';

export async function register(req, res) {
  const { name, email, password, phone, gender, birthDate, interests } = req.body;
  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (existing) return res.status(409).json({ error: 'email_taken', message: 'An account with this email already exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      passwordHash,
      phone: phone || null,
      gender: gender || null,
      birthDate: birthDate || null,
      interests: interests || null,
    },
  });
  res.status(201).json({ user: publicUser(user), token: signToken(user) });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) return res.status(401).json({ error: 'invalid_credentials', message: 'Invalid email or password' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'invalid_credentials', message: 'Invalid email or password' });
  res.json({ user: publicUser(user), token: signToken(user) });
}

export async function me(req, res) {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) return res.status(404).json({ error: 'not_found', message: 'User not found' });
  res.json({ user: publicUser(user) });
}

export async function updateMe(req, res) {
  const { name, phone, gender, birthDate, interests } = req.body;
  const user = await prisma.user.update({
    where: { id: req.userId },
    data: {
      ...(name !== undefined ? { name } : {}),
      ...(phone !== undefined ? { phone } : {}),
      ...(gender !== undefined ? { gender } : {}),
      ...(birthDate !== undefined ? { birthDate } : {}),
      ...(interests !== undefined ? { interests } : {}),
    },
  });
  res.json({ user: publicUser(user) });
}

export function logout(_req, res) {
  res.json({ success: true, message: 'Logged out' });
}
