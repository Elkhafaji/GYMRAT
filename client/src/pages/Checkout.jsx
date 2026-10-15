/* GYMRAT — Checkout (delivery + payment + review → creates real order) */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Truck, CreditCard, CheckCircle, ArrowLeft, ArrowRight, Package } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import api from '../lib/api.js';
import { money, totalsOf, SHIPPING_FREE_OVER } from '../lib/format.js';
import { LogoMark } from '../components/ui.jsx';
import { banners } from '../data/assets.js';

export default function Checkout() {
  const { t, isAr, cart, user, clearCart, showToast } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(null);
  const [form, setForm] = useState({
    fullName: user?.name || '', phone: user?.phone || '', line1: '', city: '', country: 'EG',
    notes: '', paymentMethod: 'cod', couponCode: '',
  });
  const set = (patch) => setForm({ ...form, ...patch });
  const { subtotal, shipping, discount, total } = totalsOf(cart, form.couponCode);
  const arrow = isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />;

  if (!user) {
    return (
      <div className="container not-found">
        <div>
          <LogoMark size={50} />
          <h2 style={{ margin: '16px 0 8px' }}>{t('تسجيل الدخول مطلوب', 'Login required')}</h2>
          <p className="muted" style={{ marginBottom: 18 }}>{t('سجّل الدخول لاستكمال الشراء', 'Sign in to complete your purchase')}</p>
          <Link to="/login?next=/checkout" className="btn btn-lime">{t('تسجيل الدخول', 'Login')}</Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="container not-found" style={{ padding: '60px 0' }}>
        <div className="panel panel-pad" style={{ maxWidth: 520, textAlign: 'center' }}>
          <CheckCircle size={52} style={{ color: 'var(--lime)' }} />
          <h1 style={{ margin: '16px 0 8px', fontSize: 28 }}>{t('تم استلام طلبك!', 'Order received!')}</h1>
          <p className="muted">
            {t('رقم الطلب', 'Order number')}: <b className="lime">#{done.id}</b> — {t('الإجمالي', 'Total')}: <b>{money(done.total)}</b>
          </p>
          <p className="muted small" style={{ margin: '8px 0 20px' }}>{t('سنرسل لك تأكيداً على بريدك الإلكتروني قريباً', 'A confirmation email is on its way')}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link to={`/orders/${done.id}`} className="btn btn-lime">{t('عرض الطلب', 'View order')}</Link>
            <Link to="/products" className="btn btn-outline">{t('متابعة التسوق', 'Keep shopping')}</Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container not-found">
        <div>
          <Package size={48} className="muted" />
          <h2 style={{ margin: '16px 0 8px' }}>{t('سلتك فارغة', 'Your cart is empty')}</h2>
          <Link to="/products" className="btn btn-lime">{t('تسوق الآن', 'Shop now')} {arrow}</Link>
        </div>
      </div>
    );
  }

  const steps = [t('عنوان التوصيل', 'Delivery'), t('طريقة الدفع', 'Payment'), t('مراجعة الطلب', 'Review')];

  const submit = async () => {
    try {
      const { order } = await api.createOrder(form);
      await clearCart();
      setDone(order);
    } catch (err) {
      showToast(err.message || t('تعذر إتمام الطلب', 'Could not place order'), 'err');
    }
  };

  return (
    <>
      <section className="page-hero" style={{ minHeight: 180 }}>
        <img className="ph-bg" src={banners.cartHero} alt="" />
        <div className="ph-mark"><LogoMark size={38} /></div>
        <div className="container ph-content" style={{ padding: '30px 0' }}>
          <nav className="breadcrumb"><Link to="/cart">{t('السلة', 'Cart')}</Link> <span>‹</span> <span>{t('إتمام الشراء', 'Checkout')}</span></nav>
          <h1 className="ph-title" style={{ fontSize: 32 }}>{t('إتمام الشراء', 'Checkout')}</h1>
        </div>
      </section>

      <div className="container cart-layout">
        <div className="cart-items">
          <div className="steps">
            {steps.map((label, i) => (
              <React.Fragment key={label}>
                {i > 0 && <div className="step-line" />}
                <div className={`step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                  <span className="num">{i < step ? '✓' : i + 1}</span> {label}
                </div>
              </React.Fragment>
            ))}
          </div>

          {step === 0 && (
            <div className="form-grid">
              <div className="field"><label>{t('الاسم بالكامل', 'Full name')} *</label>
                <input className="input" required value={form.fullName} onChange={(e) => set({ fullName: e.target.value })} /></div>
              <div className="field"><label>{t('رقم الهاتف', 'Phone')} *</label>
                <input className="input" required placeholder="01X XXX XXXX" value={form.phone} onChange={(e) => set({ phone: e.target.value })} /></div>
              <div className="field" style={{ gridColumn: 'span 2' }}><label>{t('العنوان بالتفصيل', 'Address')} *</label>
                <input className="input" required placeholder={t('الشارع، رقم المبنى، الدور', 'Street, building, floor')} value={form.line1} onChange={(e) => set({ line1: e.target.value })} /></div>
              <div className="field"><label>{t('المدينة', 'City')} *</label>
                <input className="input" required value={form.city} onChange={(e) => set({ city: e.target.value })} /></div>
              <div className="field"><label>{t('الدولة', 'Country')} *</label>
                <select className="select" value={form.country} onChange={(e) => set({ country: e.target.value })}>
                  <option value="EG">{t('مصر', 'Egypt')}</option>
                  <option value="SA">{t('السعودية', 'Saudi Arabia')}</option>
                  <option value="AE">{t('الإمارات', 'UAE')}</option>
                </select></div>
              <div className="field" style={{ gridColumn: 'span 2' }}><label>{t('ملاحظات (اختياري)', 'Notes (optional)')}</label>
                <textarea className="textarea" style={{ minHeight: 80 }} value={form.notes} onChange={(e) => set({ notes: e.target.value })} /></div>
            </div>
          )}

          {step === 1 && (
            <div>
              <label className="panel panel-pad" style={{ display: 'flex', gap: 14, alignItems: 'center', cursor: 'pointer', marginBottom: 12, borderColor: form.paymentMethod === 'cod' ? 'var(--lime)' : undefined }}>
                <input type="radio" name="pm" checked={form.paymentMethod === 'cod'} onChange={() => set({ paymentMethod: 'cod' })} />
                <Truck style={{ color: 'var(--lime)' }} />
                <div><strong>{t('الدفع عند الاستلام', 'Cash on delivery')}</strong><div className="muted small">{t('ادفع نقداً عند وصول طلبك', 'Pay in cash when your order arrives')}</div></div>
              </label>
              <label className="panel panel-pad" style={{ display: 'flex', gap: 14, alignItems: 'center', cursor: 'pointer', opacity: 0.7 }}>
                <input type="radio" name="pm" checked={form.paymentMethod === 'card'} onChange={() => set({ paymentMethod: 'card' })} />
                <CreditCard style={{ color: 'var(--muted)' }} />
                <div><strong>{t('بطاقة ائتمان', 'Credit card')}</strong><div className="muted small">{t('قريباً — الدفع بالبطاقة قيد الإعداد', 'Coming soon — card payments in progress')}</div></div>
              </label>
              <p className="muted small" style={{ marginTop: 14 }}>{t('جميع المعاملات مشفرة وآمنة', 'All transactions are encrypted and secure')}</p>
            </div>
          )}

          {step === 2 && (
            <div>
              <table className="table">
                <tbody>
                  {cart.map((l, i) => (
                    <tr key={i}>
                      <td>{l.name} — {l.size} / {l.color} × {l.quantity}</td>
                      <td style={{ textAlign: 'end' }}>{money(l.price * l.quantity)}</td>
                    </tr>
                  ))}
                  <tr><th>{t('العنوان', 'Address')}</th><td>{form.fullName} — {form.line1}, {form.city}</td></tr>
                  <tr><th>{t('الدفع', 'Payment')}</th><td>{form.paymentMethod === 'cod' ? t('الدفع عند الاستلام', 'Cash on delivery') : t('بطاقة', 'Card')}</td></tr>
                </tbody>
              </table>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, marginTop: 22 }}>
            {step > 0 && <button type="button" className="btn btn-outline" onClick={() => setStep(step - 1)}>{t('رجوع', 'Back')}</button>}
            {step < 2 ? (
              <button type="button" className="btn btn-lime" onClick={() => setStep(step + 1)}>{t('التالي', 'Continue')} {arrow}</button>
            ) : (
              <button type="button" className="btn btn-lime" onClick={submit}><Lock size={16} /> {t('تأكيد الطلب', 'Place order')}</button>
            )}
          </div>
        </div>

        <aside className="order-summary">
          <h3 style={{ fontSize: 18, marginBottom: 12 }}>{t('ملخص الطلب', 'Order Summary')}</h3>
          <div className="sum-row"><span>{t('إجمالي المنتجات', 'Subtotal')}</span><b>{money(subtotal)}</b></div>
          <div className="sum-row"><span>{t('الشحن', 'Shipping')}</span><b>{shipping === 0 ? t('مجاناً', 'Free') : money(shipping)}</b></div>
          <div className="sum-row"><span>{t('خصم', 'Discount')}</span><b className="lime">-{money(discount)}</b></div>
          <div className="sum-total"><span className="t">{t('الإجمالي الكلي', 'Total')}</span><span className="v">{money(total)}</span></div>
          <p className="muted small" style={{ marginTop: 10 }}>{t(`مجاناً للطلبات فوق $${SHIPPING_FREE_OVER}`, `Free shipping over $${SHIPPING_FREE_OVER}`)}</p>
        </aside>
      </div>
    </>
  );
}
