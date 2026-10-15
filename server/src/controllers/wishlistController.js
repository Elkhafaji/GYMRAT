import prisma from '../services/db.js';

export async function getWishlist(req, res) {
  const items = await prisma.wishlist.findMany({
    where: { userId: req.userId },
    include: { product: { include: { category: true, variants: true } } },
    orderBy: { id: 'desc' },
  });
  res.json({ items });
}

export async function toggleWishlist(req, res) {
  const productId = Number(req.params.productId || req.body.productId);
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return res.status(404).json({ error: 'not_found', message: 'Product not found' });
  const existing = await prisma.wishlist.findFirst({ where: { userId: req.userId, productId } });
  if (existing) {
    await prisma.wishlist.delete({ where: { id: existing.id } });
    return res.json({ wishlisted: false });
  }
  await prisma.wishlist.create({ data: { userId: req.userId, productId } });
  res.status(201).json({ wishlisted: true });
}

export async function removeWishlist(req, res) {
  const productId = Number(req.params.productId);
  await prisma.wishlist.deleteMany({ where: { userId: req.userId, productId } });
  res.json({ wishlisted: false });
}
