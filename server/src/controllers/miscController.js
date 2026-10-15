import prisma from '../services/db.js';

export async function subscribe(req, res) {
  const { email } = req.body;
  await prisma.newsletterSubscriber.upsert({
    where: { email: email.toLowerCase() },
    update: {},
    create: { email: email.toLowerCase() },
  });
  res.status(201).json({ success: true, message: 'Subscribed' });
}

export async function contact(req, res) {
  const { name, email, topic, message } = req.body;
  await prisma.contactMessage.create({ data: { name, email, topic, message } });
  res.status(201).json({ success: true, message: 'Message received' });
}

export async function health(_req, res) {
  res.json({ status: 'ok', brand: 'GYMRAT', time: new Date().toISOString() });
}
