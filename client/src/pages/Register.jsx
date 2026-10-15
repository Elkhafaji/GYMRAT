/* GYMRAT — Register (4-step wizard as per screenshot) */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, User, Mail, Phone, Calendar, Lock, Gift, ShoppingBag, Bell, Sparkles, Star, Zap, CheckCircle, Package,
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { banners, heroes } from '../data/assets.js';
import { LogoMark, Check } from '../components/ui.jsx';

const STEPS = (t) => [
  t('المعلومات الشخصية', 'Personal Info'),
  t('عنوان التوصيل', 'Shipping Address'),
  t('معلومات إضافية', 'Extra Info'),
  t('تأكيد الحساب', 'Confirm Account'),
];

const INTERESTS = (t) => [
  { key: 'sport', label: t('الرياضة', 'Sports'), Icon: Zap },
  { key: 'shopping', label: t('التسوق', 'Shopping'), Icon: ShoppingBag },
  { key: 'offers', label: t('العروض', 'Offers'), Icon: Bell },
  { key: 'discounts', label: t('الخصومات', 'Discounts'), Icon: Gift },
  { key: 'new-drops', label: t('المجموعات الجديدة', 'New drops'), Icon: Sparkles },
];

export default function Register() {
  const { t, register, showToast } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    first: '', second: '', third: '', fourth: '',
    mobile: '', phone2: '', email: '', birthDate: '', gender: '', country: 'EG',
    password: '', password2: '',
    address: '', city: '', region: '', postal: '', addressNotes: '',
    sizePref: '', colorPref: '', interests: [], agree: true,
  });
  const set = (patch) => setForm({ ...form, ...patch });
  const arrow = isArArrow();

  function isArArrow() {
    return document.documentElement.dir !== 'ltr' ? <ArrowLeft size={16} /> : <ArrowRight size={16} />;
  }

  const next = (e) => {
    e?.preventDefault();
    if (step < 3) setStep(step + 1);
  };
  const back = () => setStep(Math.max(0, step - 1));

  const submit = async (e) => {
    e.preventDefault();
    const name = `${form.first} ${form.second} ${form.third} ${form.fourth}`.trim();
    try {
      await register({
        name,
        email: form.email,
        password: form.password,
        phone: form.mobile,
        gender: form.gender,
        birthDate: form.birthDate,
        interests: form.interests.join(','),
      });
      showToast(t('تم إنشاء الحساب بنجاح', 'Account created successfully'));
      navigate('/account');
    } catch (err) {
      showToast(err.message || t('تعذر إنشاء الحساب', 'Could not create account'), 'err');
    }
  };

  return (
    <>
      <section className="auth-hero">
        <img src={banners.registerHero} alt="" />
        <div className="ph-script" style={{ top: '16%', insetInlineStart: '5%', insetInlineEnd: 'auto', textAlign: 'start' }}>
          JOIN<br />THE<br />GYMRAT<br />FAMILY
        </div>
        <div className="ph-mark"><LogoMark size={44} /></div>
        <div className="container ah-content" style={{ textAlign: 'center' }}>
          <h1 className="ph-title">{t('أنشئ حساب جديد', 'Create New Account')}</h1>
          <p className="ph-sub" style={{ marginInline: 'auto' }}>{t('انضم إلينا واحصل على تجربة تسوق أفضل', 'Join us for a better shopping experience')}</p>
          <p className="ph-sub" style={{ marginInline: 'auto', marginTop: 4 }}>
            {t('قم بإنشاء حسابك لتتمكن من متابعة طلباتك، والحصول على عروض حصرية.', 'Create your account to track orders and unlock exclusive offers.')}
          </p>
        </div>
      </section>

      <div className="container auth-layout">
        <form className="panel panel-pad" onSubmit={step === 3 ? submit : next}>
          {/* stepper */}
          <div className="steps">
            {STEPS(t).map((label, i) => (
              <React.Fragment key={label}>
                {i > 0 && <div className="step-line" />}
                <div className={`step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                  <span className="num">{i < step ? '✓' : i + 1}</span> {label}
                </div>
              </React.Fragment>
            ))}
          </div>

          {step === 0 && (
            <>
              <h2 style={{ fontSize: 20, marginBottom: 4 }}>{t('المعلومات الشخصية', 'Personal Information')}</h2>
              <p className="muted small" style={{ marginBottom: 18 }}>{t('يرجى إدخال بياناتك الشخصية بدقة', 'Please enter your personal details accurately')}</p>
              <div className="form-grid">
                <div className="field"><label>{t('الاسم الأول', 'First name')} *</label>
                  <div className="input-icon"><User /><input className="input" required placeholder={t('أدخل اسمك الأول', 'First name')} value={form.first} onChange={(e) => set({ first: e.target.value })} /></div></div>
                <div className="field"><label>{t('الاسم الثاني', 'Second name')} *</label>
                  <div className="input-icon"><User /><input className="input" required placeholder={t('أدخل اسمك الثاني', 'Second name')} value={form.second} onChange={(e) => set({ second: e.target.value })} /></div></div>
                <div className="field"><label>{t('الاسم الثالث', 'Third name')} *</label>
                  <div className="input-icon"><User /><input className="input" required placeholder={t('أدخل اسمك الثالث', 'Third name')} value={form.third} onChange={(e) => set({ third: e.target.value })} /></div></div>
                <div className="field"><label>{t('الاسم الرابع', 'Fourth name')} *</label>
                  <div className="input-icon"><User /><input className="input" required placeholder={t('أدخل اسمك الرابع', 'Fourth name')} value={form.fourth} onChange={(e) => set({ fourth: e.target.value })} /></div></div>
                <div className="field"><label>{t('رقم الهاتف المحمول', 'Mobile number')} *</label>
                  <div className="input-icon"><Phone /><input className="input" required placeholder="01X XXX XXXX" value={form.mobile} onChange={(e) => set({ mobile: e.target.value })} /></div></div>
                <div className="field"><label>{t('رقم الهاتف الثانوي (اختياري)', 'Secondary phone (optional)')}</label>
                  <div className="input-icon"><Phone /><input className="input" placeholder="01X XXX XXXX" value={form.phone2} onChange={(e) => set({ phone2: e.target.value })} /></div></div>
                <div className="field"><label>{t('البريد الإلكتروني', 'Email')} *</label>
                  <div className="input-icon"><Mail /><input className="input" type="email" required placeholder="example@mail.com" value={form.email} onChange={(e) => set({ email: e.target.value })} /></div></div>
                <div className="field"><label>{t('تاريخ الميلاد', 'Birth date')} *</label>
                  <div className="input-icon"><Calendar /><input className="input" type="date" required value={form.birthDate} onChange={(e) => set({ birthDate: e.target.value })} /></div></div>
                <div className="field"><label>{t('الجنس', 'Gender')} *</label>
                  <select className="select" required value={form.gender} onChange={(e) => set({ gender: e.target.value })}>
                    <option value="">{t('اختر الجنس', 'Select gender')}</option>
                    <option value="male">{t('ذكر', 'Male')}</option>
                    <option value="female">{t('أنثى', 'Female')}</option>
                  </select></div>
                <div className="field"><label>{t('الدولة', 'Country')} *</label>
                  <select className="select" required value={form.country} onChange={(e) => set({ country: e.target.value })}>
                    <option value="EG">{t('مصر', 'Egypt')}</option>
                    <option value="SA">{t('السعودية', 'Saudi Arabia')}</option>
                    <option value="AE">{t('الإمارات', 'UAE')}</option>
                    <option value="KW">{t('الكويت', 'Kuwait')}</option>
                  </select></div>
                <div className="field"><label>{t('كلمة المرور', 'Password')} *</label>
                  <div className="input-icon"><Lock /><input className="input" type="password" required minLength={6} placeholder={t('أدخل كلمة المرور', 'Password')} value={form.password} onChange={(e) => set({ password: e.target.value })} /></div></div>
                <div className="field"><label>{t('تأكيد كلمة المرور', 'Confirm password')} *</label>
                  <div className="input-icon"><Lock /><input className="input" type="password" required minLength={6} placeholder={t('أعد كلمة المرور', 'Confirm password')} value={form.password2} onChange={(e) => set({ password2: e.target.value })} /></div></div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 style={{ fontSize: 20, marginBottom: 4 }}>{t('عنوان التوصيل', 'Shipping Address')}</h2>
              <p className="muted small" style={{ marginBottom: 18 }}>{t('أين نوصل طلباتك؟', 'Where should we deliver your orders?')}</p>
              <div className="field"><label>{t('العنوان بالتفصيل', 'Address line')} *</label>
                <input className="input" required placeholder={t('الشارع، رقم المبنى، الدور', 'Street, building, floor')} value={form.address} onChange={(e) => set({ address: e.target.value })} /></div>
              <div className="form-grid">
                <div className="field"><label>{t('المدينة', 'City')} *</label>
                  <input className="input" required placeholder={t('المدينة', 'City')} value={form.city} onChange={(e) => set({ city: e.target.value })} /></div>
                <div className="field"><label>{t('المنطقة / المحافظة', 'Region / Governorate')} *</label>
                  <input className="input" required placeholder={t('المحافظة', 'Governorate')} value={form.region} onChange={(e) => set({ region: e.target.value })} /></div>
                <div className="field"><label>{t('الرمز البريدي (اختياري)', 'Postal code (optional)')}</label>
                  <input className="input" placeholder="12345" value={form.postal} onChange={(e) => set({ postal: e.target.value })} /></div>
                <div className="field"><label>{t('تعليمات التوصيل (اختياري)', 'Delivery notes (optional)')}</label>
                  <input className="input" placeholder={t('علامة مميزة، وقت مناسب...', 'Landmark, preferred time...')} value={form.addressNotes} onChange={(e) => set({ addressNotes: e.target.value })} /></div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ fontSize: 20, marginBottom: 4 }}>{t('معلومات إضافية', 'Extra Information')}</h2>
              <p className="muted small" style={{ marginBottom: 18 }}>{t('ساعدنا نخدمك بشكل أفضل', 'Help us serve you better')}</p>
              <div className="form-grid">
                <div className="field"><label>{t('المقاس المفضل', 'Favorite size')}</label>
                  <select className="select" value={form.sizePref} onChange={(e) => set({ sizePref: e.target.value })}>
                    <option value="">{t('اختر المقاس', 'Select size')}</option>
                    {['S', 'M', 'L', 'XL', 'XXL'].map((s) => <option key={s}>{s}</option>)}
                  </select></div>
                <div className="field"><label>{t('اللون المفضل', 'Favorite color')}</label>
                  <select className="select" value={form.colorPref} onChange={(e) => set({ colorPref: e.target.value })}>
                    <option value="">{t('اختر اللون', 'Select color')}</option>
                    <option value="black">{t('أسود', 'Black')}</option>
                    <option value="grey">{t('رمادي', 'Grey')}</option>
                    <option value="white">{t('أبيض', 'White')}</option>
                  </select></div>
              </div>
              <h3 style={{ fontSize: 15, margin: '10px 0 2px' }}>{t('الاشتراكات (اختياري)', 'Interests (optional)')}</h3>
              <p className="muted small">{t('اختر ما يهمك من أجل تجربة أفضل', 'Pick what matters to you for a better experience')}</p>
              <div className="interest-chips">
                {INTERESTS(t).map(({ key, label, Icon }) => (
                  <button
                    key={key}
                    type="button"
                    className={`chip ${form.interests.includes(key) ? 'active' : ''}`}
                    onClick={() => set({ interests: form.interests.includes(key) ? form.interests.filter((x) => x !== key) : [...form.interests, key] })}
                  >
                    <Icon size={15} /> {label}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 style={{ fontSize: 20, marginBottom: 4 }}>{t('تأكيد الحساب', 'Confirm Account')}</h2>
              <p className="muted small" style={{ marginBottom: 18 }}>{t('راجع بياناتك وأكمل إنشاء الحساب', 'Review your info and create the account')}</p>
              <table className="table">
                <tbody>
                  <tr><th>{t('الاسم', 'Name')}</th><td>{form.first} {form.second} {form.third} {form.fourth}</td></tr>
                  <tr><th>{t('البريد الإلكتروني', 'Email')}</th><td>{form.email}</td></tr>
                  <tr><th>{t('الهاتف', 'Phone')}</th><td>{form.mobile}</td></tr>
                  <tr><th>{t('العنوان', 'Address')}</th><td>{form.address} — {form.city}</td></tr>
                  <tr><th>{t('الاهتمامات', 'Interests')}</th><td>{form.interests.join('، ') || '—'}</td></tr>
                </tbody>
              </table>
            </>
          )}

          <div style={{ marginTop: 24 }}>
            {step === 0 && (
              <>
                <h3 style={{ fontSize: 15, margin: '10px 0 2px' }}>{t('الاشتراكات (اختياري)', 'Interests (optional)')}</h3>
                <p className="muted small">{t('اختر ما يهمك من أجل تجربة أفضل', 'Pick what matters to you for a better experience')}</p>
                <div className="interest-chips">
                  {INTERESTS(t).map(({ key, label, Icon }) => (
                    <button
                      key={key}
                      type="button"
                      className={`chip ${form.interests.includes(key) ? 'active' : ''}`}
                      onClick={() => set({ interests: form.interests.includes(key) ? form.interests.filter((x) => x !== key) : [...form.interests, key] })}
                    >
                      <Icon size={15} /> {label}
                    </button>
                  ))}
                </div>
                <Check checked={form.agree} onChange={(v) => set({ agree: v })}>
                  {t('أوافق على الشروط والقوانين وسياسة الخصوصية', 'I agree to the terms, rules and privacy policy')}
                </Check>
              </>
            )}
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              {step > 0 && <button type="button" className="btn btn-outline" onClick={back}>{t('رجوع', 'Back')}</button>}
              <button className="btn btn-lime btn-block" type="submit">
                {step === 3 ? t('إنشاء الحساب', 'Create Account') : t('التالي', 'Next')} {arrow}
              </button>
            </div>
            <p className="muted small center" style={{ marginTop: 14 }}>
              {t('لديك حساب بالفعل؟', 'Already have an account?')} <Link to="/login" className="lime">{t('تسجيل الدخول', 'Login')}</Link>
            </p>
          </div>
        </form>

        <aside>
          <div className="panel panel-pad" style={{ marginBottom: 18 }}>
            <h3 className="script" style={{ fontSize: 20, color: 'var(--lime)', marginBottom: 10 }}>{t('مميزات إنشاء الحساب', 'Why create an account')}</h3>
            {[
              { Icon: Package, title: t('متتبع الطلبات', 'Order tracking'), sub: t('اعرض طلباتك في أي وقت', 'View your orders anytime') },
              { Icon: Bell, title: t('عروض حصرية', 'Exclusive offers'), sub: t('احصل على خصومات خاصة الأعضاء', 'Member-only discounts') },
              { Icon: Star, title: t('نقاط الولاء', 'Loyalty points'), sub: t('اجمع نقاط واستبدلها بخصومات', 'Earn points, redeem discounts') },
              { Icon: Zap, title: t('تجربة تسوق أسرع', 'Faster checkout'), sub: t('احفظ بياناتك لتسهيل الطلبات القادمة', 'Saved details for quicker orders') },
            ].map((p) => (
              <div className="perk" key={p.title}>
                <p.Icon />
                <div><strong>{p.title}</strong><span>{p.sub}</span></div>
              </div>
            ))}
          </div>
          <div className="panel panel-pad">
            <Mail style={{ color: 'var(--lime)' }} />
            <h3 style={{ margin: '10px 0 6px' }}>{t('أبق على تواصل', 'Stay in touch')}</h3>
            <p className="muted small" style={{ marginBottom: 14 }}>{t('احصل على آخر العروض والأخبار المثيرة', 'Get the latest offers and news')}</p>
            <div className="news-form">
              <input className="input" type="email" placeholder={t('أدخل بريدك الإلكتروني', 'Your email')} aria-label="Email" />
              <button className="news-btn" type="button" onClick={() => showToast(t('تم الاشتراك في النشرة البريدية', 'Subscribed'))}><ArrowLeft size={18} /></button>
            </div>
          </div>
          <div className="filter-promo" style={{ marginTop: 18 }}>
            <img src={heroes.storyBack} alt="" loading="lazy" />
            <div className="fp-body">
              <h3>MORE THAN<br />JUST CLOTHES.</h3>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
