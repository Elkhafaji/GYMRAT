/* GYMRAT — Wishlist page */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import api from '../lib/api.js';
import { ProductCard, EmptyState } from '../components/ui.jsx';

export default function Wishlist() {
  const { t, isAr, wishlist, user } = useApp();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user) {
      api.wishlist().then(({ items }) => setItems(items.map((it) => it.product))).catch(() => {});
    } else if (wishlist.length) {
      api.products({ limit: 100 })
        .then(({ products }) => setItems(wishlist.map((id) => products.find((p) => p.id === id)).filter(Boolean)))
        .catch(() => {});
    } else setItems([]);
  }, [user, wishlist]);

  return (
    <div className="container" style={{ padding: '36px 0' }}>
      <h1 style={{ fontSize: 28, marginBottom: 6 }}><Heart style={{ color: 'var(--lime)', verticalAlign: 'middle' }} /> {t('المفضلة', 'Wishlist')}</h1>
      <p className="muted" style={{ marginBottom: 22 }}>{t('القطع التي اخترتها', 'The pieces you picked')}</p>
      {items.length === 0 ? (
        <EmptyState
          title={t('قائمتك فارغة', 'Your list is empty')}
          sub={t('اضغط على القلب في أي منتج لحفظه هنا', 'Tap the heart on any product to save it here')}
          action={<Link to="/products" className="btn btn-lime">{t('تسوق الآن', 'Shop now')} {isAr ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</Link>}
        />
      ) : (
        <div className="grid-4">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
