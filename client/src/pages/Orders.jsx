/* GYMRAT — Orders list */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowLeft, ArrowRight } from 'lucide-react';
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

export default function Orders() {
  const { t, isAr, user } = useApp();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) api.orders().then(({ orders }) => setOrders(orders)).catch(() => {});
  }, [user]);

  if (!user) {
    return (
      <div className="container not-found" style={{ padding: '60px 0' }}>
        <div>
          <Package size={48} className="muted" />
          <h2 style={{ margin: '16px 0 8px' }}>{t('سجّل الدخول لعرض طلباتك', 'Sign in to view your orders')}</h2>
          <Link to="/login?next=/orders" className="btn btn-lime">{t('تسجيل الدخول', 'Login')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '36px 0' }}>
      <h1 style={{ fontSize: 28, marginBottom: 6 }}>{t('طلباتي', 'My Orders')}</h1>
      <p className="muted" style={{ marginBottom: 22 }}>{t('تتبع طلباتك وتفاصيلها', 'Track your orders and their details')}</p>
      {orders.length === 0 ? (
        <div className="empty-state panel panel-pad">
          <Package size={38} />
          <h3 style={{ margin: '12px 0 6px' }}>{t('لا توجد طلبات بعد', 'No orders yet')}</h3>
          <Link to="/products" className="btn btn-lime" style={{ marginTop: 10 }}>{t('ابدأ التسوق', 'Start shopping')} {isAr ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</Link>
        </div>
      ) : (
        orders.map((o) => (
          <div className="order-card" key={o.id}>
            <div className="order-head">
              <div>
                <strong>#{o.id}</strong>
                <span className="muted small"> — {new Date(o.createdAt).toLocaleDateString()}</span>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span className={`status-chip ${o.status}`}>{STATUS[o.status]?.(t) || o.status}</span>
                <b style={{ fontFamily: 'var(--font-body)' }}>{money(o.total)}</b>
                <Link to={`/orders/${o.id}`} className="btn btn-dark btn-sm">{t('التفاصيل', 'Details')}</Link>
              </div>
            </div>
            {o.items.slice(0, 2).map((it) => (
              <div className="order-line" key={it.id}>
                {it.image && <img src={it.image} alt={it.name} />}
                <div>
                  <strong>{it.name}</strong>
                  <div className="muted small">{it.size} / {it.color} × {it.quantity}</div>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
