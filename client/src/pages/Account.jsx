/* GYMRAT — Account page */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, Heart, LogOut, MapPin, Save } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import api from '../lib/api.js';

export default function Account() {
  const { t, user, logout, updateProfileRemote, showToast } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', gender: '', birthDate: '' });

  useEffect(() => {
    if (user) setForm({ name: user.name || '', phone: user.phone || '', gender: user.gender || '', birthDate: user.birthDate || '' });
  }, [user]);

  if (!user) {
    return (
      <div className="container not-found" style={{ padding: '60px 0' }}>
        <div>
          <User size={48} className="muted" />
          <h2 style={{ margin: '16px 0 8px' }}>{t('سجّل الدخول إلى حسابك', 'Sign in to your account')}</h2>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link to="/login" className="btn btn-lime">{t('تسجيل الدخول', 'Login')}</Link>
            <Link to="/register" className="btn btn-outline">{t('إنشاء حساب', 'Register')}</Link>
          </div>
        </div>
      </div>
    );
  }

  const save = async (e) => {
    e.preventDefault();
    try {
      await api.updateMe(form);
      showToast(t('تم حفظ البيانات', 'Profile saved'));
    } catch {
      showToast(t('تعذر الحفظ', 'Could not save'), 'err');
    }
  };

  return (
    <div className="container account-layout">
      <aside className="account-nav">
        <Link to="/account"><User size={16} /> {t('معلوماتي', 'My Info')}</Link>
        <Link to="/orders"><Package size={16} /> {t('طلباتي', 'My Orders')}</Link>
        <Link to="/wishlist"><Heart size={16} /> {t('المفضلة', 'Wishlist')}</Link>
        <button type="button" onClick={async () => { await logout(); navigate('/'); showToast(t('تم تسجيل الخروج', 'Logged out')); }}>
          <LogOut size={16} /> {t('تسجيل الخروج', 'Logout')}
        </button>
      </aside>

      <section>
        <div className="panel panel-pad" style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 20, marginBottom: 4 }}>{t('معلوماتي', 'My Information')}</h2>
          <p className="muted small" style={{ marginBottom: 18 }}>{t('أهلاً', 'Hello')}, <b className="lime">{user.name}</b> — {user.email}</p>
          <form onSubmit={save}>
            <div className="form-grid">
              <div className="field"><label>{t('الاسم', 'Name')}</label>
                <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div className="field"><label>{t('رقم الهاتف', 'Phone')}</label>
                <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
              <div className="field"><label>{t('الجنس', 'Gender')}</label>
                <select className="select" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                  <option value="">{t('—', '—')}</option>
                  <option value="male">{t('ذكر', 'Male')}</option>
                  <option value="female">{t('أنثى', 'Female')}</option>
                </select></div>
              <div className="field"><label>{t('تاريخ الميلاد', 'Birth date')}</label>
                <input className="input" type="date" value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} /></div>
            </div>
            <button className="btn btn-lime" type="submit"><Save size={16} /> {t('حفظ التغييرات', 'Save changes')}</button>
          </form>
        </div>

        <div className="panel panel-pad">
          <h3 style={{ fontSize: 16, marginBottom: 10 }}><MapPin size={16} style={{ color: 'var(--lime)' }} /> {t('العناوين', 'Addresses')}</h3>
          <p className="muted small">{t('أضف عنوان التوصيل عند إتمام أي طلب — يتم حفظه تلقائياً مع الطلب.', 'Add a delivery address at checkout — it is saved with your order.')}</p>
          <Link to="/products" className="btn btn-dark btn-sm" style={{ marginTop: 12 }}>{t('استمر بالتسوق', 'Keep shopping')}</Link>
        </div>
      </section>
    </div>
  );
}
