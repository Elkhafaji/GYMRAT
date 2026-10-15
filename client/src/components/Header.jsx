/* GYMRAT — site header (topbar + mainbar + navbar) */
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, Truck, Globe, ChevronDown, Package } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { Logo } from './ui.jsx';

const NAV = (t) => [
  { to: '/', label: t('الرئيسية', 'Home') },
  { to: '/collections', label: t('المجموعات', 'Collections') },
  { to: '/products', label: t('المنتجات', 'Products') },
  { to: '/products?bestSeller=1', label: t('الأكثر مبيعاً', 'Best Sellers') },
  { to: '/about', label: t('عن نحن', 'About') },
  { to: '/contact', label: t('تواصل معنا', 'Contact') },
];

export default function Header() {
  const { t, lang, setLang, cartCount, user, setSearchOpen, setMenuOpen } = useApp();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onDoc = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false); };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container">
          <span className="topbar-msg"><Truck /> {t('شحن مجاني للطلبات فوق ٩٩٩ درهم', 'Free shipping on orders over 999 EGP')}</span>
          <div className="topbar-links">
            <Link to="/orders">{t('تتبع طلباتك', 'Track Orders')}</Link>
            <Link to={user ? '/account' : '/login'}>{user ? user.name : t('حسابي', 'My Account')}</Link>
            <div className="lang-menu" ref={langRef}>
              <button type="button" className="lang-btn" onClick={() => setLangOpen((o) => !o)} aria-label="Language">
                <Globe /> {lang.toUpperCase()} <ChevronDown size={13} />
              </button>
              {langOpen && (
                <div className="lang-pop">
                  <button type="button" className={lang === 'ar' ? 'active' : ''} onClick={() => { setLang('ar'); setLangOpen(false); }}>العربية</button>
                  <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => { setLang('en'); setLangOpen(false); }}>English</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mainbar">
        <div className="container">
          <div className="mainbar-icons">
            <button type="button" className="icon-btn burger" aria-label="Menu" onClick={() => setMenuOpen(true)}><Menu /></button>
            <button type="button" className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(true)}><Search /></button>
            <Link to={user ? '/account' : '/login'} className="icon-btn" aria-label="Account"><User /></Link>
            <Link to="/cart" className="icon-btn" aria-label="Cart">
              <ShoppingBag />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </div>
          <Logo />
          <div style={{ justifySelf: 'end', display: 'flex', gap: 16, alignItems: 'center' }}>
            <Link to="/orders" className="icon-btn" aria-label={t('الطلبات', 'Orders')} title={t('الطلبات', 'Orders')}><Package /></Link>
          </div>
        </div>
      </div>

      <nav className="navbar" aria-label="Main">
        <div className="container">
          {NAV(t).map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nav-link ${isActive && l.to !== '/products?bestSeller=1' ? 'active' : ''}`}
              end={l.to === '/'}
            >
              {l.label}
            </NavLink>
          ))}
          <span className="nav-tagline">BUILT DIFFERENT. BUILT DISCIPLINED.</span>
        </div>
      </nav>
    </header>
  );
}
