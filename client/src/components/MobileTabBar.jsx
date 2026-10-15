/* GYMRAT — mobile bottom tab bar */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Store, Heart, User, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function MobileTabBar() {
  const { t, cartCount } = useApp();
  const items = [
    { to: '/', Icon: Home, label: t('الرئيسية', 'Home') },
    { to: '/products', Icon: Store, label: t('المتجر', 'Shop') },
    { to: '/cart', Icon: ShoppingBag, label: t('السلة', 'Cart'), badge: cartCount },
    { to: '/wishlist', Icon: Heart, label: t('المفضلة', 'Wishlist') },
    { to: '/account', Icon: User, label: t('الحساب', 'Account') },
  ];
  return (
    <nav className="tabbar" aria-label="Mobile">
      <div className="tabbar-inner">
        {items.map(({ to, Icon, label, badge }) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}>
            <Icon />
            {badge > 0 && <span className="cart-count">{badge}</span>}
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
