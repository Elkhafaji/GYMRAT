/* GYMRAT — 404 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { LogoMark } from '../components/ui.jsx';

export default function NotFound() {
  const { t } = useApp();
  return (
    <div className="container not-found" style={{ padding: '80px 0' }}>
      <div>
        <LogoMark size={56} />
        <h1 className="display" style={{ fontSize: 80, color: 'var(--lime)', margin: '14px 0' }}>404</h1>
        <h2>{t('الصفحة غير موجودة', 'Page not found')}</h2>
        <p className="muted" style={{ margin: '8px 0 22px' }}>{t('TRAIN. WEAR. REPEAT. — عد إلى المسار الصحيح', 'TRAIN. WEAR. REPEAT. — get back on track')}</p>
        <Link to="/" className="btn btn-lime">{t('العودة للرئيسية', 'Back home')}</Link>
      </div>
    </div>
  );
}
