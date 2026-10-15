import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import api, { getToken, setToken } from '../lib/api.js';

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

const CART_KEY = 'gymrat_cart';
const WISH_KEY = 'gymrat_wishlist';
const LANG_KEY = 'gymrat_lang';

export function AppProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem(LANG_KEY) || 'ar');
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [cart, setCart] = useState([]); // {productId, name, slug, image, price, size, color, quantity}
  const [wishlist, setWishlist] = useState([]); // [productId]
  const [toast, setToast] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isAr = lang === 'ar';
  const t = useCallback((ar, en) => (isAr ? ar : en), [isAr]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    localStorage.setItem(LANG_KEY, lang);
  }, [lang, isAr]);

  const setLang = (l) => setLangState(l);

  const showToast = useCallback((msg, tone = 'ok') => {
    setToast({ msg, tone, id: Date.now() });
    setTimeout(() => setToast((cur) => (cur && Date.now() - cur.id >= 2400 ? null : cur)), 2600);
  }, []);

  // ---- restore session
  useEffect(() => {
    (async () => {
      if (getToken()) {
        try {
          const { user: me } = await api.me();
          setUser(me);
        } catch {
          setToken('');
        }
      }
      try {
        const local = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
        setCart(Array.isArray(local) ? local : []);
      } catch { setCart([]); }
      try {
        const w = JSON.parse(localStorage.getItem(WISH_KEY) || '[]');
        setWishlist(Array.isArray(w) ? w : []);
      } catch { setWishlist([]); }
      setAuthReady(true);
    })();
  }, []);

  // ---- persist guest cart/wishlist (gated on hydration so the initial
  // empty state never clobbers the stored cart — StrictMode runs effects
  // twice in dev, and the session restore awaits api.me() before reading)
  useEffect(() => {
    if (!user && authReady) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, user, authReady]);
  useEffect(() => {
    if (!user && authReady) localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, user, authReady]);

  const syncServerCart = useCallback(async () => {
    const { items } = await api.cart();
    setCart(items.map((it) => ({
      id: it.id,
      productId: it.productId,
      name: it.product.name,
      slug: it.product.slug,
      image: it.product.image,
      price: it.product.price,
      size: it.size,
      color: it.color,
      quantity: it.quantity,
    })));
  }, []);

  const syncServerWishlist = useCallback(async () => {
    const { items } = await api.wishlist();
    setWishlist(items.map((it) => it.productId));
  }, []);

  const login = useCallback(async (email, password) => {
    const { user: me, token } = await api.login({ email, password });
    setToken(token);
    setUser(me);
    // merge guest cart
    const guest = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    for (const it of guest) {
      try { await api.addToCart({ productId: it.productId, size: it.size, color: it.color, quantity: it.quantity }); } catch { /* ignore */ }
    }
    localStorage.removeItem(CART_KEY);
    await syncServerCart();
    try { await syncServerWishlist(); } catch { /* ignore */ }
    return me;
  }, [syncServerCart, syncServerWishlist]);

  const register = useCallback(async (payload) => {
    const { user: me, token } = await api.register(payload);
    setToken(token);
    setUser(me);
    await syncServerCart().catch(() => {});
    return me;
  }, [syncServerCart]);

  const logout = useCallback(async () => {
    try { await api.logout(); } catch { /* ignore */ }
    setToken('');
    setUser(null);
    setCart([]);
    setWishlist([]);
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(WISH_KEY);
  }, []);

  const addToCart = useCallback(async (product, { size = 'M', color = 'أسود', quantity = 1 } = {}) => {
    const line = {
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      price: product.price,
      size, color, quantity,
    };
    if (user) {
      await api.addToCart({ productId: product.id, size, color, quantity });
      await syncServerCart();
    } else {
      setCart((cur) => {
        const idx = cur.findIndex((it) => it.productId === line.productId && it.size === size && it.color === color);
        if (idx >= 0) {
          const next = [...cur];
          next[idx] = { ...next[idx], quantity: Math.min(next[idx].quantity + quantity, 20) };
          return next;
        }
        return [...cur, line];
      });
    }
  }, [user, syncServerCart]);

  const updateQty = useCallback(async (line, quantity) => {
    if (user) {
      if (line.id) await api.updateCart(line.id, quantity);
      await syncServerCart();
    } else {
      setCart((cur) => cur
        .map((it) => (it.productId === line.productId && it.size === line.size && it.color === line.color ? { ...it, quantity } : it))
        .filter((it) => it.quantity > 0));
    }
  }, [user, syncServerCart]);

  const removeLine = useCallback(async (line) => {
    if (user) {
      if (line.id) await api.removeCart(line.id);
      await syncServerCart();
    } else {
      setCart((cur) => cur.filter((it) => !(it.productId === line.productId && it.size === line.size && it.color === line.color)));
    }
  }, [user, syncServerCart]);

  const clearCart = useCallback(async () => {
    if (user) {
      await api.clearCart();
      await syncServerCart();
    } else setCart([]);
  }, [user, syncServerCart]);

  const toggleWishlist = useCallback(async (productId) => {
    if (user) {
      const { wishlisted } = await api.toggleWishlist(productId);
      setWishlist((cur) => (wishlisted ? [...cur, productId] : cur.filter((id) => id !== productId)));
      return wishlisted;
    }
    let added = false;
    setWishlist((cur) => {
      if (cur.includes(productId)) return cur.filter((id) => id !== productId);
      added = true;
      return [...cur, productId];
    });
    return added;
  }, [user]);

  const cartCount = useMemo(() => cart.reduce((s, it) => s + it.quantity, 0), [cart]);

  const value = {
    lang, setLang, isAr, t,
    user, authReady, login, register, logout,
    cart, cartCount, addToCart, updateQty, removeLine, clearCart,
    wishlist, toggleWishlist,
    toast, showToast,
    searchOpen, setSearchOpen, menuOpen, setMenuOpen,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
