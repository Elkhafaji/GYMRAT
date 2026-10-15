// GYMRAT — database seed (idempotent upserts). Run: node prisma/seed.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const sizesApparel = ['S', 'M', 'L', 'XL', 'XXL'];
const sizesOne = ['ONE SIZE'];
const C = {
  black: { name: 'أسود', nameEn: 'Black', hex: '#1a1a1a' },
  grey: { name: 'رمادي', nameEn: 'Grey', hex: '#6f6f6f' },
  white: { name: 'أبيض', nameEn: 'White', hex: '#e8e8e3' },
  beige: { name: 'بيج', nameEn: 'Beige', hex: '#cbb99a' },
  lime: { name: 'ليموني', nameEn: 'Lime', hex: '#87f52b' },
  olive: { name: 'زيتي', nameEn: 'Olive', hex: '#5f6b3a' },
};

const categories = [
  { slug: 'tshirts', name: 'T-Shirts', nameAr: 'تشيرتات', icon: 'shirt', sortOrder: 1, image: '/assets/categories/tshirts.jpg' },
  { slug: 'hoodies', name: 'Hoodies', nameAr: 'هوديز', icon: 'hoodie', sortOrder: 2, image: '/assets/categories/hoodies.jpg' },
  { slug: 'pants', name: 'Pants', nameAr: 'بنطالونات', icon: 'pants', sortOrder: 3, image: '/assets/categories/pants.jpg' },
  { slug: 'shorts', name: 'Shorts', nameAr: 'شورتات', icon: 'shorts', sortOrder: 4, image: '/assets/categories/shorts.jpg' },
  { slug: 'caps', name: 'Caps', nameAr: 'كابات', icon: 'cap', sortOrder: 5, image: '/assets/categories/accessories.jpg' },
  { slug: 'bags', name: 'Bags', nameAr: 'شنط', icon: 'bag', sortOrder: 6, image: '/assets/categories/accessories.jpg' },
  { slug: 'accessories', name: 'Accessories', nameAr: 'إكسسوارات', icon: 'socks', sortOrder: 7, image: '/assets/categories/accessories.jpg' },
];

const collections = [
  {
    slug: 'core', name: 'Core Collection', nameAr: 'المجموعة الأساسية', eyebrow: '01 / CORE COLLECTION', eyebrowAr: '01 / المجموعة الأساسية',
    tagline: 'ESSENTIALS FOR EVERYDAY DISCIPLINE.', taglineAr: 'أساسيات للانضباط اليومي.',
    description: 'Classic pieces with clean lines and durable fabrics. GYMRAT essentials that follow you at every step.',
    descriptionAr: 'قطع أساسية بخطوط نظيفة وخامات متينة. قطع GYMRAT الأساسية التي ترافقك في كل خطوة.',
    image: '/assets/heroes/core.jpg', sortOrder: 1,
  },
  {
    slug: 'performance', name: 'Performance Collection', nameAr: 'مجموعة الأداء', eyebrow: '02 / PERFORMANCE COLLECTION', eyebrowAr: '02 / مجموعة الأداء',
    tagline: 'BUILT FOR MOVEMENT', taglineAr: 'مصممة للحركة',
    description: 'Premium sportswear with dynamic fabrics that give you performance and comfort in every workout you take on.',
    descriptionAr: 'ملابس رياضية عالية الجودة بخامات ديناميكية تمنحك الأداء والراحة في كل تمرين تتخذه.',
    image: '/assets/heroes/performance.jpg', sortOrder: 2,
  },
  {
    slug: 'street-discipline', name: 'Street Discipline', nameAr: 'مجموعة الشارع', eyebrow: 'STREET DISCIPLINE COLLECTION', eyebrowAr: 'مجموعة الشارع',
    tagline: 'NOT JUST GYM WEAR.', taglineAr: 'ليس فقط ملابس جيم.',
    description: 'Relaxed pieces with bold attitude and precise details that fit you on the street or outside the gym.',
    descriptionAr: 'قطع مريحة بستايل واسع وتفاصيل دقيقة تناسبك في الشارع أو خارج صالة الجيم.',
    image: '/assets/heroes/street.jpg', sortOrder: 3,
  },
  {
    slug: 'limited', name: 'Limited Edition', nameAr: 'إصدارات محدودة', eyebrow: '04 / LIMITED EDITION', eyebrowAr: '04 / إصدارات محدودة',
    tagline: 'LIMITED QUANTITIES.', taglineAr: 'كميات محدودة.',
    description: 'Special drops with unique pieces. Once they are gone they never come back — do not wait before stock runs out.',
    descriptionAr: 'تصاميم خاصة بكل قطعة متوفرة. لا تتردد قبل نفاد الكمية.',
    image: '/assets/banners/limited.jpg', sortOrder: 4,
  },
];

// [slug, name, subtitle, subtitleAr, price, compareAt, cat, collections, badge, rating, reviews, image, colors, sizes, tags, featured, bestSeller]
const P = (o) => o;
const products = [
  P({ slug: 'core-tee', name: 'Core Tee', subtitle: 'Essential tee', subtitleAr: 'تشيرت أساسي', price: 29.99, category: 'tshirts', collections: ['core'], badge: 'bestseller', rating: 4.8, reviewCount: 124, image: '/assets/products/core-tee.jpg', colors: [C.black, C.grey, C.white], featured: true, bestSeller: true, material: '100% combed cotton', materialAr: 'قطن ممشط 100%', tags: ['soft', 'everyday'], description: 'Ultra-soft basic tee with a modern cut that suits every body. Built for training, made for every day.', descriptionAr: 'تيشيرت أساسي فائق النعومة، قصة عصرية تناسب جميع الأجسام.' }),
  P({ slug: 'motion-tee', name: 'Motion Tee', subtitle: 'Sport tee', subtitleAr: 'تشيرت رياضي', price: 32.99, category: 'tshirts', collections: [], badge: 'new', rating: 4.7, reviewCount: 98, image: '/assets/products/motion-tee.jpg', colors: [C.grey, C.black, C.white], material: 'Cotton blend stretch', materialAr: 'مزيج قطن مرن', tags: ['soft', 'stretch'], description: 'Sport-cut tee with four-way stretch that keeps up with every rep.', descriptionAr: 'تشيرت رياضي بقصة مرنة تتحرك معك في كل حركة.' }),
  P({ slug: 'logo-tee', name: 'Logo Tee', subtitle: 'Back print tee', subtitleAr: 'تشيرت بطباعة خلفية', price: 34.99, category: 'tshirts', collections: ['limited'], badge: 'bestseller', rating: 4.9, reviewCount: 176, image: '/assets/products/logo-tee.jpg', colors: [C.black, C.white], featured: true, material: 'Heavy cotton', materialAr: 'قطن ثقيل', tags: ['graphic', 'street'], description: 'Signature GYMRAT back print on heavyweight cotton. The icon of the family.', descriptionAr: 'طباعة GYMRAT الخلفية على قطن ثقيل. أيقونة العائلة.' }),
  P({ slug: 'essential-tee', name: 'Essential Tee', subtitle: 'Essential tee', subtitleAr: 'تشيرت أساسي', price: 27.99, category: 'tshirts', collections: ['core'], badge: 'new', rating: 4.6, reviewCount: 87, image: '/assets/products/essential-tee.jpg', colors: [C.white, C.beige, C.black], material: '100% combed cotton', materialAr: 'قطن ممشط 100%', tags: ['soft', 'everyday'], description: 'Clean off-white essential with a tiny chest mark. Quiet, sharp, everyday.', descriptionAr: 'تشيرت أساسي أوف وايت بعلامة صدر صغيرة. هادئ، حاد، يومي.' }),
  P({ slug: 'discipline-tee', name: 'Discipline Tee', subtitle: 'Discipline spirit tee', subtitleAr: 'تشيرت بروح الانضباط', price: 36.99, category: 'tshirts', collections: ['limited'], badge: 'bestseller', rating: 4.8, reviewCount: 132, image: '/assets/products/discipline-tee.jpg', colors: [C.black, C.white], material: 'Heavy cotton', materialAr: 'قطن ثقيل', tags: ['graphic', 'street'], description: 'Built Different back print. Wear the mindset.', descriptionAr: 'طباعة "Built Different" الخلفية. ارتدِ العقلية.' }),
  P({ slug: 'performance-tank', name: 'Performance Tank', subtitle: 'Sleeveless tee', subtitleAr: 'تيشيرت بدون أكمام', price: 24.99, category: 'tshirts', collections: ['performance'], rating: 4.5, reviewCount: 64, image: '/assets/products/performance-tank.jpg', colors: [C.black, C.grey], material: 'Dry-FIT mesh', materialAr: 'شبك Dry-FIT', tags: ['breathable', 'lightweight', 'dryfit'], description: 'Stringer tank with full range of motion for heavy days.', descriptionAr: 'تانك بدون أكمام بحرية حركة كاملة لأيام الحديد.' }),
  P({ slug: 'minimal-tee', name: 'Minimal Tee', subtitle: 'Minimal tee', subtitleAr: 'تيشيرت بسيطة', price: 28.99, category: 'tshirts', collections: [], badge: 'bestseller', rating: 4.7, reviewCount: 103, image: '/assets/products/minimal-tee.jpg', colors: [C.grey, C.black], material: 'Combed cotton', materialAr: 'قطن ممشط', tags: ['soft', 'everyday'], description: 'Nothing extra. Just a perfect tee with a tiny neck mark.', descriptionAr: 'بدون أي إضافات. فقط تيشيرت مثالي بعلامة رقبة صغيرة.' }),
  P({ slug: 'graphic-tee', name: 'Graphic Tee', subtitle: 'Sport graphic tee', subtitleAr: 'تيشيرت رياضي', price: 33.99, category: 'tshirts', collections: ['street-discipline'], badge: 'new', rating: 4.6, reviewCount: 91, image: '/assets/products/graphic-tee.jpg', colors: [C.black, C.white], material: 'Heavy cotton', materialAr: 'قطن ثقيل', tags: ['graphic', 'street'], description: 'Bold street graphic with the GYMRAT attitude.', descriptionAr: 'جرافيكي جريء بروح GYMRAT.' }),
  P({ slug: 'oversized-tee', name: 'Oversized Tee', subtitle: 'Wide drop-shoulder tee', subtitleAr: 'تيشيرت واسع', price: 24.99, compareAt: 34.99, category: 'tshirts', collections: ['street-discipline'], badge: 'sale', bestSeller: true, rating: 4.8, reviewCount: 143, image: '/assets/products/oversized-tee.jpg', colors: [C.black, C.grey, C.white], material: 'Heavy cotton', materialAr: 'قطن ثقيل', tags: ['oversized', 'street', 'soft'], description: 'Drop-shoulder oversized silhouette. The street uniform.', descriptionAr: 'قصة أوفرسايز بأكتاف منسدلة. زي الشارع الرسمي.' }),
  P({ slug: 'street-graphic-tee', name: 'Street Graphic Tee', subtitle: 'Street spirit tee', subtitleAr: 'تشيرت بروح الشارع', price: 27.99, category: 'tshirts', collections: ['street-discipline'], badge: 'new', rating: 4.6, reviewCount: 92, image: '/assets/products/street-graphic-tee.jpg', colors: [C.black, C.white], material: 'Heavy cotton', materialAr: 'قطن ثقيل', tags: ['graphic', 'street'], description: 'Lion graphic, street attitude.', descriptionAr: 'جرافيكي أسد، بروح الشارع.' }),
  P({ slug: 'long-sleeve-tee', name: 'Long Sleeve Tee', subtitle: 'Long sleeve tee', subtitleAr: 'تشيرت بأكمام طويلة', price: 29.99, category: 'tshirts', collections: ['street-discipline'], rating: 4.7, reviewCount: 78, image: '/assets/products/long-sleeve-tee.jpg', colors: [C.black, C.grey], material: 'Cotton jersey', materialAr: 'جيرسي قطني', tags: ['street', 'everyday'], description: 'Layer it or wear it solo. All-day street piece.', descriptionAr: 'البسه وحده أو طبّقه. قطعة شارع لكل اليوم.' }),
  P({ slug: 'performance-tee', name: 'Performance Tee', subtitle: 'Performance tee', subtitleAr: 'تيشيرت أداء', price: 24.99, category: 'tshirts', collections: ['performance'], badge: 'bestseller', bestSeller: true, rating: 4.8, reviewCount: 124, image: '/assets/products/performance-tee.jpg', colors: [C.black, C.grey, C.white], material: 'Dry-FIT', materialAr: 'Dry-FIT', tags: ['dryfit', 'breathable', 'lightweight'], description: 'Dry-FIT training tee that moves sweat away and keeps you light.', descriptionAr: 'تيشيرت تدريب Dry-FIT يبعد العرق ويبقيك خفيفاً.' }),

  P({ slug: 'discipline-hoodie', name: 'Discipline Hoodie', subtitle: 'Heavyweight hoodie', subtitleAr: 'هودي انضباط', price: 49.99, category: 'hoodies', collections: ['core', 'street-discipline'], badge: 'bestseller', bestSeller: true, rating: 4.8, reviewCount: 132, image: '/assets/products/discipline-hoodie.jpg', colors: [C.black, C.grey], featured: true, material: '450gsm brushed fleece', materialAr: 'فليس مفرش 450 غرام', tags: ['heavyweight', 'warm', 'street'], description: '450gsm heavyweight hoodie. Built to last, built to discipline.', descriptionAr: 'هودي ثقيل 450 غرام. مصنوع ليدوم، وصنع للانضباط.' }),
  P({ slug: 'urban-hoodie', name: 'Urban Hoodie', subtitle: 'Urban hoodie', subtitleAr: 'هودي عصري', price: 32.99, category: 'hoodies', collections: ['street-discipline'], badge: 'new', rating: 4.6, reviewCount: 87, image: '/assets/products/urban-hoodie.jpg', colors: [C.grey, C.black, C.beige], material: 'Fleece blend', materialAr: 'مزيج فليس', tags: ['street', 'warm'], description: 'City-ready hoodie with a clean urban cut.', descriptionAr: 'هودي جاهز للمدينة بقصة عصرية نظيفة.' }),
  P({ slug: 'graffiti-hoodie', name: 'Graffiti Hoodie', subtitle: 'Graffiti hoodie', subtitleAr: 'هودي جرافيتي', price: 36.99, category: 'hoodies', collections: ['street-discipline', 'limited'], rating: 4.7, reviewCount: 96, image: '/assets/products/graffiti-hoodie.jpg', colors: [C.black], material: 'Fleece', materialAr: 'فليس', tags: ['graphic', 'street', 'heavyweight'], description: 'Back graffiti print with raw street energy.', descriptionAr: 'طباعة جرافيتي خلفية بطاقة شارع خام.' }),
  P({ slug: 'zip-hoodie', name: 'Zip Hoodie', subtitle: 'Zip-up hoodie', subtitleAr: 'هودي بسحاب', price: 39.99, category: 'hoodies', collections: ['street-discipline', 'limited'], rating: 4.5, reviewCount: 71, image: '/assets/products/zip-hoodie.jpg', colors: [C.black, C.grey], material: 'Fleece blend', materialAr: 'مزيج فليس', tags: ['street', 'warm', 'layering'], description: 'Full-zip hoodie for fast layering between sets and streets.', descriptionAr: 'هودي بسحاب كامل للطبقات السريعة بين الأطوال والشارع.' }),
  P({ slug: 'minimal-hoodie', name: 'Minimal Hoodie', subtitle: 'Minimal hoodie', subtitleAr: 'هودي بسيط', price: 49.99, category: 'hoodies', collections: ['core'], badge: 'new', rating: 4.5, reviewCount: 64, image: '/assets/products/minimal-hoodie.jpg', colors: [C.black, C.grey], material: '450gsm fleece', materialAr: 'فليس 450 غرام', tags: ['heavyweight', 'everyday'], description: 'Zero-noise heavyweight hoodie with a tiny logo.', descriptionAr: 'هودي ثقيل بلا ضجيج بعلامة صغيرة.' }),
  P({ slug: 'essentials-hoodie', name: 'Essentials Hoodie', subtitle: 'Essential hoodie', subtitleAr: 'هودي أساسي', price: 49.99, category: 'hoodies', collections: ['core'], rating: 4.6, reviewCount: 95, image: '/assets/products/essentials-hoodie.jpg', colors: [C.grey, C.black], material: '450gsm fleece', materialAr: 'فليس 450 غرام', tags: ['heavyweight', 'everyday', 'warm'], description: 'The everyday heavyweight layer.', descriptionAr: 'الطبقة الثقيلية اليومية.' }),
  P({ slug: 'performance-hoodie', name: 'Performance Hoodie', subtitle: 'Performance hoodie', subtitleAr: 'هودي أداء', price: 44.99, category: 'hoodies', collections: ['performance'], badge: 'bestseller', rating: 4.8, reviewCount: 112, image: '/assets/products/performance-hoodie.jpg', colors: [C.grey, C.black], material: 'Tech fleece Dry-FIT', materialAr: 'فليس تقني Dry-FIT', tags: ['dryfit', 'breathable', 'lightweight'], description: 'Warm-up hoodie engineered for movement and breathability.', descriptionAr: 'هودي إحماء مهندس للحركة والتهوية.' }),
  P({ slug: 'training-hoodie', name: 'Training Hoodie', subtitle: 'Training hoodie', subtitleAr: 'هودي تدريب', price: 44.99, category: 'hoodies', collections: ['performance'], rating: 4.7, reviewCount: 93, image: '/assets/products/training-hoodie.jpg', colors: [C.black, C.olive], material: 'Tech fleece', materialAr: 'فليس تقني', tags: ['dryfit', 'warm', 'training'], description: 'Cold-morning training companion.', descriptionAr: 'رفيك تدريب الصباح البارد.' }),

  P({ slug: 'cargo-pants', name: 'Cargo Pants', subtitle: 'Cargo pants', subtitleAr: 'بنطالون كارجو', price: 44.99, compareAt: 59.99, category: 'pants', collections: ['street-discipline', 'core'], badge: 'sale', bestSeller: true, rating: 4.6, reviewCount: 87, image: '/assets/products/cargo-pants.jpg', colors: [C.black, C.beige], featured: true, material: 'Ripstop cotton', materialAr: 'قطن ريبستوب', tags: ['street', 'utility', 'durable'], description: 'Utility cargos with deep pockets and a wide-leg cut.', descriptionAr: 'بنطالون كارجو عملي بجيوب عميقة وقصة واسعة.' }),
  P({ slug: 'grind-pants', name: 'Grind Pants', subtitle: 'Training pants', subtitleAr: 'بنطالون جرايند', price: 39.99, category: 'pants', collections: [], featured: true, bestSeller: true, rating: 4.7, reviewCount: 85, image: '/assets/products/grind-pants.jpg', colors: [C.black, C.grey], material: 'Cotton twill', materialAr: 'تويل قطني', tags: ['everyday', 'training'], description: 'Daily grind pants — gym to street without changing.', descriptionAr: 'بنطالون الجريند اليومي — من الجيم إلى الشارع دون تغيير.' }),
  P({ slug: 'straight-pants', name: 'Straight Pants', subtitle: 'Straight fit pants', subtitleAr: 'بنطالون مستقيم', price: 39.99, category: 'pants', collections: ['core'], rating: 4.6, reviewCount: 87, image: '/assets/products/straight-pants.jpg', colors: [C.grey, C.black], material: 'Cotton twill', materialAr: 'تويل قطني', tags: ['everyday'], description: 'Clean straight fit with a structured drape.', descriptionAr: 'قصة مستقيمة نظيفة بانسياب منظم.' }),
  P({ slug: 'utility-cargo-pants', name: 'Utility Cargo Pants', subtitle: 'Utility cargo pants', subtitleAr: 'بنطالون كارجو عملي', price: 44.99, category: 'pants', collections: ['core'], rating: 4.5, reviewCount: 71, image: '/assets/products/utility-cargo-pants.jpg', colors: [C.beige, C.black], material: 'Ripstop cotton', materialAr: 'قطن ريبستوب', tags: ['utility', 'durable'], description: 'Stone-wash utility cargos built to work.', descriptionAr: 'كارجو عملي بغسل حجري مصنوع للعمل.' }),
  P({ slug: 'performance-pants', name: 'Performance Pants', subtitle: 'Performance pants', subtitleAr: 'بنطالون أداء', price: 36.99, category: 'pants', collections: ['performance'], bestSeller: true, rating: 4.8, reviewCount: 51, image: '/assets/products/performance-pants.jpg', colors: [C.grey, C.black], material: 'Dry-FIT woven', materialAr: 'نسيج Dry-FIT', tags: ['dryfit', 'lightweight', 'training'], description: 'Tapered training pants with zero drag.', descriptionAr: 'بنطالون تدريب مدبب بدون أي مقاومة.' }),
  P({ slug: 'street-sweatpants', name: 'Street Sweatpants', subtitle: 'Sweatpants', subtitleAr: 'سروال رياضي', price: 34.99, category: 'pants', collections: ['street-discipline'], rating: 4.5, reviewCount: 83, image: '/assets/products/street-sweatpants.jpg', colors: [C.black, C.grey], material: 'Brushed fleece', materialAr: 'فليس مفرش', tags: ['street', 'warm', 'soft'], description: 'Heavyweight sweatpants with a wide street fit.', descriptionAr: 'سروال رياضي ثقيل بقصة شارع واسعة.' }),

  P({ slug: 'training-shorts', name: 'Training Shorts', subtitle: 'Training shorts', subtitleAr: 'شورت تدريب', price: 28.99, category: 'shorts', collections: ['core', 'performance'], featured: true, bestSeller: true, rating: 4.7, reviewCount: 93, image: '/assets/products/training-shorts.jpg', colors: [C.black, C.grey], material: 'Dry-FIT woven', materialAr: 'نسيج Dry-FIT', tags: ['dryfit', 'lightweight', 'training'], description: '7" training shorts with liner and zip pocket.', descriptionAr: 'شورت تدريب 7 بوصات بطانة وجيوب سحاب.' }),

  P({ slug: 'rat-cap', name: 'Rat Cap', subtitle: 'GYMRAT cap', subtitleAr: 'كاب جيم رات', price: 19.99, category: 'caps', collections: ['core'], featured: true, bestSeller: true, rating: 4.7, reviewCount: 85, image: '/assets/products/rat-cap.jpg', colors: [C.black, C.grey], sizes: sizesOne, material: 'Cotton twill', materialAr: 'تويل قطني', tags: ['street', 'everyday'], description: 'Structured 6-panel cap with the triangle mark.', descriptionAr: 'كاب 6 قطع منظم بعلامة المثلث.' }),
  P({ slug: 'street-cap', name: 'Street Cap', subtitle: 'Street cap', subtitleAr: 'كاب ستريت', price: 19.99, category: 'caps', collections: ['street-discipline'], rating: 4.6, reviewCount: 59, image: '/assets/products/street-cap.jpg', colors: [C.black], sizes: sizesOne, material: 'Cotton twill', materialAr: 'تويل قطني', tags: ['street'], description: 'Low-profile street cap.', descriptionAr: 'كاب شارع منخفض الحواف.' }),
  P({ slug: 'gym-duffle', name: 'Gym Duffle', subtitle: 'Gym bag', subtitleAr: 'شنطة جيم', price: 39.99, category: 'bags', collections: ['street-discipline', 'core'], rating: 4.7, reviewCount: 64, image: '/assets/products/gym-duffle.jpg', colors: [C.black], sizes: sizesOne, material: 'Water-resistant polyester', materialAr: 'بوليستر مقاوم للماء', tags: ['utility', 'durable', 'waterproof'], description: 'Water-resistant duffle that swallows the whole session.', descriptionAr: 'شنطة مقاومة للماء تتسع لكامل التمرين.' }),
  P({ slug: 'gym-socks', name: 'Gym Socks (3 Pack)', subtitle: 'Crew socks 3-pack', subtitleAr: 'جوارب (3 قطع)', price: 14.99, category: 'accessories', collections: ['street-discipline', 'core'], rating: 4.8, reviewCount: 76, image: '/assets/products/gym-socks.jpg', colors: [C.black, C.white], sizes: sizesOne, material: 'Combed cotton blend', materialAr: 'مزيج قطن ممشط', tags: ['soft', 'everyday'], description: '3-pack crew socks, cushioned for heavy days.', descriptionAr: '3 قطع جوارب مبطنة لأيام الحديد.' }),
];

async function main() {
  for (const c of categories) {
    await prisma.category.upsert({ where: { slug: c.slug }, update: c, create: c });
  }
  for (const c of collections) {
    await prisma.collection.upsert({ where: { slug: c.slug }, update: c, create: c });
  }

  for (const p of products) {
    const cat = await prisma.category.findUnique({ where: { slug: p.category } });
    const data = {
      name: p.name,
      subtitle: p.subtitle,
      subtitleAr: p.subtitleAr,
      description: p.description,
      descriptionAr: p.descriptionAr,
      price: p.price,
      compareAtPrice: p.compareAt ?? null,
      stock: 100,
      rating: p.rating,
      reviewCount: p.reviewCount,
      badge: p.badge ?? null,
      featured: !!p.featured,
      bestSeller: !!p.bestSeller,
      material: p.material,
      materialAr: p.materialAr,
      image: p.image,
      tags: (p.tags || []).join(','),
      categoryId: cat.id,
    };
    const product = await prisma.product.upsert({ where: { slug: p.slug }, update: data, create: { ...data, slug: p.slug } });

    // collections m2m
    const colIds = [];
    for (const slug of p.collections) {
      const col = await prisma.collection.findUnique({ where: { slug } });
      if (col) colIds.push({ id: col.id });
    }
    await prisma.product.update({ where: { id: product.id }, data: { collections: { set: colIds } } });

    // gallery: primary + one derived angle (quality-detail as fabric close-up)
    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    const gallery = [p.image, '/assets/banners/fabric-1.jpg', '/assets/banners/quality-detail.jpg'];
    for (let i = 0; i < gallery.length; i++) {
      await prisma.productImage.create({ data: { productId: product.id, url: gallery[i], alt: `${p.name} — view ${i + 1}`, sortOrder: i } });
    }

    // variants
    await prisma.productVariant.deleteMany({ where: { productId: product.id } });
    const sizes = p.sizes || sizesApparel;
    const colors = p.colors || [C.black];
    for (const s of sizes) {
      for (const col of colors) {
        await prisma.productVariant.create({
          data: {
            productId: product.id,
            size: s,
            color: col.name,
            colorHex: col.hex,
            stock: 25,
            sku: `${p.slug.toUpperCase()}-${s}-${col.nameEn.toUpperCase()}`,
          },
        });
      }
    }
  }
  console.log(`Seeded ${categories.length} categories, ${collections.length} collections, ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
