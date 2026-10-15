/* GYMRAT — Login page */
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, ArrowRight, LogIn } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { banners, heroes } from '../data/assets.js';
import { LogoMark } from '../components/ui.jsx';

export default function Login() {
  const { t, isAr, login, showToast } = useApp();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next') || '/account';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const arrow = isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await login(email, password);
      showToast(t('أهلاً بعودتك!', 'Welcome back!'));
      navigate(next);
    } catch (err) {
      showToast(err.message || t('بيانات غير صحيحة', 'Invalid credentials'), 'err');
    }
    setBusy(false);
  };

  return (
    <section className="auth-hero" style={{ minHeight: '68vh' }}>
      <img src={banners.cartHero} alt="" />
      <div className="ph-mark"><LogoMark size={44} /></div>
      <div className="container ah-content">
        <div className="auth-layout" style={{ padding: '20px 0 40px' }}>
          <form className="panel panel-pad" style={{ maxWidth: 520 }} onSubmit={submit}>
            <p className="eyebrow">GYMRAT</p>
            <h1 className="ph-title" style={{ fontSize: 30, margin: '6px 0 4px' }}>{t('تسجيل الدخول', 'Login')}</h1>
            <p className="muted small" style={{ marginBottom: 22 }}>{t('أهلاً بعودتك إلى عائلة GYMRAT', 'Welcome back to the GYMRAT family')}</p>
            <div className="field">
              <label>{t('البريد الإلكتروني', 'Email')}</label>
              <div className="input-icon"><Mail /><input className="input" type="email" required placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            </div>
            <div className="field">
              <label>{t('كلمة المرور', 'Password')}</label>
              <div className="input-icon"><Lock /><input className="input" type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            </div>
            <button className="btn btn-lime btn-block" type="submit" disabled={busy} style={{ padding: 15 }}>
              <LogIn size={17} /> {busy ? t('جارٍ الدخول...', 'Signing in...') : t('تسجيل الدخول', 'Login')} {arrow}
            </button>
            <p className="muted small center" style={{ marginTop: 16 }}>
              {t('ليس لديك حساب؟', 'No account yet?')} <Link to="/register" className="lime">{t('أنشئ حساباً جديداً', 'Create one')}</Link>
            </p>
          </form>
          <div className="panel panel-pad" style={{ textAlign: 'center' }}>
            <LogoMark size={44} />
            <h3 style={{ margin: '14px 0 8px' }}>{t('عائلة GYMRAT', 'GYMRAT Family')}</h3>
            <p className="muted small">{t('سجّل الدخول لمتابعة طلباتك، مفضلتك، والحصول على عروض الأعضاء.', 'Sign in to track orders, manage your wishlist and unlock member offers.')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
