/* GYMRAT — Product details (gallery, sizes, colors, tabs, related) */
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Star, Heart, ShoppingBag, RefreshCw, ShieldCheck, Truck, ArrowLeft, ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import api from '../lib/api.js';
import { money, discountOf, colorDotsOf, sizesOf } from '../lib/format.js';
import { ProductCard, QtyStepper } from '../components/ui.jsx';
import { banners } from '../data/assets.js';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, isAr, addToCart, toggleWishlist, wishlist, showToast } = useApp();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('desc');

  useEffect(() => {
    setProduct(null);
    setImgIdx(0);
    setQty(1);
    setTab('desc');
    api.product(slug).then(({ product, related }) => {
      setProduct(product);
      setRelated(related);
      const sizes = sizesOf(product);
      const colors = colorDotsOf(product);
      setSize(sizes.includes('M') ? 'M' : sizes[0]);
      setColor(colors[0].color);
    }).catch(() => navigate('/products'));
  }, [slug, navigate]);

  if (!product) return <div className="container" style={{ padding: 60 }}>{t('جارٍ التحميل...', 'Loading...')}</div>;

  const images = product.images?.length ? product.images : [{ url: product.image, alt: product.name }];
  const dots = colorDotsOf(product);
  const sizes = sizesOf(product);
  const disc = discountOf(product);
  const wishlisted = wishlist.includes(product.id);
  const arrow = isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />;

  const add = async () => {
    await addToCart(product, { size, color, quantity: qty });
    showToast(t('تمت الإضافة إلى السلة', 'Added to cart'));
  };

  return (
    <div className="container">
      <nav className="breadcrumb" style={{ paddingTop: 22 }} aria-label="Breadcrumb">
        <Link to="/">{t('الرئيسية', 'Home')}</Link> <span>‹</span>
        <Link to="/products">{t('المنتجات', 'Products')}</Link> <span>‹</span>
        <Link to={`/products?category=${product.category?.slug}`}>{isAr ? product.category?.nameAr : product.category?.name}</Link> <span>‹</span>
        <span>{product.name}</span>
      </nav>

      <div className="pd-layout">
        <div className="pd-gallery">
          <div className="pd-thumbs">
            {images.map((im, i) => (
              <button key={i} type="button" className={i === imgIdx ? 'active' : ''} onClick={() => setImgIdx(i)} aria-label={`View ${i + 1}`}>
                <img src={im.url} alt={im.alt} />
              </button>
            ))}
          </div>
          <div className="pd-main-img">
            <img src={images[imgIdx].url} alt={images[imgIdx].alt} />
          </div>
        </div>

        <div className="pd-info">
          <div className="pd-badges">
            {(product.badge === 'bestseller') && <span className="badge badge-lime">{t('الأكثر مبيعاً', 'Best Seller')}</span>}
            {(product.badge === 'new') && <span className="badge badge-outline">{t('جديد', 'New')}</span>}
            {disc > 0 && <span className="badge badge-dark">{disc}% OFF</span>}
          </div>
          <h1>{product.name}</h1>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', margin: '8px 0 2px' }}>
            <span className="rating"><Star /> {product.rating.toFixed(1)} ({t('تقييمات', 'reviews')} {product.reviewCount})</span>
          </div>
          <div className="pd-price">
            <span className="now">{money(product.price)}</span>
            {disc > 0 && <s>{money(product.compareAtPrice)}</s>}
            {disc > 0 && <span className="badge badge-sale">-{disc}%</span>}
          </div>
          <p className="pd-desc">{isAr ? product.descriptionAr : product.description}</p>

          <div className="pd-row">
            <div className="pd-label">{t('اللون', 'Color')}: <span className="val">{color}</span></div>
            <div className="filter-colors">
              {dots.map((d) => (
                <button
                  key={d.color}
                  type="button"
                  className={`swatch ${color === d.color ? 'active' : ''}`}
                  style={{ background: d.hex }}
                  title={d.color}
                  aria-label={d.color}
                  onClick={() => setColor(d.color)}
                />
              ))}
            </div>
          </div>

          <div className="pd-row">
            <div className="pd-label">{t('المقاس', 'Size')}: <span className="val">{size}</span></div>
            <div className="filter-sizes">
              {sizes.map((s) => (
                <button key={s} type="button" className={`size-chip ${size === s ? 'active' : ''}`} onClick={() => setSize(s)}>
                  {s === 'ONE SIZE' ? t('مقاس واحد', 'One Size') : s}
                </button>
              ))}
            </div>
          </div>

          <div className="pd-row" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="pd-label" style={{ margin: 0 }}>{t('الكمية', 'Quantity')}</div>
            <QtyStepper value={qty} onChange={(q) => setQty(Math.max(1, q))} min={1} />
          </div>

          <div className="pd-actions">
            <button type="button" className="btn btn-lime" onClick={add}>
              <ShoppingBag size={18} /> {t('أضف إلى السلة', 'Add to Cart')} {arrow}
            </button>
            <button
              type="button"
              className={`pd-fav ${wishlisted ? 'active' : ''}`}
              aria-label="Wishlist"
              onClick={async () => {
                await toggleWishlist(product.id);
                showToast(wishlisted ? t('أُزيل من المفضلة', 'Removed from wishlist') : t('أُضيف إلى المفضلة', 'Added to wishlist'));
              }}
            >
              <Heart />
            </button>
          </div>

          <div className="pd-trust">
            <div className="trust-item"><Truck /> {t('شحن مجاني للطلبات فوق $50', 'Free shipping over $50')}</div>
            <div className="trust-item"><ShieldCheck /> {t('دفع آمن', 'Secure payment')}</div>
            <div className="trust-item"><RefreshCw /> {t('إرجاع واستبدال خلال 14 يوم', '14-day returns')}</div>
          </div>
        </div>
      </div>

      <div className="pd-tabs">
        <div className="pd-tab-head">
          <button type="button" className={tab === 'desc' ? 'active' : ''} onClick={() => setTab('desc')}>{t('الوصف', 'Description')}</button>
          <button type="button" className={tab === 'size' ? 'active' : ''} onClick={() => setTab('size')}>{t('المقاس', 'Sizing')}</button>
          <button type="button" className={tab === 'care' ? 'active' : ''} onClick={() => setTab('care')}>{t('العناية', 'Care')}</button>
        </div>
        <div className="pd-tab-body">
          <div>
            {tab === 'desc' && (
              <>
                <p className="muted" style={{ marginBottom: 14 }}>{isAr ? product.descriptionAr : product.description}</p>
                <ul>
                  <li>{isAr ? 'خامات فائقة النعومة' : 'Ultra-soft premium fabric'}{product.material ? ` — ${isAr ? product.materialAr : product.material}` : ''}</li>
                  <li>{t('قصة عصرية تناسب جميع الأجسام', 'Modern cut that suits every body')}</li>
                  <li>{t('مطاط مقاوم للتجعد', 'Wrinkle-resistant elastic')}</li>
                  <li>{t('مرونة في الحركة', 'Freedom of movement')}</li>
                  <li>{t('مناسب للتمرين والاستخدام اليومي', 'Perfect for training and daily wear')}</li>
                </ul>
              </>
            )}
            {tab === 'size' && (
              <table className="table">
                <thead><tr><th>{t('المقاس', 'Size')}</th><th>{t('الصدر (سم)', 'Chest (cm)')}</th><th>{t('الطول (سم)', 'Length (cm)')}</th></tr></thead>
                <tbody>
                  <tr><td>S</td><td>96</td><td>68</td></tr>
                  <tr><td>M</td><td>102</td><td>70</td></tr>
                  <tr><td>L</td><td>108</td><td>72</td></tr>
                  <tr><td>XL</td><td>114</td><td>74</td></tr>
                  <tr><td>XXL</td><td>120</td><td>76</td></tr>
                </tbody>
              </table>
            )}
            {tab === 'care' && (
              <ul>
                <li>{t('غسيل آلي على 30 درجة', 'Machine wash at 30°')}</li>
                <li>{t('لا تستخدم المبيض', 'Do not bleach')}</li>
                <li>{t('تجفيف بالمعلقة في الظل', 'Hang dry in shade')}</li>
                <li>{t('كي على درجة منخفضة', 'Iron on low heat')}</li>
                <li>{t('لا تجفف آلياً', 'Do not tumble dry')}</li>
              </ul>
            )}
          </div>
          <div className="pd-fabric"><img src={banners.fabric1} alt="Fabric detail" loading="lazy" /></div>
        </div>
      </div>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title" style={{ fontSize: 22 }}>{t('منتجات قد تعجبك', 'You may also like')}</h2>
        </div>
        <div className="grid-4">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
