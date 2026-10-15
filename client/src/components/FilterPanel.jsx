/* GYMRAT — shared shop filter panel (categories, sizes, colors, price, collections, tags) */
import React from 'react';
import { SlidersHorizontal, Trash2, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { Check } from './ui.jsx';

export const COLORS = [
  { name: 'أسود', hex: '#1a1a1a' },
  { name: 'رمادي', hex: '#6f6f6f' },
  { name: 'أبيض', hex: '#e8e8e3' },
  { name: 'بيج', hex: '#cbb99a' },
  { name: 'ليموني', hex: '#87f52b' },
  { name: 'زيتي', hex: '#5f6b3a' },
];
export const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
export const FEATURES = [
  { key: 'waterproof', ar: 'مقاوم للماء', en: 'Water-resistant' },
  { key: 'limited', ar: 'تصاميم محدودة', en: 'Limited designs' },
  { key: 'soft', ar: 'خامات مريحة', en: 'Soft fabrics' },
  { key: 'lightweight', ar: 'خفيف الوزن', en: 'Lightweight' },
];

export default function FilterPanel({
  categories = [], collections = [], value, onChange, priceMax = 100, onApply, onReset, showCollections = true,
}) {
  const { t, isAr } = useApp();
  const v = value;
  const set = (patch) => onChange({ ...v, ...patch });

  const toggleIn = (key, item) => {
    const arr = v[key] || [];
    set({ [key]: arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item] });
  };

  return (
    <aside className="filters">
      <div className="filter-panel">
        <div className="filter-head">
          <h3><SlidersHorizontal size={17} /> {t('تصفية المنتجات', 'Filter Products')}</h3>
        </div>

        <div className="filter-group">
          <h4>{t('الفئة', 'Category')}</h4>
          <Check checked={v.categories.length === 0} onChange={() => set({ categories: [] })}>
            {t('الكل', 'All')}
          </Check>
          {categories.map((c) => (
            <Check key={c.slug} checked={v.categories.includes(c.slug)} onChange={() => toggleIn('categories', c.slug)}>
              {isAr ? c.nameAr : c.name} <span className="muted">({c.productCount})</span>
            </Check>
          ))}
        </div>

        <div className="filter-group">
          <h4>{t('المقاس', 'Size')}</h4>
          <div className="filter-sizes">
            {SIZES.map((s) => (
              <button key={s} type="button" className={`size-chip ${v.size === s ? 'active' : ''}`} onClick={() => set({ size: v.size === s ? '' : s })}>{s}</button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h4>{t('اللون', 'Color')}</h4>
          <div className="filter-colors">
            {COLORS.map((c) => (
              <button
                key={c.name}
                type="button"
                title={c.name}
                aria-label={c.name}
                className={`swatch ${v.color === c.name ? 'active' : ''}`}
                style={{ background: c.hex }}
                onClick={() => set({ color: v.color === c.name ? '' : c.name })}
              />
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h4>{t('السعر', 'Price')}</h4>
          <input
            className="price-range"
            type="range"
            min="15"
            max={priceMax}
            value={v.maxPrice}
            onChange={(e) => set({ maxPrice: Number(e.target.value) })}
            aria-label="Max price"
          />
          <div className="price-labels"><span>$15</span><span>${v.maxPrice}</span></div>
        </div>

        {showCollections && (
          <div className="filter-group">
            <h4>{t('المجموعة', 'Collection')}</h4>
            {collections.map((c) => (
              <Check key={c.slug} checked={v.collections.includes(c.slug)} onChange={() => toggleIn('collections', c.slug)}>
                {isAr ? c.nameAr : c.name}
              </Check>
            ))}
          </div>
        )}

        <div className="filter-group">
          <h4>{t('تفاصيل إضافية', 'Extra Details')}</h4>
          {FEATURES.map((f) => (
            <Check key={f.key} checked={v.tags.includes(f.key)} onChange={() => toggleIn('tags', f.key)}>
              {isAr ? f.ar : f.en}
            </Check>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <button type="button" className="btn btn-lime btn-block" onClick={onApply}>{t('تطبيق الفلاتر', 'Apply Filters')}</button>
        </div>
        <button type="button" className="btn btn-ghost btn-sm" style={{ marginTop: 10 }} onClick={onReset}>
          <Trash2 size={14} /> {t('إزالة الكل', 'Remove All')}
        </button>
      </div>
    </aside>
  );
}

export function FilterPromo({ image, title, sub, cta, href = '/collections' }) {
  const { t } = useApp();
  return (
    <div className="filter-promo">
      <img src={image} alt={title} loading="lazy" />
      <div className="fp-body">
        <h3>{title}</h3>
        <p className="muted small" style={{ margin: '8px 0 14px' }}>{sub}</p>
        <a className="link-arrow" href={href}>{cta || t('اكتشف المزيد', 'Discover More')} →</a>
      </div>
    </div>
  );
}
