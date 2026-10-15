export const money = (n) => `$${Number(n || 0).toFixed(2)}`;

export const discountOf = (p) =>
  p?.compareAtPrice && p.compareAtPrice > p.price
    ? Math.round((1 - p.price / p.compareAtPrice) * 100)
    : 0;

export const SHIPPING_FREE_OVER = 50;
export const SHIPPING_FLAT = 5;
export const COUPONS = { GYMRAT10: 0.1, GYMRAT15: 0.15 };

export function totalsOf(items, couponCode = '') {
  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
  const shipping = subtotal >= SHIPPING_FREE_OVER || subtotal === 0 ? 0 : SHIPPING_FLAT;
  const rate = COUPONS[String(couponCode || '').toUpperCase()] || 0;
  const discount = Math.round(subtotal * rate * 100) / 100;
  const total = Math.max(0, Math.round((subtotal + shipping - discount) * 100) / 100);
  return { subtotal, shipping, discount, total };
}

export const colorDotsOf = (product) => {
  const seen = new Set();
  const dots = [];
  for (const v of product?.variants || []) {
    if (!seen.has(v.color)) {
      seen.add(v.color);
      dots.push({ color: v.color, hex: v.colorHex });
    }
  }
  return dots.length ? dots : [{ color: 'أسود', hex: '#1a1a1a' }];
};

export const sizesOf = (product) => {
  const seen = new Set();
  const sizes = [];
  for (const v of product?.variants || []) {
    if (!seen.has(v.size)) {
      seen.add(v.size);
      sizes.push(v.size);
    }
  }
  return sizes.length ? sizes : ['M'];
};
