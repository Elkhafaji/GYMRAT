/* GYMRAT — Order detail */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Package, MapPin, Truck, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import api from '../lib/api.js';
import { money } from '../lib/format.js';

const STATUS = {
  pending: (t) => t('قيد التجهيز', 'Pending'),
  confirmed: (t) => t('تم التأكيد', 'Confirmed'),
  shipped: (t) => t('تم الشحن', 'Shipped'),
  delivered: (t) => t('تم التوصيل', 'Delivered'),
  cancelled: (t) => t('ملغي', 'Cancelled'),
};

export default function OrderDetail() {
  const { id } = useParams();
  const { t, user } = useApp();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (user) api.order(id).then(({ order }) => setOrder(order)).catch(() => {});
  }, [id, user]);

  if (!user) return <div className="container" style={{ padding: 60 }}><Link to="/login" className="btn btn-lime">{t('تسجيل الدخول', 'Login')}</Link></div>;
  if (!order) return <div className="container" style={{ padding: 60 }}>{t('جارٍ التحميل...', 'Loading...')}</div>;

  return (
    <div className="container account-layout">
      <aside className="account-nav">
        <Link to="/orders"><Package size={16} /> {t('كل الطلبات', 'All orders')}</Link>
        <Link to="/account">{t('حسابي', 'My account')}</Link>
      </aside>
      <section>
        <div className="order-card">
          <div className="order-head">
            <h2 style={{ fontSize: 20 }}>{t('الطلب', 'Order')} #{order.id}</h2>
            <span className={`status-chip ${order.status}`}>{STATUS[order.status]?.(t) || order.status}</span>
          </div>
          <p className="muted small">{new Date(order.createdAt).toLocaleString()}</p>
          {order.items.map((it) => (
            <div className="order-line" key={it.id}>
              {it.image && <img src={it.image} alt={it.name} />}
              <div style={{ flex: 1 }}>
                <strong>{it.name}</strong>
                <div className="muted small">{it.size} / {it.color} × {it.quantity}</div>
              </div>
              <b style={{ fontFamily: 'var(--font-body)' }}>{money(it.price * it.quantity)}</b>
            </div>
          ))}
          <div style={{ marginTop: 16 }}>
            <div className="sum-row"><span>{t('المجموع', 'Subtotal')}</span><b>{money(order.subtotal)}</b></div>
            <div className="sum-row"><span>{t('الشحن', 'Shipping')}</span><b>{order.shipping === 0 ? t('مجاناً', 'Free') : money(order.shipping)}</b></div>
            {order.discount > 0 && <div className="sum-row"><span>{t('خصم', 'Discount')}</span><b className="lime">-{money(order.discount)}</b></div>}
            <div className="sum-total"><span className="t">{t('الإجمالي', 'Total')}</span><span className="v">{money(order.total)}</span></div>
          </div>
          <div className="divider" />
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', color: 'var(--muted)', fontSize: 13 }}>
            <span><MapPin size={15} style={{ verticalAlign: 'middle', color: 'var(--lime)' }} /> {order.line1}, {order.city}</span>
            <span><Truck size={15} style={{ verticalAlign: 'middle', color: 'var(--lime)' }} /> {order.phone}</span>
            <span><CreditCard size={15} style={{ verticalAlign: 'middle', color: 'var(--lime)' }} /> {order.paymentMethod === 'cod' ? t('الدفع عند الاستلام', 'Cash on delivery') : t('بطاقة', 'Card')}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
