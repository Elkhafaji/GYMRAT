/* GYMRAT — Cart page */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, ArrowRight, Headphones, ShieldCheck, Truck, Package, Tag, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { money, totalsOf, SHIPPING_FREE_OVER, COUPONS } from '../lib/format.js';
import { banners } from '../data/assets.js';
import { ProductCard, QtyStepper, LogoMark, EmptyState } from '../components/ui.jsx';
import api from '../lib/api.js';

export default function Cart() {
  const { t, isAr, cart, updateQty, removeLine, clearCart, showToast, user } = useApp();
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [suggest, setSuggest] = useState([]);
  const navigate = useNavigate();
  const { subtotal, shipping, discount, total } = totalsOf(cart, appliedCoupon);
  const arrow = isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />;

  useEffect(() => {
    let on = true;
    api.products({ bestSeller: 1, limit: 4 })
      .then((d) => { if (on) setSuggest(d.products || []); })
      .catch(() => {});
    return () => { on = false; };
  }, []);

  const applyCoupon = () => {
    if (COUPONS[coupon.toUpperCase()]) {
      setAppliedCoupon(coupon.toUpperCase());
      showToast(t('تم تطبيق الكوبون', 'Coupon applied'));
    } else {
      showToast(t('كوبون غير صالح', 'Invalid coupon'), 'err');
    }
  };

  return (
    <>
      <section className="page-hero" style={{ minHeight: 220 }}>
        <img className="ph-bg" src={banners.cartHero} alt="" />
        <div className="ph-script">GYMRAT<br />TRAIN JUST.<br />CLOTHES.</div>
        <div className="ph-mark"><LogoMark size={38} /></div>
        <div className="container ph-content" style={{ padding: '36px 0' }}>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">{t('الرئيسية', 'Home')}</Link> <span>‹</span> <span>{t('سلة المشتريات', 'Shopping Cart')}</span>
          </nav>
          <h1 className="ph-title" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <ShoppingBag style={{ color: 'var(--lime)' }} /> {t('سلة المشتريات', 'Shopping Cart')}
          </h1>
          <p className="ph-sub">{t('راجع منتجاتك وقم بإتمام عملية الشراء بسهولة وأمان.', 'Review your items and checkout easily and securely.')}</p>
        </div>
      </section>

      <div className="container">
        {cart.length === 0 ? (
          <div style={{ padding: '40px 0' }}>
            <EmptyState
              title={t('سلتك فارغة', 'Your cart is empty')}
              sub={t('ابدأ التسوق وأضف منتجاتك المفضلة', 'Start shopping and add your favorite pieces')}
              action={<Link to="/products" className="btn btn-lime">{t('تسوق الآن', 'Shop now')} {arrow}</Link>}
            />
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              <div className="cart-head">
                <h3 style={{ fontSize: 18 }}>{t('المنتجات', 'Products')} ({cart.length})</h3>
                <button type="button" className="btn btn-ghost btn-sm" onClick={async () => { await clearCart(); showToast(t('تم حذف الكل', 'Cart cleared')); }}>
                  <Trash2 size={15} /> {t('حذف الكل', 'Clear all')}
                </button>
              </div>
              {cart.map((line, i) => (
                <div className="cart-line" key={`${line.productId}-${line.size}-${line.color}-${i}`}>
                  <Link to={`/products/${line.slug}`}><img src={line.image} alt={line.name} /></Link>
                  <div>
                    <h4>{line.name}</h4>
                    <div className="cart-meta">
                      {t('اللون', 'Color')}: {line.color} &nbsp;|&nbsp; {t('المقاس', 'Size')}: {line.size === 'ONE SIZE' ? t('مقاس واحد', 'One Size') : line.size}
                    </div>
                    <div className="pc-price" style={{ marginBottom: 10 }}>{money(line.price)}</div>
                    <QtyStepper value={line.quantity} min={0} onChange={(q) => updateQty(line, q)} />
                  </div>
                  <div>
                    <button type="button" className="icon-btn" aria-label={t('حذف', 'Remove')} onClick={() => removeLine(line)}><Trash2 size={17} /></button>
                    <div className="line-price" style={{ marginTop: 30 }}>{money(line.price * line.quantity)}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 18 }}>
                <Link to="/products" className="link-arrow">← {t('الاستمرار في التسوق', 'Continue shopping')}</Link>
              </div>
            </div>

            <aside className="order-summary">
              <h3 style={{ fontSize: 18, marginBottom: 12 }}>{t('ملخص الطلب', 'Order Summary')}</h3>
              <div className="sum-row"><span>{t('إجمالي المنتجات', 'Subtotal')} ({cart.length})</span><b>{money(subtotal)}</b></div>
              <div className="sum-row">
                <span>{t('الشحن', 'Shipping')}<br /><span className="small">{t(`مجاناً للطلباتأكثر من $${SHIPPING_FREE_OVER}`, `Free over $${SHIPPING_FREE_OVER}`)}</span></span>
                <b>{shipping === 0 ? t('مجاناً', 'Free') : money(shipping)}</b>
              </div>
              <div className="sum-row"><span>{t('خصم', 'Discount')}</span><b className="lime">-{money(discount)}</b></div>
              <div className="coupon-row" style={{ margin: '10px 0 6px' }}>
                <Tag size={17} style={{ color: 'var(--lime)' }} />
                <input className="input" placeholder={t('لديك كوبون خصم؟', 'Have a coupon?')} value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                <button type="button" className="btn btn-dark btn-sm" onClick={applyCoupon}>{t('تطبيق', 'Apply')}</button>
              </div>
              <div className="sum-total">
                <span className="t">{t('الإجمالي الكلي', 'Total')}</span>
                <span className="v">{money(total)}</span>
              </div>
              <button
                type="button"
                className="btn btn-lime btn-block"
                style={{ marginTop: 16, padding: 16 }}
                onClick={() => navigate(user ? '/checkout' : '/login?next=/checkout')}
              >
                <Lock size={17} /> {t('إتمام الشراء', 'Checkout')}
              </button>
              <button type="button" className="btn btn-outline btn-block" style={{ marginTop: 12 }} onClick={() => navigate('/products')}>
                {t('متابعة التسوق', 'Continue shopping')} {arrow}
              </button>
            </aside>
          </div>
        )}

        <div className="home-features" style={{ border: '1px solid var(--line)', borderRadius: 14, margin: '10px 0 30px' }}>
          <div className="container" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="home-feat"><Headphones /><div><strong>{t('دعم العملاء', 'Customer Support')}</strong><span>{t('نعد هنا لمساعدتك 24 ساعة', 'Here for you 24h')}</span></div></div>
            <div className="home-feat"><ShieldCheck /><div><strong>{t('دفع آمن', 'Secure Payment')}</strong><span>{t('موقع يجمع طرق الدفع الآمنة', 'Secure payment methods')}</span></div></div>
            <div className="home-feat"><Truck /><div><strong>{t('شحن سريع', 'Fast Shipping')}</strong><span>{t('إلى جميع المحافظات', 'To all governorates')}</span></div></div>
            <div className="home-feat"><Package /><div><strong>{t('إرجاع سهل', 'Easy Returns')}</strong><span>{t('خلال 14 يوم من استلام الطلب', 'Within 14 days')}</span></div></div>
          </div>
        </div>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-head">
            <h2 className="section-title" style={{ fontSize: 22 }}>{t('منتجات قد تعجبك', 'You may also like')}</h2>
          </div>
          <div className="grid-4">
            {suggest.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </div>
    </>
  );
}
