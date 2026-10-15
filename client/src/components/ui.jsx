/* GYMRAT — shared UI components */

import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Plus, Minus, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { money, discountOf, colorDotsOf } from '../lib/format.js';

/* ============================ LOGO ============================ */
export function LogoMark({ size = 34, color = '#E8E8E3' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" aria-hidden="true">
      <path fill={color} d="M30 42h160l-36 48H98l-12 16h84l-32 43H82l40-55H88l-12 16h28L30 42z" />
    </svg>
  );
}

export function Logo({ compact = false }) {
  return (
    <Link to="/" className="logo-link" aria-label="GYMRAT home">
      <LogoMark />
      {!compact && (
        <span>
          <span className="logo-word">GYMRAT</span>
          <span className="logo-tag">BUILT DIFFERENT. BUILT DISCIPLINED.</span>
        </span>
      )}
    </Link>
  );
}

/* ======================= CATEGORY ICONS ======================= */
export function CatIcon({ name, size = 30 }) {
  const p = { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'shirt':
      return <svg {...p}><path d="M11 5 5 8l2 6 3-1v14h12V13l3 1 2-6-6-3-2.5 2.5h-5L11 5z" /></svg>;
    case 'hoodie':
      return <svg {...p}><path d="M16 5c-4 0-7 2.5-7 6 0 2 1 3 1 3h12s1-1 1-3c0-3.5-3-6-7-6z" /><path d="M10 14v13h12V14" /><path d="M13 22h6" /></svg>;
    case 'pants':
      return <svg {...p}><path d="M9 5h14l1 22h-6l-2-12-2 12H8L9 5z" /></svg>;
    case 'shorts':
      return <svg {...p}><path d="M8 7h16l-1 10h-5l-2 10-2-10H9L8 7z" /></svg>;
    case 'cap':
      return <svg {...p}><path d="M7 17c0-5 4-9 9-9s9 4 9 9" /><path d="M7 17h13c3 0 5 2 5 4H7z" /></svg>;
    case 'bag':
      return <svg {...p}><rect x="6" y="12" width="20" height="13" rx="2.5" /><path d="M12 12V9a4 4 0 0 1 8 0v3" /></svg>;
    case 'socks':
      return <svg {...p}><path d="M12 5h6v10l5 5a4 4 0 0 1-6 5l-5-5V5z" /></svg>;
    default:
      return <svg {...p}><circle cx="16" cy="16" r="10" /></svg>;
  }
}

/* ========================= PRODUCT CARD ========================= */
export function ProductCard({ product, onAdd }) {
  const { t, isAr, addToCart, toggleWishlist, wishlist, showToast } = useApp();
  const wishlisted = wishlist.includes(product.id);
  const disc = discountOf(product);
  const dots = colorDotsOf(product).slice(0, 4);

  const add = (e) => {
    e.preventDefault();
    const defSize = product.variants?.some((v) => v.size === 'M') ? 'M' : (product.variants?.[0]?.size || 'ONE SIZE');
    const defColor = product.variants?.[0]?.color || 'أسود';
    addToCart(product, { size: defSize, color: defColor, quantity: 1 })
      .then(() => { showToast(t('تمت الإضافة إلى السلة', 'Added to cart')); onAdd?.(); })
      .catch(() => showToast(t('تعذر الإضافة', 'Could not add'), 'err'));
  };

  const badge = product.badge === 'bestseller'
    ? t('الأكثر مبيعاً', 'Best Seller')
    : product.badge === 'new'
      ? t('جديد', 'New')
      : product.badge === 'sale'
        ? t('تخفيضات', 'Sale')
        : product.badge === 'limited'
          ? t('محدود', 'Limited')
          : null;

  return (
    <article className="product-card">
      <Link to={`/products/${product.slug}`} className="pc-img">
        {badge && (
          <span className={`pc-badge badge ${product.badge === 'new' ? 'badge-dark' : 'badge-lime'}`}>{badge}</span>
        )}
        <button
          type="button"
          className={`pc-fav ${wishlisted ? 'active' : ''}`}
          aria-label={t('أضف إلى المفضلة', 'Add to wishlist')}
          onClick={async (e) => {
            e.preventDefault();
            await toggleWishlist(product.id);
            showToast(wishlisted ? t('أُزيل من المفضلة', 'Removed from wishlist') : t('أُضيف إلى المفضلة', 'Added to wishlist'));
          }}
        >
          <Heart size={16} />
        </button>
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>
      <div className="pc-body">
        <Link to={`/products/${product.slug}`} className="pc-name">{product.name}</Link>
        <div className="pc-sub">{isAr ? product.subtitleAr : product.subtitle}</div>
        <div className="pc-row">
          <div className="pc-dots">
            {dots.map((d, i) => <span key={i} className="dot" style={{ background: d.hex }} title={d.color} />)}
          </div>
          {product.rating != null && (
            <span className="rating"><Star /> {Number(product.rating).toFixed(1)} ({product.reviewCount ?? 0})</span>
          )}
        </div>
        <div className="pc-row">
          <div className="pc-price">
            {money(product.price)}
            {disc > 0 && <s>{money(product.compareAtPrice)}</s>}
          </div>
          {disc > 0 && <span className="badge badge-sale">-{disc}%</span>}
        </div>
        <button type="button" className="btn btn-dark btn-sm btn-block" onClick={add}>
          <ShoppingBag size={16} /> {t('أضف إلى السلة', 'Add to Cart')}
        </button>
      </div>
    </article>
  );
}

/* ============================ STEPPER ============================ */
export function QtyStepper({ value, onChange, min = 0 }) {
  return (
    <div className="stepper">
      <button type="button" aria-label="increase" onClick={() => onChange(value + 1)}><Plus size={15} /></button>
      <span>{value}</span>
      <button type="button" aria-label="decrease" onClick={() => onChange(Math.max(min, value - 1))}><Minus size={15} /></button>
    </div>
  );
}

/* =========================== CHECKBOX =========================== */
export function Check({ checked, onChange, children }) {
  return (
    <label className="check">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="box" />
      <span>{children}</span>
    </label>
  );
}

/* ========================= FEATURE STRIP ========================= */
export function FeatureStrip({ items }) {
  return (
    <div className="feature-strip">
      {items.map((f, i) => (
        <div className="feature-item" key={i}>
          <span className="feature-ic">{f.icon}</span>
          <div>
            <strong>{f.title}</strong>
            <span>{f.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ title, sub, action }) {
  return (
    <div className="empty-state panel panel-pad center">
      <Truck size={38} className="muted" />
      <h3 style={{ margin: '14px 0 6px' }}>{title}</h3>
      <p className="muted" style={{ marginBottom: 18 }}>{sub}</p>
      {action}
    </div>
  );
}
