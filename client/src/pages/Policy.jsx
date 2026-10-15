/* GYMRAT — Policy pages (privacy / terms / returns / shipping) */
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

const CONTENT = {
  privacy: (t) => ({
    title: t('سياسة الخصوصية', 'Privacy Policy'),
    body: [
      ['مقدمة', 'Introduction', 'نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية عند استخدامك متجر GYMRAT.', 'We respect your privacy and protect your personal data when you use the GYMRAT store.'],
      ['البيانات التي نجمعها', 'Data we collect', 'نجمع الاسم والبريد الإلكتروني ورقم الهاتف وعنوان التوصيل وكلمات المرور المشفّرة فقط لتشغيل حسابك وطلباتك.', 'We collect your name, email, phone, delivery address and encrypted passwords — only to run your account and orders.'],
      ['استخدام البيانات', 'How we use it', 'نستخدم البيانات لتنفيذ الطلبات، وتحسين تجربة التسوق، وإرسال العروض التي اخترتها.', 'We use data to fulfill orders, improve your experience and send offers you opted into.'],
      ['حماية البيانات', 'Protection', 'كلمات المرور مخزّنة بتجزئة آمنة (bcrypt) ولا تُرجع عبر الواجهات أبداً.', 'Passwords are stored with secure hashing (bcrypt) and are never returned by our APIs.'],
      ['التواصل', 'Contact', 'لأي استفسار: support@gymrat.com', 'Any questions: support@gymrat.com'],
    ],
  }),
  terms: (t) => ({
    title: t('الشروط والأحكام', 'Terms & Conditions'),
    body: [
      ['قبول الشروط', 'Acceptance', 'باستخدامك الموقع فأنت توافق على هذه الشروط والأحكام.', 'By using this site you agree to these terms and conditions.'],
      ['المنتجات والأسعار', 'Products & prices', 'نحرص على دقة الأسعار والصور؛ وقد تختلف الخامات قليلاً عن الصور.', 'We keep prices and images accurate; fabrics may vary slightly from photos.'],
      ['الطلبات', 'Orders', 'يتم تأكيد الطلب بعد مراجعته، ويمكننا رفض أي طلب في حال وجود خطأ واضح في السعر أو المخزون.', 'Orders are confirmed after review; we may reject an order in case of clear pricing or stock errors.'],
      ['الملكية الفكرية', 'IP', 'كل عناصر GYMRAT من شعارات وتصاميم ملك للعلامة.', 'All GYMRAT logos and designs belong to the brand.'],
    ],
  }),
  returns: (t) => ({
    title: t('سياسة الاسترجاع', 'Returns Policy'),
    body: [
      ['خلال 14 يوم', 'Within 14 days', 'يمكنك إرجاع أو استبدال أي قطعة خلال 14 يوماً من الاستلام بشرط أن تكون بحالتها الأصلية.', 'You can return or exchange any piece within 14 days of delivery, provided it is in original condition.'],
      ['الحالة المطلوبة', 'Condition', 'القطعة غير مستخدمة، بطاقاتها مرفقة، وبتغليفها الأصلي.', 'The piece must be unworn, with tags attached, in original packaging.'],
      ['طريقة الإرجاع', 'How to return', 'تواصل معنا على support@gymrat.com مع رقم الطلب وسنرتب الاستلام.', 'Email support@gymrat.com with your order number and we will arrange pickup.'],
      ['استرداد المبلغ', 'Refund', 'يتم رد المبلغ خلال 7 أيام عمل بنفس طريقة الدفع.', 'Refunds are processed within 7 business days via the original payment method.'],
    ],
  }),
  shipping: (t) => ({
    title: t('طرق الدفع والشحن', 'Payment & Shipping'),
    body: [
      ['الدفع', 'Payment', 'ندعم الدفع عند الاستلام حالياً، والدفع بالبطاقة قريباً.', 'We currently support cash on delivery; card payments are coming soon.'],
      ['الشحن', 'Shipping', 'شحن مجاني للطلبات فوق $50، وبخلاف ذلك رسوم شحن $5.', 'Free shipping over $50; otherwise a flat $5 shipping fee.'],
      ['مدة التوصيل', 'Delivery time', 'من 2 إلى 5 أيام عمل داخل المدن الرئيسية.', '2–5 business days inside major cities.'],
      ['تتبع الطلب', 'Tracking', 'يمكنك متابعة حالة طلبك من صفحة "طلباتي".', 'Track your order status from the “My Orders” page.'],
    ],
  }),
};

export default function Policy() {
  const { slug } = useParams();
  const { t, isAr } = useApp();
  const page = CONTENT[slug] ? CONTENT[slug](t) : CONTENT.privacy(t);

  return (
    <div className="container policy-body">
      <nav className="breadcrumb"><Link to="/">{t('الرئيسية', 'Home')}</Link> <span>‹</span> <span>{page.title}</span></nav>
      <h1 style={{ fontSize: 30 }}>{page.title}</h1>
      {page.body.map(([arH, enH, arP, enP], i) => (
        <section key={i}>
          <h2>{isAr ? arH : enH}</h2>
          <p>{isAr ? arP : enP}</p>
        </section>
      ))}
    </div>
  );
}
