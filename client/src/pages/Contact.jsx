/* GYMRAT — Contact page */
import React, { useState } from 'react';
import {
  MapPin, Mail, Phone, Headphones, Send, Instagram, Youtube, Facebook, MessageCircle, Star, ShieldCheck, Truck, Package,
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import api from '../lib/api.js';
import { banners } from '../data/assets.js';
import { LogoMark } from '../components/ui.jsx';

function XIcon() {
  return <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true"><path d="M18.2 2H21l-6.6 7.5L22 22h-6.3l-4.9-6.4L5 22H2.2l7-8L2 2h6.4l4.5 5.9L18.2 2zm-1 18h1.7L7 3.8H5.2L17.2 20z" /></svg>;
}
function TiktokIcon() {
  return <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true"><path d="M19.6 7.2a5.6 5.6 0 0 1-3.3-3.2V3.5h-3.2v12.2a2.9 2.9 0 1 1-2-2.8V9.6a6.1 6.1 0 1 0 5.2 6V9.7a8.7 8.7 0 0 0 4.6 1.3V7.8a5.6 5.6 0 0 1-1.3-.6z" /></svg>;
}

export default function Contact() {
  const { t, showToast } = useApp();
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.contact(form);
      showToast(t('تم إرسال رسالتك بنجاح', 'Message sent successfully'));
      setForm({ name: '', email: '', topic: '', message: '' });
    } catch {
      showToast(t('تعذر الإرسال، حاول مجدداً', 'Could not send, try again'), 'err');
    }
    setSending(false);
  };

  const cards = [
    { Icon: MapPin, title: t('العنوان', 'Address'), line1: t('القاهرة - مصر', 'Cairo - Egypt'), line2: t('(يمكنك زيارة متجرنا الفعلي)', '(Visit our physical store)'), cta: t('عرض الموقع على الخريطة', 'View on map'), href: 'https://maps.google.com/?q=Cairo,Egypt', ext: true },
    { Icon: Mail, title: t('البريد الإلكتروني', 'Email'), line1: 'support@gymrat.com', line2: t('نرد خلال 24 ساعة', 'We reply within 24h'), cta: t('← إرسال بريد إلكتروني', 'Send an email'), href: 'mailto:support@gymrat.com', ext: true },
    { Icon: Phone, title: t('رقم الهاتف', 'Phone'), line1: '+20 112 345 6789', line2: t('من 10 ص - 10 م يومياً', '10AM - 10PM daily'), cta: t('اتصل بنا', 'Call us'), href: 'tel:+201123456789', ext: true },
    { Icon: Headphones, title: t('الدعم الفني', 'Support'), line1: 'support@gymrat.com', line2: t('للمساعدة في الطلبات والمنتجات', 'Help with orders & products'), cta: t('تواصل معنا', 'Contact us'), href: '#form', ext: false },
  ];

  return (
    <>
      <section className="page-hero">
        <img className="ph-bg" src={banners.contactHero} alt="" />
        <div className="ph-script">STAY<br />CONNECTED.</div>
        <div className="ph-mark"><LogoMark size={44} /></div>
        <div className="container ph-content">
          <p className="eyebrow">CONTACT US</p>
          <h1 className="ph-title">{t('تواصل معنا', 'Contact Us')}</h1>
          <p className="ph-sub">
            {t('نحن دائماً هنا لمساعدتك. سواء كان لديك استفسار عن منتج، أو طلب خاص، أو أي شيء آخر.', 'We are always here for you — whether you have a product question, a special request, or anything else.')}
          </p>
        </div>
      </section>

      <div className="container">
        <div className="contact-cards">
          {cards.map(({ Icon, title, line1, line2, cta, href, ext }) => (
            <div className="contact-card" key={title}>
              <Icon className="ic" />
              <h3>{title}</h3>
              <p><strong style={{ color: 'var(--off)' }}>{line1}</strong></p>
              <p>{line2}</p>
              <a className="btn btn-dark btn-sm" href={href} {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})}>{cta}</a>
            </div>
          ))}
        </div>

        <div className="contact-layout" id="form">
          <form className="panel panel-pad" onSubmit={submit}>
            <h2 style={{ fontSize: 24, marginBottom: 6 }}>{t('أرسل لنا رسالة', 'Send us a message')}</h2>
            <p className="muted" style={{ marginBottom: 20 }}>{t('اكتب لنا أي شيء — سواء استفسار عندك وسنعاودك في أقرب وقت ممكن.', 'Write us anything — ask your question and we will get back ASAP.')}</p>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="cname">{t('الاسم الكامل', 'Full name')}</label>
                <input id="cname" className="input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="field">
                <label htmlFor="cemail">{t('البريد الإلكتروني', 'Email')}</label>
                <input id="cemail" type="email" className="input" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="ctopic">{t('نوع الاستفسار', 'Inquiry type')}</label>
              <select id="ctopic" className="select" required value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
                <option value="">{t('اختر نوع الاستفسار', 'Choose a topic')}</option>
                <option>{t('استفسار عن منتج', 'Product question')}</option>
                <option>{t('متابعة طلب', 'Order follow-up')}</option>
                <option>{t('استبدال أو إرجاع', 'Exchange or return')}</option>
                <option>{t('اقتراح أو شكوى', 'Suggestion or complaint')}</option>
                <option>{t('أخرى', 'Other')}</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="cmsg">{t('رسالتك', 'Your message')}</label>
              <textarea id="cmsg" className="textarea" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>
            <button className="btn btn-lime btn-block" type="submit" disabled={sending}>
              <Send size={17} /> {sending ? t('جارٍ الإرسال...', 'Sending...') : t('إرسال الرسالة', 'Send Message')}
            </button>
          </form>

          <div className="social-panel">
            <img src={banners.qualityDetail} alt="" loading="lazy" />
            <div className="ph-script" style={{ top: '8%', insetInlineStart: '8%', insetInlineEnd: 'auto', textAlign: 'start', fontSize: 22 }}>
              BETTER<br />GEAR.<br />BIGGER GOALS.
            </div>
            <div className="sp-body">
              <h2 style={{ fontSize: 22 }}>{t('تابعنا على مواقع التواصل الاجتماعي', 'Follow us on social media')}</h2>
              <p className="muted small" style={{ marginTop: 8 }}>
                {t('كن دوماً من مجتمعنا GYMRAT. وابق على اطلاع على آخر المجموعات، والعروض، والأحداث الحصرية.', 'Stay close to the GYMRAT community. Get the latest collections, offers and exclusive events.')}
              </p>
              <div className="social-icons">
                <a href="https://instagram.com/gymrat" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
                <a href="https://tiktok.com/@gymrat" target="_blank" rel="noreferrer" aria-label="TikTok"><TiktokIcon /></a>
                <a href="https://youtube.com/@gymrat" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
                <a href="https://x.com/gymrat" target="_blank" rel="noreferrer" aria-label="X"><XIcon /></a>
                <a href="https://facebook.com/gymrat" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
                <a href="mailto:support@gymrat.com" aria-label="Email"><MessageCircle size={18} /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="map-panel">
          <div className="map-body">
            <p className="eyebrow">{t('موقعنا', 'Our Location')}</p>
            <h2 style={{ fontSize: 24, margin: '6px 0 10px' }}>{t('زورنا في متجرنا', 'Visit our store')}</h2>
            <p className="muted">{t('يمكنك زيارتنا في القاهرة والتعرف على المنتجات عن قرب وتجربة الجودة بنفسك.', 'Visit us in Cairo to see the products up close and feel the quality yourself.')}</p>
            <a className="btn btn-outline btn-sm" style={{ marginTop: 16 }} href="https://maps.google.com/?q=Cairo,Egypt" target="_blank" rel="noreferrer">
              {t('عرض الموقع على الخريطة', 'View on map')} <MapPin size={15} />
            </a>
          </div>
          <div className="map-visual">
            <span className="map-chip badge badge-dark">{t('القاهرة - مصر', 'Cairo - Egypt')}</span>
            <div className="map-pin">
              <LogoMark size={44} color="#87F52B" />
              <MapPin size={44} style={{ color: 'var(--lime)' }} />
              <strong>Cairo</strong>
            </div>
          </div>
        </div>

        <div className="home-features" style={{ border: '1px solid var(--line)', borderRadius: 14, marginBottom: 36 }}>
          <div className="container" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="home-feat"><Headphones /><div><strong>{t('دعم سريع', 'Fast Support')}</strong><span>{t('نرد على استفساراتك خلال 24 ساعة', 'Replies within 24 hours')}</span></div></div>
            <div className="home-feat"><ShieldCheck /><div><strong>{t('دفع آمن', 'Secure Payment')}</strong><span>{t('موقع يدعم جميع طرق الدفع الآمنة', 'All secure payment methods')}</span></div></div>
            <div className="home-feat"><Truck /><div><strong>{t('شحن سريع', 'Fast Shipping')}</strong><span>{t('إلى جميع المحافظات', 'To all governorates')}</span></div></div>
            <div className="home-feat"><Package /><div><strong>{t('إرجاع سهل', 'Easy Returns')}</strong><span>{t('خلال 14 يوم من استلام الطلب', 'Within 14 days of delivery')}</span></div></div>
          </div>
        </div>
      </div>
    </>
  );
}
