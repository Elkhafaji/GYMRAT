// Centralized API service — talks to Express REST API (/api)
const TOKEN_KEY = 'gymrat_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY) || '';
export const setToken = (t) => (t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY));

async function request(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`/api${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || 'Request failed');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  // auth
  register: (body) => request('/auth/register', { method: 'POST', body }),
  login: (body) => request('/auth/login', { method: 'POST', body }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  me: () => request('/auth/me'),
  updateMe: (body) => request('/auth/me', { method: 'PATCH', body }),
  // catalog
  products: (params = {}) => {
    const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== '' && v != null)).toString();
    return request(`/products${qs ? `?${qs}` : ''}`);
  },
  product: (slug) => request(`/products/${slug}`),
  categories: () => request('/categories'),
  category: (slug) => request(`/categories/${slug}`),
  collections: () => request('/collections'),
  collection: (slug) => request(`/collections/${slug}`),
  // cart
  cart: () => request('/cart'),
  addToCart: (body) => request('/cart', { method: 'POST', body }),
  updateCart: (id, body) => request(`/cart/${id}`, { method: 'PATCH', body }),
  removeCart: (id) => request(`/cart/${id}`, { method: 'DELETE' }),
  clearCart: () => request('/cart', { method: 'DELETE' }),
  // orders
  createOrder: (body) => request('/orders', { method: 'POST', body }),
  orders: () => request('/orders'),
  order: (id) => request(`/orders/${id}`),
  // wishlist
  wishlist: () => request('/wishlist'),
  toggleWishlist: (productId) => request(`/wishlist/${productId}`, { method: 'POST' }),
  removeWishlist: (productId) => request(`/wishlist/${productId}`, { method: 'DELETE' }),
  // misc
  newsletter: (email) => request('/newsletter', { method: 'POST', body: { email } }),
  contact: (body) => request('/contact', { method: 'POST', body }),
};

export default api;
