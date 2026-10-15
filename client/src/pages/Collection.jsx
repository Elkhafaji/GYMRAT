/* GYMRAT — Single collection page (hero + left filters + product grid + banner) */
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Layers, Play, Wind, Scissors, Feather, ShieldCheck, Dumbbell, Sparkles, Zap, Sun, Droplets, Feather as Feather2 } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import api from '../lib/api.js';
import { banners, heroes } from '../data/assets.js';
import { ProductCard, LogoMark, CatIcon } from '../components/ui.jsx';
import FilterPanel, { FilterPromo } from '../components/FilterPanel.jsx';

const emptyFilters = { categories: [], size: '', color: '', maxPrice: 100, collections: [], tags: [] };

const HEROES = {
  core: { img: heroes.core, script: 'ESSENTIALS\nFOR EVERY DAY\nDISCIPLINE.' },
  performance: { img: heroes.performance, script: 'TRAIN\nPERFORM\nIMPROVE.' },
  'street-discipline': { img: heroes.street, script: 'STREET\nDISCIPLINE.' },
  limited: { img: banners.limited, script: 'LIMITED\nQUANTITIES.' },
};

const COPY = {
  core: (t) => ({
    eyebrow: 'CORE COLLECTION',
    title1: t('المجموعة الأساسية', 'Core Collection'),
    title2: '',
    sub: t('قطع أساسية بأناقة بسيطة وتصميم سادة تلائم حضر GYMRAT معك في كل خطوة.', 'Essential pieces with clean lines and simple cuts — GYMRAT basics with you at every step.'),
    cta: t('تسوق المجموعة', 'Shop Collection'),
    feats: [t('قطن 100%', '100% cotton'), t('خامات مريحة', 'Soft fabrics'), t('تصاميم سادة', 'Clean designs'), t('مثالي للاستخدام اليومي', 'Daily essential')],
    bannerTitle: 'MORE THAN JUST CLOTHES.',
    bannerSub: t('أكثر من مجرد ملابس', 'More than just clothes'),
    bannerCta: t('استكشف المجموعة', 'Explore Collection'),
  }),
  performance: (t) => ({
    eyebrow: 'PERFORMANCE COLLECTION',
    title1: t('مجموعة الأداء', 'Performance Collection'),
    title2: t('مصممة للحركة. مبنية للأداء.', 'Built for motion. Made to perform.'),
    sub: t('ملابس رياضية عالية الجودة، تمنح الأداء والراحة وتدعمك في كل تمرين تتخذه.', 'Premium sportswear delivering performance and comfort in every single workout.'),
    cta: t('تسوق الآن', 'Shop Now'),
    feats: [t('خامات عالية الأداء', 'Performance fabrics'), t('تصميم مريح', 'Comfortable fit'), t('كفاءة الحركة', 'Motion efficiency'), t('مناسب للتمرين', 'Training ready')],
    bannerTitle: 'TRAIN HARDER. FEEL BETTER.',
    bannerSub: t('أداء أقوى. كل يوم.', 'Stronger performance. Every day.'),
    bannerCta: t('استكشف المجموعة', 'Explore Collection'),
  }),
  'street-discipline': (t) => ({
    eyebrow: 'STREET DISCIPLINE COLLECTION',
    title1: t('مجموعة الشارع', 'Street Discipline'),
    title2: t('ستايل واسع .. هوية أقوى.', 'Wide style .. stronger identity.'),
    sub: t('قطع مريحة بستايل واسع، تصاميم جريئة، وتفاصيل دقيقة تناسبك في الشارع أو خارج صالة الجيم.', 'Relaxed pieces with bold attitude and precise details — on the street or outside the gym.'),
    cta: t('تسوق الآن', 'Shop Now'),
    feats: [t('قصة واسعة', 'Wide cuts'), t('طبعات جريئة', 'Bold prints'), t('خامات متينة', 'Durable fabrics'), t('خامات مريحة', 'Soft fabrics')],
    bannerTitle: 'FROM THE GYM TO THE STREETS.',
    bannerSub: t('من الجيم إلى الشارع', 'From the gym to the streets'),
    bannerCta: t('استكشف المجموعة', 'Explore Collection'),
  }),
  limited: (t) => ({
    eyebrow: '04 / LIMITED EDITION',
    title1: t('إصدارات محدودة', 'Limited Edition'),
    title2: '',
    sub: t('تصاميم خاصة بكل قطعة متوفرة. لا تتردد قبل نفاد الكمية.', 'Special drops with unique pieces. Do not wait before stock runs out.'),
    cta: t('استكشف المجموعة', 'Explore Collection'),
    feats: [t('كميات محدودة', 'Limited quantities'), t('طبعات حصرية', 'Exclusive prints'), t('ترقيم القطع', 'Numbered pieces'), t('لا تعيد', 'Never restocked')],
    bannerTitle: 'LIMITED QUANTITIES.',
    bannerSub: t('كميات محدودة', 'Limited quantities'),
    bannerCta: t('تسوق الآن', 'Shop Now'),
  }),
};

const PERF_BAR = (t) => [
  { icon: <Wind />, title: t('خامات عالية الأداء', 'Performance fabrics'), sub: t('صمدت للأداء', 'Engineered to perform') },
  { icon: <Scissors />, title: t('تصميم مريح', 'Comfort fit'), sub: t('يدعم الحركة والراحة', 'Supports motion & comfort') },
  { icon: <Feather />, title: t('كفاءة الحركة', 'Motion efficiency'), sub: t('تمنحك مرونة مطلقة', 'Total flexibility') },
  { icon: <Play />, title: t('مناسب للتمرين', 'Training ready'), sub: t('وأيضاً للنشاط اليومي', 'And daily activity too') },
];

export default function Collection() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, isAr } = useApp();
  const [collection, setCollection] = useState(null);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [applied, setApplied] = useState(emptyFilters);
  const [draft, setDraft] = useState(emptyFilters);
  const [sort, setSort] = useState('bestselling');

  useEffect(() => {
    api.collection(slug).then(({ collection }) => setCollection(collection)).catch(() => navigate('/collections'));
    api.categories().then(({ categories }) => setCategories(categories)).catch(() => {});
    api.collections().then(({ collections }) => setCollections(collections)).catch(() => {});
  }, [slug, navigate]);

  const copy = COPY[slug] ? COPY[slug](t) : COPY.core(t);
  const hero = HEROES[slug] || HEROES.core;
  const arrow = isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />;

  const products = useMemo(() => {
    if (!collection) return [];
    let list = [...(collection.products || [])];
    const f = applied;
    if (f.size) list = list.filter((p) => (p.variants || []).some((v) => v.size === f.size));
    if (f.color) list = list.filter((p) => (p.variants || []).some((v) => v.color === f.color));
    if (f.maxPrice) list = list.filter((p) => p.price <= f.maxPrice);
    if (f.tags.length) list = list.filter((p) => { const tags = (p.tags || '').split(','); return f.tags.every((tg) => tags.includes(tg)); });
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      default: list.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0) || b.reviewCount - a.reviewCount);
    }
    return list;
  }, [collection, applied, sort]);

  if (!collection) return <div className="container" style={{ padding: 60 }}>{t('جارٍ التحميل...', 'Loading...')}</div>;

  return (
    <>
      <section className="page-hero">
        <img className="ph-bg" src={hero.img} alt="" />
        <div className="ph-script">{hero.script.split('\n').map((l, i) => <React.Fragment key={i}>{l}<br /></React.Fragment>)}</div>
        <div className="ph-mark"><LogoMark size={44} /></div>
        <div className="container ph-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">{t('الرئيسية', 'Home')}</Link> <span>‹</span>
            <Link to="/collections">{t('المجموعات', 'Collections')}</Link> <span>‹</span>
            <span>{isAr ? collection.nameAr : collection.name}</span>
          </nav>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="ph-title">
            {copy.title1}
            {copy.title2 && <><br /><span className="t2">{copy.title2}</span></>}
          </h1>
          <p className="ph-sub">{copy.sub}</p>
          <div className="hero-actions" style={{ marginTop: 18 }}>
            <a href="#products" className="btn btn-lime">{copy.cta} {arrow}</a>
          </div>
          {slug === 'performance' && (
            <div className="hero-points">
              {PERF_BAR(t).map((p) => <span className="hero-point" key={p.title}>{p.icon} {p.title}</span>)}
            </div>
          )}
          {slug === 'core' && (
            <div className="hero-points">
              {copy.feats.map((f) => <span className="hero-point" key={f}><ShieldCheck /> {f}</span>)}
            </div>
          )}
        </div>
      </section>

      <div className="container" id="products">
        <div className="shop-layout" style={{ paddingTop: 24 }}>
          <div className="filters">
            <FilterPanel
              categories={categories}
              collections={collections}
              value={draft}
              onChange={setDraft}
              priceMax={100}
              showCollections={false}
              onApply={() => setApplied(draft)}
              onReset={() => { setDraft(emptyFilters); setApplied(emptyFilters); }}
            />
            <FilterPromo
              image={banners.qualityDetail}
              title="QUALITY IN EVERY DETAIL."
              sub={slug === 'performance' ? t('أداء في كل تفصيلة', 'Performance in every detail') : t('الجودة في كل تفصيلة', 'Quality in every detail')}
              cta={t('اكتشف المزيد', 'Discover more')}
            />
          </div>

          <div>
            <div className="shop-toolbar">
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span className="shop-count">{t('ترتيب حسب', 'Sort by')}</span>
                <select className="select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
                  <option value="bestselling">{t('الأكثر مبيعاً', 'Best selling')}</option>
                  <option value="price-asc">{t('السعر: من الأقل', 'Price: low to high')}</option>
                  <option value="price-desc">{t('السعر: من الأعلى', 'Price: high to low')}</option>
                  <option value="rating">{t('الأعلى تقييماً', 'Top rated')}</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <span className="shop-count">{products.length} {t('منتج', 'items')}</span>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="empty-state panel panel-pad">
                <Layers size={36} />
                <h3 style={{ margin: '12px 0 6px' }}>{t('لا توجد منتجات مطابقة', 'No matching products')}</h3>
                <p className="muted">{t('جرّب تغيير الفلاتر', 'Try adjusting the filters')}</p>
              </div>
            ) : (
              <div className="products-grid">
                {products.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>

        {/* collection banner */}
        <section className="brand-banner" style={{ marginBottom: 30 }}>
          <div className="bb-body">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 style={{ fontSize: 34, fontFamily: 'var(--font-display)', letterSpacing: '0.04em', fontWeight: 400 }}>
              {copy.bannerTitle}<br /><span className="lime">{copy.bannerSub}</span>
            </h2>
            <div className="cb-feats" style={{ marginTop: 16 }}>
              {slug === 'performance' ? (
                <>
                  <span className="cb-feat"><Scissors size={14} /> {t('تفصيل دقيقة — تصميم مدروس لكل حركة', 'Precise tailoring for every move')}</span>
                  <span className="cb-feat"><Wind size={14} /> {t('خامات فائقة — تمنحك تهوية أقوى', 'Superior fabrics, max airflow')}</span>
                </>
              ) : slug === 'core' ? (
                <>
                  <span className="cb-feat"><Feather size={14} /> {t('نقاء في الملمس', 'Pure to the touch')}</span>
                  <span className="cb-feat"><Sparkles size={14} /> {t('خامة مريحة وناعمة', 'Soft comfortable fabric')}</span>
                  <span className="cb-feat"><Scissors size={14} /> {t('تصميم عملي', 'Functional design')}</span>
                  <span className="cb-feat"><Dumbbell size={14} /> {t('استخدامات متعددة', 'Multi-use')}</span>
                </>
              ) : (
                <>
                  <span className="cb-feat"><ShieldCheck size={14} /> {t('خامات مريحة — تأثير كبير', 'Soft fabrics, big impact')}</span>
                  <span className="cb-feat"><Zap size={14} /> {t('تصاميم بستايل', 'Stylish designs')}</span>
                </>
              )}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link to="/collections" className="btn btn-lime">{copy.bannerCta} {arrow}</Link>
            </div>
          </div>
          <div className="bb-img"><img src={slug === 'performance' ? banners.fabric2 : slug === 'street-discipline' ? banners.gymToStreets : banners.moreThanClothes} alt="" loading="lazy" /></div>
        </section>

        {/* explore categories (performance + core) */}
        <div className="promo-trio" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {[
            { slug: 'tshirts', ar: 'تشيرتات', en: 'T-Shirts', icon: 'shirt', img: heroes.tshirts },
            { slug: 'hoodies', ar: 'الهوديز', en: 'Hoodies', icon: 'hoodie', img: banners.fabric2 },
            { slug: 'shorts', ar: 'الشورتات', en: 'Shorts', icon: 'shorts', img: heroes.performance },
            { slug: 'pants', ar: 'البنطالونات', en: 'Pants', icon: 'pants', img: heroes.homeSlide1 },
            { slug: 'caps,bags,accessories', ar: 'الإكسسوارات', en: 'Accessories', icon: 'cap', img: banners.ig[1] },
          ].map((c) => (
            <Link key={c.slug} to={`/products?category=${c.slug}`} className="promo-card" style={{ flexDirection: 'row' }}>
              <img src={c.img} alt="" loading="lazy" style={{ width: '38%', height: 130 }} />
              <div className="pr-body" style={{ padding: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CatIcon name={c.icon} size={20} />
                  <strong>{isAr ? c.ar : c.en}</strong>
                </div>
                <span className="link-arrow" style={{ fontSize: 12 }}>{t('استكشف', 'Explore')} {arrow}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
