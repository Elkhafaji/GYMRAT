/* GYMRAT — site footer */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Instagram, Youtube, Facebook, Music2 } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { Logo } from './ui.jsx';
import api from '../lib/api.js';

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill="currentColor" aria-hidden="true">
      <path d="M18.2 2H21l-6.6 7.5L22 22h-6.3l-4.9-6.4L5 22H2.2l7-8L2 2h6.4l4.5 5.9L18.2 2zm-1 18h1.7L7 3.8H5.2L17.2 20z" />
    </svg>
  );
}
function TiktokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill="currentColor" aria-hidden="true">
      <path d="M19.6 7.2a5.6 5.6 0 0 1-3.3-3.2V3.5h-3.2v12.2a2.9 2.9 0 1 1-2-2.8V9.6a6.1 6.1 0 1 0 5.2 6V9.7a8.7 8.7 0 0 0 4.6 1.3V7.8a5.6 5.6 0 0 1-1.3-.6z" />
    </svg>
  );
}
function PinterestIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.3-5.4s-.3-.6-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.6-.3 1.1.5 2 1.6 2 1.9 0 3.4-2 3.4-5 0-2.6-1.9-4.4-4.5-4.4-3.1 0-4.9 2.3-4.9 4.7 0 .9.3 1.9.8 2.5.1.1.1.2.1.3l-.3 1c0 .2-.2.2-.4.1-1.3-.6-2.2-2.6-2.2-4.1 0-3.4 2.4-6.5 7-6.5 3.7 0 6.5 2.6 6.5 6.2 0 3.7-2.3 6.6-5.5 6.6-1.1 0-2.1-.6-2.4-1.2l-.7 2.5c-.2 1-.9 2.2-1.3 2.9A10 10 0 1 0 12 2z" />
    </svg>
  );
}

const SOCIALS = [
  { href: 'https://instagram.com/gymrat', label: 'Instagram', Icon: Instagram },
  { href: 'https://tiktok.com/@gymrat', label: 'TikTok', Icon: TiktokIcon },
  { href: 'https://youtube.com/@gymrat', label: 'YouTube', Icon: Youtube },
  { href: 'https://x.com/gymrat', label: 'X', Icon: XIcon },
  { href: 'https://facebook.com/gymrat', label: 'Facebook', Icon: Facebook },
  { href: 'https://pinterest.com/gymrat', label: 'Pinterest', Icon: PinterestIcon },
];

export default function Footer() {
  const { t, showToast } = useApp();
  const [email, setEmail] = useState('');

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await api.newsletter(email);
      setEmail('');
      showToast(t('تم الاشتراك في النشرة البريدية', 'Subscribed to the newsletter'));
    } catch {
      showToast(t('بريد إلكتروني غير صالح', 'Invalid email'), 'err');
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <div className="footer-tag">BUILT DIFFERENT. BUILT DISCIPLINED.</div>
            <div className="footer-socials">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon size={18} /></a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>{t('روابط سريعة', 'Quick Links')}</h4>
            <ul>
              <li><Link to="/">{t('الرئيسية', 'Home')}</Link></li>
              <li><Link to="/collections">{t('المجموعات', 'Collections')}</Link></li>
              <li><Link to="/products">{t('المنتجات', 'Products')}</Link></li>
              <li><Link to="/products?bestSeller=1">{t('الأكثر مبيعاً', 'Best Sellers')}</Link></li>
              <li><Link to="/about">{t('عن نحن', 'About')}</Link></li>
              <li><Link to="/contact">{t('تواصل معنا', 'Contact')}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t('خدمة العملاء', 'Customer Service')}</h4>
            <ul>
              <li><Link to="/policy/privacy">{t('سياسة الخصوصية', 'Privacy Policy')}</Link></li>
              <li><Link to="/policy/returns">{t('سياسة الاسترجاع', 'Returns Policy')}</Link></li>
              <li><Link to="/policy/terms">{t('الشروط والأحكام', 'Terms & Conditions')}</Link></li>
              <li><Link to="/policy/shipping">{t('طرق الدفع والشحن', 'Payment & Shipping')}</Link></li>
              <li><Link to="/contact">{t('مركز المساعدة', 'Help Center')}</Link></li>
            </ul>
          </div>

          <div className="footer-col footer-news">
            <h4>{t('اشترك في نشرتنا البريدية', 'Join Our Newsletter')}</h4>
            <p>{t('احصل على آخر التحديثات والعروض الحصرية أولاً', 'Get the latest drops and exclusive offers first')}</p>
            <form className="news-form" onSubmit={subscribe}>
              <input
                className="input"
                type="email"
                required
                placeholder={t('أدخل بريدك الإلكتروني', 'Enter your email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
              />
              <button className="news-btn" type="submit" aria-label={t('اشتراك', 'Subscribe')}><Send size={18} /></button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2025 GYMRAT. {t('جميع الحقوق محفوظة', 'All rights reserved.')}</span>
          <span className="train">TRAIN / WEAR / REPEAT</span>
        </div>
      </div>
    </footer>
  );
}
