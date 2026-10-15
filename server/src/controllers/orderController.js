import prisma from '../services/db.js';

export const SHIPPING_FREE_OVER = 50;
export const SHIPPING_FLAT = 5;
export const COUPONS = { GYMRAT10: 0.1, GYMRAT15: 0.15 };

export function orderTotals(items, couponCode = '') {
  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
  const shipping = subtotal >= SHIPPING_FREE_OVER || subtotal === 0 ? 0 : SHIPPING_FLAT;
  const rate = COUPONS[String(couponCode || '').toUpperCase()] || 0;
  const discount = Math.round(subtotal * rate * 100) / 100;
  const total = Math.max(0, Math.round((subtotal + shipping - discount) * 100) / 100);
  return { subtotal, shipping, discount, total };
}

export async function createOrder(req, res) {
  const { fullName, phone, line1, city, country, notes, paymentMethod, couponCode } = req.body;
  const cartItems = await prisma.cartItem.findMany({ where: { userId: req.userId }, include: { product: true } });
  if (!cartItems.length) return res.status(400).json({ error: 'empty_cart', message: 'Cart is empty' });

  const items = cartItems.map((it) => ({
    productId: it.productId,
    name: it.product.name,
    image: it.product.image,
    price: it.product.price,
    quantity: it.quantity,
    size: it.size,
    color: it.color,
  }));
  const { subtotal, shipping, discount, total } = orderTotals(items, couponCode);

  const order = await prisma.order.create({
    data: {
      userId: req.userId,
      status: 'pending',
      subtotal, shipping, discount, total,
      couponCode: couponCode || null,
      fullName, phone, line1, city, country: country || 'EG', notes: notes || '',
      paymentMethod: paymentMethod || 'cod',
      items: { create: items },
    },
    include: { items: true },
  });
  await prisma.cartItem.deleteMany({ where: { userId: req.userId } });
  res.status(201).json({ order });
}

export async function listOrders(req, res) {
  const orders = await prisma.order.findMany({
    where: { userId: req.userId },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ orders });
}

export async function getOrder(req, res) {
  const order = await prisma.order.findFirst({
    where: { id: Number(req.params.id), userId: req.userId },
    include: { items: true },
  });
  if (!order) return res.status(404).json({ error: 'not_found', message: 'Order not found' });
  res.json({ order });
}
