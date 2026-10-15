/* GYMRAT — mobile drawer menu */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Home, Store, Heart, Package, User, Phone, Globe, Instagram, Youtube, Facebook, Info } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { Logo, LogoMark } from './ui.jsx';

export default function MobileDrawer() {
  const { t, lang, setLang, setMenuOpen, user, logout, showToast } = useApp();
  const navigate = useNavigate();
  const close = () => setMenuOpen(false);

  const links = [
    { to: '/', label: t('الرئيسية', 'Home'), Icon: Home },
    { to: '/products', label: t('المتجر', 'Shop'), Icon: Store },
    { to: '/wishlist', label: t('المفضلة', 'Wishlist'), Icon: Heart },
    { to: '/products?bestSeller=1', label: t('الأكثر مبيعاً', 'Best Sellers'), Icon: Package },
    { to: '/about', label: t('عن نحن', 'About'), Icon: Info },
    { to: '/contact', label: t('تواصل معنا', 'Contact'), Icon: Phone },
  ];

  return (
    <>
      <div className="overlay" onClick={close} />
      <aside className="drawer" aria-label="Menu">
        <div className="drawer-head">
          <Logo />
          <button type="button" className="icon-btn" onClick={close} aria-label="Close"><X /></button>
        </div>
        {links.map(({ to, label, Icon }) => (
          <Link key={to} to={to} className="drawer-link" onClick={close}><Icon /> {label}</Link>
        ))}
        {user ? (
          <>
            <Link to="/account" className="drawer-link" onClick={close}><User /> {t('حسابي', 'My Account')}</Link>
            <Link to="/orders" className="drawer-link" onClick={close}><Package /> {t('طلباتي', 'My Orders')}</Link>
            <button type="button" className="drawer-link" onClick={async () => { await logout(); close(); navigate('/'); showToast(t('تم تسجيل الخروج', 'Logged out')); }}>
              <X /> {t('تسجيل الخروج', 'Logout')}
            </button>
          </>
        ) : (
          <Link to="/login" className="drawer-link" onClick={close}><User /> {t('تسجيل الدخول', 'Login')}</Link>
        )}
        <div className="drawer-head" style={{ marginTop: 16 }}>
          <button type="button" className="chip" onClick={() => setLang('ar')} style={{ borderColor: lang === 'ar' ? 'var(--lime)' : undefined, color: lang === 'ar' ? 'var(--lime)' : undefined }}>AR</button>
          <button type="button" className="chip" onClick={() => setLang('en')} style={{ borderColor: lang === 'en' ? 'var(--lime)' : undefined, color: lang === 'en' ? 'var(--lime)' : undefined }}>EN</button>
          <Globe style={{ color: 'var(--muted)' }} />
        </div>
        <div className="drawer-socials">
          <a href="https://instagram.com/gymrat" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>
          <a href="https://youtube.com/@gymrat" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube /></a>
          <a href="https://facebook.com/gymrat" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a>
          <span style={{ marginInlineStart: 'auto', opacity: 0.6 }}><LogoMark size={26} /></span>
        </div>
      </aside>
    </>
  );
}
