/* GYMRAT — Home page (matches home screenshot: hero slider, features, categories, best sellers, brand banner, #GYMRAT) */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, ChevronLeft, Headphones, ShieldCheck, Truck, RefreshCw, Star,
  ArrowLeft, ArrowRight, Instagram,
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import api from '../lib/api.js';
import { banners, categories as catImgs, heroes, brand } from '../data/assets.js';
import { ProductCard, CatIcon, LogoMark } from '../components/ui.jsx';

const SLIDES = (t) => [
  {
    img: heroes.homeSlide1,
    eyebrow: t('ملابس الجيم والستريت وير', 'Gym & street wear'),
    l1: t('مصممة للحركة.', 'Built for motion.'),
    l2: t('جاهزة لحياتك.', 'Ready for your life.'),
    sub: t('قطع تجمع بين الأداء والأناقة والأسلوب العصري لكل من يختار التميز والانضباط', 'Pieces that blend performance, style and a modern cut for those who choose excellence and discipline.'),
  },
  {
    img: heroes.homeSlide2,
    eyebrow: t('أداء في كل تكرار', 'Performance in every rep'),
    l1: t('قوة في كل تفصيل.', 'Strength in detail.'),
    l2: t('راحة بلا حدود.', 'Comfort without limits.'),
    sub: t('خامات ديناميكية تتحرك معك وتمتص العرق لتبقيك خفيفاً من أول مجموعة إلى آخرها', 'Dynamic fabrics that move with you and wick sweat — light from the first set to the last.'),
  },
  {
    img: heroes.homeSlide3,
    eyebrow: t('ستريت ديسципلين', 'Street discipline'),
    l1: t('هوية أقوى.', 'A stronger identity.'),
    l2: t('ستايل يفرض الاحترام.', 'Style that earns respect.'),
    sub: t('قطع الشارع بروح الجيم — أوفرسايز، جرافيك، وتفاصيل تصنع الفرق', 'Street pieces with a gym soul — oversized cuts, graphics, and details that make the difference.'),
  },
];

const CATS = (t) => [
  { slug: 'hoodies', ar: 'هوديز', en: 'Hoodies', icon: 'hoodie', img: catImgs.hoodies },
  { slug: 'tshirts', ar: 'تشيرتات', en: 'T-Shirts', icon: 'shirt', img: catImgs.tshirts },
  { slug: 'pants', ar: 'بنطالونات', en: 'Pants', icon: 'pants', img: catImgs.pants },
  { slug: 'shorts', ar: 'شورتات', en: 'Shorts', icon: 'shorts', img: catImgs.shorts },
  { slug: 'accessories,caps,bags', ar: 'إكسسوارات', en: 'Accessories', icon: 'cap', img: catImgs.accessories },
];

export default function Home() {
  const { t, isAr } = useApp();
  const [slide, setSlide] = useState(0);
  const [best, setBest] = useState([]);
  const [counts, setCounts] = useState({});
  const slides = SLIDES(t);
  const cats = CATS(t);

  useEffect(() => {
    api.products({ bestSeller: '1', limit: 5 }).then(({ products }) => setBest(products)).catch(() => {});
    api.categories().then(({ categories }) => {
      const map = {};
      for (const c of categories) map[c.slug] = c.productCount;
      map['accessories,caps,bags'] = (map.accessories || 0) + (map.caps || 0) + (map.bags || 0);
      setCounts(map);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  const features = [
    { icon: <Headphones />, title: t('دعم عملاء مميزة', 'Premium Support'), sub: t('متاحون لمساعدتك 7/24', 'Here for you 24/7') },
    { icon: <ShieldCheck />, title: t('دفع آمن', 'Secure Payment'), sub: t('يحفظ جميع طرق الدفع', 'All payment methods') },
    { icon: <Truck />, title: t('شحن سريع', 'Fast Shipping'), sub: t('إلى جميع المحافظات', 'To all governorates') },
    { icon: <RefreshCw />, title: t('إرجاع واستبدال', 'Returns & Exchange'), sub: t('خلال 14 يوم', 'Within 14 days') },
    { icon: <Star />, title: t('جودة مضمونة', 'Guaranteed Quality'), sub: t('في كل قطعة', 'In every piece') },
  ];

  const arrow = isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />;

  return (
    <>
      {/* HERO SLIDER */}
      <section className="hero" aria-label="Featured">
        {slides.map((s, i) => (
          <div key={i} className={`hero-slide ${i === slide ? 'active' : ''}`}>
            <img src={s.img} alt="" />
          </div>
        ))}
        <div className="hero-script">TRAIN<br />WEAR<br />REPEAT.</div>
        <div className="hero-mark"><LogoMark size={54} /></div>
        <div className="hero-content">
          <p className="hero-eyebrow">{slides[slide].eyebrow}</p>
          <h1 className="hero-title">
            {slides[slide].l1}<br />
            <span className="line2">{slides[slide].l2}</span>
          </h1>
          <p className="hero-sub">{slides[slide].sub}</p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-lime">{t('تسوق الآن', 'Shop Now')} {arrow}</Link>
            <Link to="/collections" className="btn btn-outline">{t('استكشف المجموعات', 'Explore Collections')}</Link>
          </div>
        </div>
        <div className="hero-nav">
          <button type="button" onClick={() => setSlide((slide + 1) % slides.length)} aria-label="Next"><ChevronLeft size={15} /></button>
          <span>0{slide + 1} / 0{slides.length}</span>
          <button type="button" onClick={() => setSlide((slide - 1 + slides.length) % slides.length)} aria-label="Prev"><ChevronRight size={15} /></button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="home-features">
        <div className="container">
          {features.map((f) => (
            <div className="home-feat" key={f.title}>
              {f.icon}
              <div><strong>{f.title}</strong><span>{f.sub}</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">{t('تسوق حسب الفئة', 'Shop by Category')}</h2>
            <Link to="/products" className="link-arrow">{t('عرض كل الفئات', 'View all categories')} →</Link>
          </div>
          <div className="grid-5">
            {cats.map((c) => (
              <Link key={c.slug} to={`/products?category=${c.slug}`} className="cat-card">
                <img src={c.img} alt={isAr ? c.ar : c.en} loading="lazy" />
                <div className="cc-body">
                  <div className="cc-left">
                    <CatIcon name={c.icon} />
                    <div>
                      <strong>{isAr ? c.ar : c.en}</strong>
                      <span>{counts[c.slug] || 0} {t('منتج', 'items')}</span>
                    </div>
                  </div>
                  <ArrowLeft size={16} style={{ color: 'var(--lime)' }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">{t('الأكثر مبيعاً', 'Best Sellers')}</h2>
              <p className="section-sub">{t('الأفضل التي اخترناها لك', 'Our top picks for you')}</p>
            </div>
            <Link to="/products?bestSeller=1" className="link-arrow">{t('عرض الكل', 'View all')} →</Link>
          </div>
          <div className="grid-5">
            {best.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* BRAND BANNER */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="brand-banner">
            <div className="bb-img"><img src={banners.moreThanClothes} alt="GYMRAT story" loading="lazy" /></div>
            <div className="bb-body">
              <span className="script" style={{ fontSize: 15, marginBottom: 10 }}>GYMRAT</span>
              <h2>
                {t('أكثر من مجرد ملابس..', 'More than clothes.')}
                <br /><span className="lime">{t('هنا أسلوب حياة.', 'This is a lifestyle.')}</span>
              </h2>
              <p>{t('من الجيم إلى الشارع. هنا يبدأ رحلتك نحو شخصية أفضل من خلال تجربة ملابس تصنع الفرق.', 'From the gym to the streets. Your journey to a stronger self starts with pieces that make the difference.')}</p>
              <Link to="/about" className="btn btn-outline" style={{ alignSelf: 'flex-start' }}>{t('اكتشف قصتنا', 'Discover our story')} {arrow}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="ig-strip">
            <div className="ig-title">
              <strong>#GYMRAT</strong>
              <span className="muted small">{t('العرض إلى مجتمعنا', 'Join our community')}</span>
            </div>
            {banners.ig.map((src, i) => (
              <a key={i} className="ig-tile" href="https://instagram.com/gymrat" target="_blank" rel="noreferrer">
                <img src={src} alt={`GYMRAT community ${i + 1}`} loading="lazy" />
              </a>
            ))}
            <div className="ig-follow">
              <Instagram size={22} style={{ color: 'var(--lime)' }} />
              <strong>{t('تابعنا على إنستجرام', 'Follow us on Instagram')}</strong>
              <span className="muted small">{t('تابع رحلتنا وشاركنا لحظاتك باستخدام الوسم', 'Share your journey with the hashtag')} #GYMRAT</span>
              <a className="btn btn-dark btn-sm" href="https://instagram.com/gymrat" target="_blank" rel="noreferrer">@gymrat</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
