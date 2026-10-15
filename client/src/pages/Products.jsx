/* GYMRAT — Products listing (category chips + right filters for category pages, general shop) */
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { LayoutGrid, Rows3, Star, ShieldCheck, Feather, Dumbbell, Sparkles, ArrowLeft, ArrowRight, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import api from '../lib/api.js';
import { heroes, banners } from '../data/assets.js';
import { ProductCard, CatIcon, LogoMark, FeatureStrip } from '../components/ui.jsx';
import FilterPanel, { FilterPromo } from '../components/FilterPanel.jsx';

const emptyFilters = { categories: [], size: '', color: '', maxPrice: 60, collections: [], tags: [] };

export default function Products() {
  const { t, isAr } = useApp();
  const [params, setParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [all, setAll] = useState([]);
  const [sort, setSort] = useState('bestselling');
  const [view, setView] = useState('grid');
  const [applied, setApplied] = useState(emptyFilters);
  const [draft, setDraft] = useState(emptyFilters);
  const [loading, setLoading] = useState(true);

  const activeCat = params.get('category') || '';
  const bestOnly = params.get('bestSeller') === '1';

  useEffect(() => {
    api.categories().then(({ categories }) => setCategories(categories)).catch(() => {});
    api.collections().then(({ collections }) => setCollections(collections)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const q = {};
    if (activeCat) q.category = activeCat;
    if (bestOnly) q.bestSeller = '1';
    api.products(q).then(({ products }) => { setAll(products); setLoading(false); }).catch(() => setLoading(false));
    setDraft((d) => ({ ...d, categories: activeCat ? activeCat.split(',') : [] }));
    setApplied((d) => ({ ...d, categories: activeCat ? activeCat.split(',') : [] }));
  }, [activeCat, bestOnly]);

  const filtered = useMemo(() => {
    let list = [...all];
    const f = applied;
    if (f.size) list = list.filter((p) => (p.variants || []).some((v) => v.size === f.size));
    if (f.color) list = list.filter((p) => (p.variants || []).some((v) => v.color === f.color));
    if (f.maxPrice) list = list.filter((p) => p.price <= f.maxPrice);
    if (f.collections.length) list = list.filter((p) => (p.collections || []).some((c) => f.collections.includes(c.slug)));
    if (f.tags.length) {
      list = list.filter((p) => {
        const tags = (p.tags || '').split(',');
        return f.tags.every((tg) => tags.includes(tg));
      });
    }
    switch (sort) {
      case 'newest': list.sort((a, b) => (b.badge === 'new') - (a.badge === 'new') || b.id - a.id); break;
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      default: list.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0) || b.reviewCount - a.reviewCount);
    }
    return list;
  }, [all, applied, sort]);

  const catTitle = useMemo(() => {
    if (bestOnly) return t('الأكثر مبيعاً', 'Best Sellers');
    if (!activeCat) return t('جميع المنتجات', 'All Products');
    const first = activeCat.split(',')[0];
    const c = categories.find((x) => x.slug === first);
    if (!c) return t('جميع المنتجات', 'All Products');
    if (activeCat.includes('tshirts')) return t('تشيرتات الجيم والستريت وبر', 'Gym & Street T-Shirts');
    return isAr ? c.nameAr : c.name;
  }, [activeCat, bestOnly, categories, isAr, t]);

  const heroPts = [
    { icon: <Feather />, label: t('خامات تدوم', 'Fabrics that last') },
    { icon: <Dumbbell />, label: t('راحة في الحركة', 'Freedom of movement') },
    { icon: <Sparkles />, label: t('قماش مرن', 'Stretch fabric') },
    { icon: <ShieldCheck />, label: t('جودة تدوم', 'Quality that lasts') },
  ];

  const arrow = isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />;

  return (
    <>
      <section className="page-hero">
        <img className="ph-bg" src={heroes.tshirts} alt="" />
        <div className="ph-script">TRAIN<br />WEAR<br />REPEAT.</div>
        <div className="ph-mark"><LogoMark size={44} /></div>
        <div className="container ph-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">{t('الرئيسية', 'Home')}</Link> <span>‹</span> <span>{t('المنتجات', 'Products')}</span>
          </nav>
          <h1 className="ph-title">
            {bestOnly ? t('الأكثر مبيعاً', 'Best Sellers') : (
              activeCat.includes('tshirts') || !activeCat ? (<>{t('تشيرتات الجيم', 'Gym Tees')}<br /><span className="t2">{t('والستريت وبر', '& Street Wear')}</span></>) : catTitle
            )}
          </h1>
          <p className="ph-sub">{t('تصاميم مريحة. خامات عالية الجودة. ومناسبة للتمرين والحياة اليومية.', 'Comfortable cuts. Premium fabrics. Built for training and every day.')}</p>
          <div className="hero-points">
            {heroPts.map((p) => <span className="hero-point" key={p.label}>{p.icon} {p.label}</span>)}
          </div>
        </div>
      </section>

      <div className="container">
        {/* category chips */}
        <div className="cat-chips">
          {[
            { slug: 'tshirts', ar: 'تشيرتات', en: 'T-Shirts', icon: 'shirt' },
            { slug: 'hoodies', ar: 'هوديز', en: 'Hoodies', icon: 'hoodie' },
            { slug: 'pants', ar: 'بنطالون', en: 'Pants', icon: 'pants' },
            { slug: 'shorts', ar: 'شورتات', en: 'Shorts', icon: 'shorts' },
            { slug: 'caps,bags,accessories', ar: 'إكسسوارات', en: 'Accessories', icon: 'cap' },
          ].map((c) => {
            const active = activeCat === c.slug || (c.slug === 'caps,bags,accessories' && activeCat === 'accessories,caps,bags');
            const count = categories.filter((x) => c.slug.split(',').includes(x.slug)).reduce((s, x) => s + x.productCount, 0);
            return (
              <Link key={c.slug} to={`/products?category=${c.slug}`} className={`cat-chip-card ${active ? 'active' : ''}`}>
                <CatIcon name={c.icon} />
                <div>
                  <strong>{isAr ? c.ar : c.en}</strong>
                  <span>{count} {t('منتج', 'items')}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* results */}
        <div className="shop-layout filters-right" style={{ paddingTop: 10 }}>
          <div>
            <div className="results-head">
              <h2 className="section-title" style={{ fontSize: 22 }}>{bestOnly ? t('منتجات الأكثر مبيعاً', 'Best selling products') : (activeCat.includes('tshirts') ? t('جميع تشيرتات', 'All T-Shirts') : catTitle)}</h2>
              <p className="section-sub">{t('اكتشف أحدث التصاميم والمنتجات الأكثر مبيعاً', 'Discover the latest designs and best sellers')}</p>
            </div>
            <div className="shop-toolbar">
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span className="shop-count">{t('الترتيب', 'Sort by')}:</span>
                <select className="select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
                  <option value="bestselling">{t('الأكثر مبيعاً', 'Best selling')}</option>
                  <option value="newest">{t('الأحدث', 'Newest')}</option>
                  <option value="price-asc">{t('السعر: من الأقل', 'Price: low to high')}</option>
                  <option value="price-desc">{t('السعر: من الأعلى', 'Price: high to low')}</option>
                  <option value="rating">{t('الأعلى تقييماً', 'Top rated')}</option>
                </select>
              </div>
              <div className="view-toggle">
                <button type="button" className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} aria-label="Grid"><LayoutGrid size={17} /></button>
                <button type="button" className={view === 'compact' ? 'active' : ''} onClick={() => setView('compact')} aria-label="Compact"><Rows3 size={17} /></button>
              </div>
            </div>

            {loading ? (
              <p className="muted" style={{ padding: 30 }}>{t('جارٍ التحميل...', 'Loading...')}</p>
            ) : filtered.length === 0 ? (
              <div className="empty-state panel panel-pad">
                <Layers size={36} />
                <h3 style={{ margin: '12px 0 6px' }}>{t('لا توجد منتجات مطابقة', 'No matching products')}</h3>
                <p className="muted">{t('جرّب تغيير الفلاتر', 'Try adjusting the filters')}</p>
              </div>
            ) : (
              <div className={`products-grid ${view}`}>
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>

          <div className="filters">
            <FilterPanel
              categories={categories}
              collections={collections}
              value={draft}
              onChange={setDraft}
              priceMax={60}
              onApply={() => setApplied(draft)}
              onReset={() => { setDraft(emptyFilters); setApplied(emptyFilters); }}
            />
            <FilterPromo
              image={banners.qualityDetail}
              title="QUALITY IN EVERY DETAIL."
              sub={t('الجودة في كل تفصيلة', 'Quality in every detail')}
              cta={t('اكتشف المزيد', 'Discover more')}
            />
          </div>
        </div>

        {/* promo trio */}
        <div className="promo-trio">
          <div className="promo-card">
            <img src={banners.fabric1} alt="" loading="lazy" />
            <div className="pr-body">
              <h3>{t('خامات عالية الجودة', 'Premium Fabrics')}</h3>
              <p>{t('قماش فاخر. قوي. ومتين.', 'Luxurious fabric. Strong. Durable.')}</p>
              <Link to="/about" className="btn btn-dark btn-sm">{t('اعرف المزيد', 'Learn more')}</Link>
            </div>
          </div>
          <div className="promo-card">
            <img src={heroes.performance} alt="" loading="lazy" />
            <div className="pr-body">
              <h3>{t('مصمم للحركة', 'Built for Movement')}</h3>
              <p>{t('راحة كاملة وحرية في التمرين', 'Full comfort and freedom in training')}</p>
              <Link to="/collections/performance" className="btn btn-dark btn-sm">{t('اكتشف التصاميم', 'Discover designs')}</Link>
            </div>
          </div>
          <div className="promo-card">
            <img src={heroes.street} alt="" loading="lazy" />
            <div className="pr-body">
              <h3>{t('من الجيم للشارع', 'Gym to Street')}</h3>
              <p>{t('ستايل وأداء. في كل مكان.', 'Style and performance. Everywhere.')}</p>
              <Link to="/collections/street-discipline" className="btn btn-dark btn-sm">{t('تسوق الآن', 'Shop now')} {arrow}</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
