import prisma from '../services/db.js';

const include = { product: { include: { category: true } } };

export async function getCart(req, res) {
  const items = await prisma.cartItem.findMany({ where: { userId: req.userId }, include, orderBy: { id: 'desc' } });
  res.json({ items });
}

export async function addToCart(req, res) {
  const { productId, size, color, quantity } = req.body;
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return res.status(404).json({ error: 'not_found', message: 'Product not found' });

  const existing = await prisma.cartItem.findFirst({ where: { userId: req.userId, productId, size, color } });
  let item;
  if (existing) {
    item = await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: Math.min(existing.quantity + quantity, 20) },
      include,
    });
  } else {
    item = await prisma.cartItem.create({ data: { userId: req.userId, productId, size, color, quantity }, include });
  }
  res.status(201).json({ item });
}

export async function updateCartItem(req, res) {
  const id = Number(req.params.id);
  const quantity = Number(req.body.quantity);
  const existing = await prisma.cartItem.findFirst({ where: { id, userId: req.userId } });
  if (!existing) return res.status(404).json({ error: 'not_found', message: 'Cart item not found' });
  if (!quantity || quantity < 1) {
    await prisma.cartItem.delete({ where: { id } });
    return res.json({ removed: true });
  }
  const item = await prisma.cartItem.update({ where: { id }, data: { quantity: Math.min(quantity, 20) }, include });
  res.json({ item });
}

export async function removeCartItem(req, res) {
  const id = Number(req.params.id);
  const existing = await prisma.cartItem.findFirst({ where: { id, userId: req.userId } });
  if (!existing) return res.status(404).json({ error: 'not_found', message: 'Cart item not found' });
  await prisma.cartItem.delete({ where: { id } });
  res.json({ removed: true });
}

export async function clearCart(req, res) {
  await prisma.cartItem.deleteMany({ where: { userId: req.userId } });
  res.json({ cleared: true });
}
