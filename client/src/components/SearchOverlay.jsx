/* GYMRAT — search overlay (live product search) */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import api from '../lib/api.js';
import { money } from '../lib/format.js';

export default function SearchOverlay() {
  const { t, setSearchOpen } = useApp();
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setTimeout(async () => {
      setLoading(true);
      try {
        const { products } = await api.products({ search: q, limit: 8 });
        setResults(products);
      } catch { setResults([]); }
      setLoading(false);
    }, 250);
    return () => clearTimeout(id);
  }, [q]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setSearchOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setSearchOpen]);

  const go = (slug) => {
    setSearchOpen(false);
    navigate(`/products/${slug}`);
  };

  return (
    <div className="overlay" onClick={() => setSearchOpen(false)}>
      <div className="search-panel" onClick={(e) => e.stopPropagation()}>
        <div className="input-icon">
          <Search />
          <input
            className="input"
            autoFocus
            placeholder={t('ابحث عن المنتجات...', 'Search products...')}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="search-results">
          {!loading && q && results.length === 0 && <p className="muted" style={{ padding: 12 }}>{t('لا توجد نتائج', 'No results')}</p>}
          {results.map((p) => (
            <button key={p.id} type="button" className="search-item" onClick={() => go(p.slug)}>
              <img src={p.image} alt={p.name} />
              <span style={{ textAlign: 'start' }}>
                <strong style={{ display: 'block' }}>{p.name}</strong>
                <span className="muted small">{p.subtitleAr}</span>
              </span>
              <span style={{ marginInlineStart: 'auto', fontFamily: 'var(--font-body)', fontWeight: 800 }}>{money(p.price)}</span>
            </button>
          ))}
        </div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSearchOpen(false)} style={{ marginTop: 12 }}>
          <X size={15} /> {t('إغلاق', 'Close')}
        </button>
      </div>
    </div>
  );
}
