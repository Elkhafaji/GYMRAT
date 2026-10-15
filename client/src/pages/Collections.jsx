/* GYMRAT — Collections index (4 collection blocks with product strips) */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Star, ShieldCheck, Layers, Flame, Watch, Wind, Scissors, Package } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import api from '../lib/api.js';
import { banners, heroes } from '../data/assets.js';
import { ProductCard, LogoMark, CatIcon } from '../components/ui.jsx';

const SCRIPTS = {
  core: 'ESSENTIALS\nFOR EVERY DAY\nDISCIPLINE.',
  performance: 'BUILT\nFOR\nMOVEMENT',
  'street-discipline': 'NOT JUST\nGYM WEAR.',
  limited: 'LIMITED\nQUANTITIES.',
};

const FEATS = {
  core: (t) => [t('قطن 100%', '100% cotton'), t('خامات مريحة', 'Soft fabrics'), t('تصاميم سادة', 'Clean designs'), t('مثالي للاستخدام اليومي', 'Perfect for daily use')],
  performance: (t) => [t('تقنية Dry-FIT', 'Dry-FIT tech'), t('تهوية عالية', 'High breathability'), t('قابل للتمدد', '4-way stretch'), t('خفيف الوزن', 'Lightweight')],
  'street-discipline': (t) => [t('قصة واسعة', 'Wide cuts'), t('طبعات جريئة', 'Bold prints'), t('خامات متينة', 'Durable fabrics'), t('روح الشارع', 'Street spirit')],
  limited: (t) => [t('كميات محدودة', 'Limited quantities'), t('طبعات حصرية', 'Exclusive prints'), t('ترقيم القطع', 'Numbered pieces'), t('لا تعيد', 'Never restocked')],
};

export default function Collections() {
  const { t, isAr } = useApp();
  const [collections, setCollections] = useState([]);
  const arrow = isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />;

  useEffect(() => {
    api.collections().then(({ collections }) => setCollections(collections)).catch(() => {});
  }, []);

  const heroImg = { core: heroes.core, performance: heroes.performance, 'street-discipline': heroes.street, limited: banners.limited };

  return (
    <>
      <section className="page-hero" style={{ minHeight: 320 }}>
        <img className="ph-bg" src={banners.collectionsHero} alt="" />
        <div className="ph-script">TRAIN<br />WEAR<br />REPEAT.</div>
        <div className="ph-mark"><LogoMark size={44} /></div>
        <div className="container ph-content">
          <p className="eyebrow">GYMRAT COLLECTIONS</p>
          <h1 className="ph-title">
            {t('المجموعات', 'Collections')} <span className="display" style={{ fontSize: '0.9em' }}>COLLECTIONS</span>
          </h1>
          <p className="ph-sub">{t('كل مجموعة .. قصة مختلفة', 'Every collection .. a different story')}</p>
          <p className="ph-sub" style={{ marginTop: 6 }}>{t('قطع مصممة بعناية لتجد ما يناسب أسلوبك وشخصيتك.', 'Pieces crafted with care to fit your style and identity.')}</p>
          <div className="hero-actions" style={{ marginTop: 18 }}>
            <a href="#core" className="btn btn-outline">{t('استكشف كل المجموعات', 'Explore all collections')} {arrow}</a>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="collection-tabs">
          <a className="cat-chip-card active" href="#top"><Layers size={30} /><div><strong>{t('جميع المجموعات', 'All Collections')}</strong></div></a>
          <a className="cat-chip-card" href="#core"><CatIcon name="shirt" /><div><strong>CORE</strong><span>{t('الأساسية', 'Essentials')}</span></div></a>
          <a className="cat-chip-card" href="#performance"><CatIcon name="hoodie" /><div><strong>PERFORMANCE</strong><span>{t('الأداء', 'Performance')}</span></div></a>
          <a className="cat-chip-card" href="#street-discipline"><CatIcon name="pants" /><div><strong>STREET DISCIPLINE</strong><span>{t('الشارع', 'Street')}</span></div></a>
          <a className="cat-chip-card" href="#limited"><Flame size={30} /><div><strong>LIMITED</strong><span>{t('محدودة النسخة', 'Limited Edition')}</span></div></a>
        </div>

        {collections.map((col) => (
          <section className="collection-block" id={col.slug} key={col.slug}>
            <div className="collection-block-head">
              <div className="cb-copy">
                <p className="eyebrow">{isAr ? col.eyebrowAr : col.eyebrow}</p>
                <h2>{isAr ? col.nameAr : col.name}</h2>
                <p>{isAr ? col.descriptionAr : col.description}</p>
                <div className="cb-feats">
                  {(FEATS[col.slug] ? FEATS[col.slug](t) : []).map((f) => (
                    <span className="cb-feat" key={f}><Star size={14} /> {f}</span>
                  ))}
                </div>
                <Link to={`/collections/${col.slug}`} className="btn btn-outline">
                  {col.slug === 'limited' ? t('استكشف المجموعة', 'Explore collection') : t('تسوق المجموعة', 'Shop collection')} {arrow}
                </Link>
              </div>
              <div className="cb-visual">
                <img src={heroImg[col.slug] || col.image} alt={col.name} loading="lazy" />
                <div className="cb-script">{SCRIPTS[col.slug]}</div>
              </div>
            </div>
            <div className="products-strip">
              {(col.products || []).map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            <div style={{ textAlign: 'end', marginTop: 16 }}>
              <Link to={`/collections/${col.slug}`} className="link-arrow">{t('عرض الكل', 'View all')} →</Link>
            </div>
          </section>
        ))}

        <div className="home-features" style={{ border: '1px solid var(--line)', borderRadius: 14, margin: '30px 0' }}>
          <div className="container" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="home-feat"><Package /><div><strong>{t('شحن سريع', 'Fast shipping')}</strong><span>{t('إلى جميع المحافظات', 'To all governorates')}</span></div></div>
            <div className="home-feat"><ShieldCheck /><div><strong>{t('دفع آمن', 'Secure payment')}</strong><span>{t('يحفظ جميع طرق الدفع', 'All payment methods')}</span></div></div>
            <div className="home-feat"><Wind /><div><strong>{t('خامات مريحة', 'Soft fabrics')}</strong><span>{t('مصنوعة لتدوم', 'Made to last')}</span></div></div>
            <div className="home-feat"><Flame /><div><strong>{t('جودة مضمونة', 'Guaranteed quality')}</strong><span>{t('في كل قطعة', 'In every piece')}</span></div></div>
          </div>
        </div>
      </div>
    </>
  );
}
