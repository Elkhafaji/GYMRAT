/* GYMRAT — About page (story, vision/mission/values, personality, audience, community) */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Gem, Flag, Target, Dumbbell, Shirt, Watch, Users, UserCircle, Heart, Zap, ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { heroes, banners } from '../data/assets.js';
import { LogoMark } from '../components/ui.jsx';

export default function About() {
  const { t, isAr } = useApp();
  const arrow = isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />;

  const traits = [
    { ar: 'جريء', en: 'Bold', v: 90 },
    { ar: 'عملي', en: 'Functional', v: 95 },
    { ar: 'عصري', en: 'Modern', v: 85 },
    { ar: 'واثق من نفسه', en: 'Confident', v: 80 },
  ];

  const audience = [
    { Icon: Dumbbell, ar: 'الشغوفون بالجيم', en: 'Gym Enthusiasts', sub: t('لأصحاب الأجسام القوية والروح الرياضية', 'For strong bodies and athletic spirits') },
    { Icon: Shirt, ar: 'محبو الأوفرسايز', en: 'Oversized Lovers', sub: t('محبو ستايل الأوفرسايز & Athleisure', 'Oversized & athleisure fans') },
    { Icon: Watch, ar: 'مغامرو التحديات', en: 'Challenge Seekers', sub: t('يبحثون عن الراحة والحركة في كل خطوة', 'Comfort and motion in every step') },
    { Icon: Users, ar: 'المتدربون الجدد', en: 'New Lifters', sub: t('لخوض أول تجربة والانطلاق نحو التغيير', 'Starting their first journey of change') },
    { Icon: UserCircle, ar: 'المتخصصون والمحترفون', en: 'The Pros', sub: t('مدربون وخبراء يبحثون عن الجودة', 'Coaches and experts seeking quality') },
  ];

  return (
    <>
      {/* HERO */}
      <section className="about-hero">
        <div className="ah-img"><img src={heroes.about} alt="GYMRAT athlete" /></div>
        <div className="ah-copy">
          <div className="ph-script" style={{ insetInlineEnd: '6%', top: '14%' }}>TRAIN<br />WEAR<br />REPEAT.</div>
          <p className="eyebrow">ABOUT US</p>
          <h1 className="ph-title">{t('من نحن', 'About Us')}</h1>
          <h2 style={{ fontSize: 22, margin: '14px 0' }}>{t('أكثر من مجرد ملابس .. نحن أسلوب حياة', 'More than clothes .. a way of life')}</h2>
          <p className="ph-sub">
            {t('منذ أن بدأت GYMRAT كانت الفكرة واحدة: أن نصنع ملابس تساعدك على التحدي — من التمرين إلى الشارع، ومن الأيام الصعبة إلى صدارة النتائج. أكثر من مجرد ملابس في نسيجها شخصية أقوى.', 'Since day one, GYMRAT had one idea: make apparel that helps you take on the challenge — from training to the street, from hard days to the podium. More than clothes — identity woven into the fabric.')}
          </p>
          <p style={{ marginTop: 14 }}>
            <strong className="lime">{t('اختر طريقك. اعتمد على تفكيرك. وكن صاحب سياسة.', 'Choose your path. Trust your mind. Set your own rules.')}</strong>
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="story-block">
        <div className="story-copy">
          <p className="eyebrow">OUR STORY</p>
          <h2 className="ph-title" style={{ fontSize: 34 }}>{t('قصة البراند', 'The Brand Story')}</h2>
          <p style={{ marginTop: 16 }}>{t('يبدأ كل شيء من داخل الصالة GYMRAT ليست مجرد علامة ملابس، بل مجتمع لكل من يؤمن بأن التحدي يبدأ من الداخل — ونؤمن أن كل من يصنع كل شيء يصنع كل يوم.', 'It all starts inside the weight room. GYMRAT is not just a clothing label — it is a community for everyone who believes the challenge starts from within.')}</p>
          <p>{t('التصميم يبدأ من المزج إلى أسلوب حياة كاملة: الانضباط، والهيبة، والحركة. كل قطعة صنعتها تحمل هذه الروح وتفصلك بلمسة الجيم.', 'Design runs from the blend of fabric to a complete lifestyle: discipline, presence, and motion. Every piece carries that spirit and finishes your look with a gym touch.')}</p>
          <p style={{ marginTop: 10 }}><strong className="lime">{t('صرت اللون تصنع شيئاً مختلفاً.', 'You make something different.')}</strong></p>
          <p><strong className="lime">{t('اختر طريقك. اعتمد على تفكيرك. وكن صاحب سياسة.', 'Choose your path. Trust your thinking. Be your own policy.')}</strong></p>
        </div>
        <div className="story-img">
          <img src={heroes.storyBack} alt="GYMRAT hoodie back print" loading="lazy" />
          <div className="ph-script" style={{ top: '12%', insetInlineStart: '6%', insetInlineEnd: 'auto', textAlign: 'start' }}>
            GYMRAT<br /><span style={{ fontSize: '0.5em', fontFamily: 'var(--font-body)', letterSpacing: '0.2em' }}>BUILT DIFFERENT.<br />BUILT DISCIPLINED.</span>
          </div>
        </div>
      </section>

      {/* VISION / MISSION / VALUES */}
      <section className="section">
        <div className="container">
          <div className="collection-block-head" style={{ marginBottom: 34 }}>
            <div className="cb-copy">
              <p className="eyebrow">OUR VISION, MISSION & VALUES</p>
              <h2 className="ph-title" style={{ fontSize: 34 }}>{t('رؤيتنا ورسالتنا وقيمنا', 'Vision, Mission & Values')}</h2>
            </div>
            <div className="cb-visual" style={{ minHeight: 220 }}>
              <img src={banners.aboutValues} alt="" loading="lazy" />
              <div className="cb-script">GYMRAT</div>
            </div>
          </div>
          <div className="vmv-grid">
            <div className="vmv-card">
              <h3><Gem /> {t('القيم', 'Values')}</h3>
              <ul>
                <li>{t('الانضباط والالتزام والحماسة', 'Discipline, commitment & passion')}</li>
                <li>{t('الجودة والإبداع والتطوير المستمر', 'Quality, creativity & continuous improvement')}</li>
                <li>{t('الأصالة والدعم والتمكين', 'Authenticity, support & empowerment')}</li>
                <li>{t('الشغف والطاقة', 'Passion & energy')}</li>
                <li>{t('النظافة والإبداع', 'Clean design & creativity')}</li>
              </ul>
            </div>
            <div className="vmv-card">
              <h3><Flag /> {t('الرسالة', 'Mission')}</h3>
              <ul>
                <li>{t('توفير ملابس تجمع بين الأداء والراحة والجودة', 'Apparel that blends performance, comfort and quality')}</li>
                <li>{t('خامات مختارة وتصميم جريء', 'Selected fabrics and bold design')}</li>
                <li>{t('يمنح حضوراً لشخصية كل رياضي', 'Giving presence to every athlete’s identity')}</li>
              </ul>
            </div>
            <div className="vmv-card">
              <h3><Target /> {t('الرؤية', 'Vision')}</h3>
              <ul>
                <li>{t('أن نصبح GYMRAT رمزاً ملهماً في مجتمع الجيم والستريت وير', 'To make GYMRAT an inspiring icon in gym & streetwear culture')}</li>
                <li>{t('نحوّل الملابس إلى مصدر إلهام في كل خطوة من رحلتك', 'Turning apparel into inspiration on every step of your journey')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PERSONALITY */}
      <section className="section" style={{ background: 'var(--bg-2)', borderBlock: '1px solid var(--line-soft)' }}>
        <div className="container personality">
          <div>
            <p className="eyebrow">OUR PERSONALITY</p>
            <h2 className="ph-title" style={{ fontSize: 34 }}>{t('شخصية البراند', 'Brand Personality')}</h2>
            <p className="ph-sub" style={{ marginTop: 14 }}>
              {t('شخصية GYMRAT هي انعكاس لمجتمعنا نفسه: جريئة، عملية، عصرية، واثقة من نفسها. نتحدث بجرأة. ونقدم الأفضل. ونصمم القطع التي تعكس هذه الشخصية.', 'GYMRAT’s personality mirrors its community: bold, functional, modern and confident. We speak boldly. We deliver the best. We design pieces that carry that character.')}
            </p>
          </div>
          <div>
            {traits.map((tr) => (
              <div className="trait" key={tr.en}>
                <div className="trait-head">
                  <span>{isAr ? tr.ar : tr.en} <span className="muted">{tr.en}</span></span>
                  <b>{tr.v}%</b>
                </div>
                <div className="trait-bar"><i style={{ width: `${tr.v}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">OUR AUDIENCE</p>
          <h2 className="ph-title" style={{ fontSize: 34, marginBottom: 24 }}>{t('جمهورنا المستهدف', 'Our Audience')}</h2>
          <div className="audience-grid">
            {audience.map((a) => (
              <div className="audience-card" key={a.en}>
                <a.Icon />
                <strong>{isAr ? a.ar : a.en}</strong>
                <span>{a.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="brand-banner">
            <div className="bb-img"><img src={banners.community1} alt="" loading="lazy" /></div>
            <div className="bb-body">
              <p className="eyebrow">OUR COMMUNITY</p>
              <h2 style={{ fontSize: 30 }}>{t('مجتمعنا', 'Our Community')}</h2>
              <p>{t('نحن مجتمع GYMRAT. كل قطعة، وكل قصة، وكل جلسة تدريب تجمعنا. شاركونا رحلتهم، ويتجاوزون حدود قوتهم، ويصنعون معاً في الصالة وخارجها. إلى أن نكبر معاً.', 'We are the GYMRAT community. Every piece, every story, every session brings us together. Share your journey, push past your limits, inside the gym and out. Growing, together.')}</p>
              <div className="community-stats">
                <div className="st"><b>+50K</b><span>{t('نشط على السوشيال ميديا', 'On social media')}</span></div>
                <div className="st"><b>+12K</b><span>{t('عضو نشط', 'Active members')}</span></div>
                <div className="st"><b>+100K</b><span>{t('تفاعل شهرياً', 'Monthly engagement')}</span></div>
              </div>
            </div>
          </div>
          <div className="grid-3" style={{ marginTop: 18 }}>
            <div className="ig-tile" style={{ aspectRatio: '4/3' }}><img src={banners.community2} alt="" loading="lazy" /></div>
            <div className="ig-tile" style={{ aspectRatio: '4/3' }}><img src={banners.community3} alt="" loading="lazy" /></div>
            <div className="ig-tile" style={{ aspectRatio: '4/3', display: 'grid', placeItems: 'center', background: 'var(--panel)' }}>
              <div style={{ textAlign: 'center' }}>
                <LogoMark size={40} />
                <div className="display" style={{ fontSize: 26, marginTop: 8 }}>GYMRAT<br />COMMUNITY</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-hero" style={{ minHeight: 260 }}>
        <img className="ph-bg" src={banners.gymToStreets} alt="" />
        <div className="ph-script">BUILT<br />DIFFERENT.</div>
        <div className="ph-mark"><LogoMark size={44} /></div>
        <div className="container ph-content center" style={{ padding: '54px 0' }}>
          <h2 className="ph-title">{t('رحلتك تبدأ من هنا', 'Your journey starts here')}</h2>
          <p className="ph-sub" style={{ marginInline: 'auto' }}>{t('كن جزءاً من مجتمع GYMRAT', 'Become part of the GYMRAT community')}</p>
          <div className="hero-actions" style={{ justifyContent: 'center', marginTop: 18 }}>
            <Link to="/products" className="btn btn-lime">{t('تسوق الآن', 'Shop now')} {arrow}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
