// GYMRAT — central asset path mapping (no Base64; files served from /public/assets)
const A = (p) => `/assets/${p}`;

export const brand = {
  logo: A('brand/logo.svg'),
  mark: A('brand/logo-mark.svg'),
  markLime: A('brand/logo-mark-lime.svg'),
};

export const heroes = {
  homeSlide1: A('heroes/home-slide-1.jpg'),
  homeSlide2: A('heroes/home-slide-2.jpg'),
  homeSlide3: A('heroes/home-slide-3.jpg'),
  tshirts: A('heroes/tshirts.jpg'),
  street: A('heroes/street.jpg'),
  performance: A('heroes/performance.jpg'),
  core: A('heroes/core.jpg'),
  about: A('heroes/about.jpg'),
  storyBack: A('models/story-back.jpg'),
};

export const products = {
  coreTee: A('products/core-tee.jpg'),
  motionTee: A('products/motion-tee.jpg'),
  logoTee: A('products/logo-tee.jpg'),
  essentialTee: A('products/essential-tee.jpg'),
  disciplineTee: A('products/discipline-tee.jpg'),
  performanceTank: A('products/performance-tank.jpg'),
  minimalTee: A('products/minimal-tee.jpg'),
  graphicTee: A('products/graphic-tee.jpg'),
  oversizedTee: A('products/oversized-tee.jpg'),
  streetGraphicTee: A('products/street-graphic-tee.jpg'),
  longSleeveTee: A('products/long-sleeve-tee.jpg'),
  performanceTee: A('products/performance-tee.jpg'),
  compressionLongsleeve: A('products/compression-longsleeve.jpg'),
  trainingTank: A('products/training-tank.jpg'),
  disciplineHoodie: A('products/discipline-hoodie.jpg'),
  urbanHoodie: A('products/urban-hoodie.jpg'),
  graffitiHoodie: A('products/graffiti-hoodie.jpg'),
  zipHoodie: A('products/zip-hoodie.jpg'),
  minimalHoodie: A('products/minimal-hoodie.jpg'),
  essentialsHoodie: A('products/essentials-hoodie.jpg'),
  performanceHoodie: A('products/performance-hoodie.jpg'),
  trainingHoodie: A('products/training-hoodie.jpg'),
  cargoPants: A('products/cargo-pants.jpg'),
  grindPants: A('products/grind-pants.jpg'),
  straightPants: A('products/straight-pants.jpg'),
  utilityCargoPants: A('products/utility-cargo-pants.jpg'),
  performancePants: A('products/performance-pants.jpg'),
  streetSweatpants: A('products/street-sweatpants.jpg'),
  trainingShorts: A('products/training-shorts.jpg'),
  ratCap: A('products/rat-cap.jpg'),
  streetCap: A('products/street-cap.jpg'),
  gymDuffle: A('products/gym-duffle.jpg'),
  gymSocks: A('products/gym-socks.jpg'),
};

export const categories = {
  tshirts: A('categories/tshirts.jpg'),
  hoodies: A('categories/hoodies.jpg'),
  pants: A('categories/pants.jpg'),
  shorts: A('categories/shorts.jpg'),
  accessories: A('categories/accessories.jpg'),
};

export const banners = {
  fabric1: A('banners/fabric-1.jpg'),
  fabric2: A('banners/fabric-2.jpg'),
  qualityDetail: A('banners/quality-detail.jpg'),
  gymToStreets: A('banners/gym-to-streets.jpg'),
  moreThanClothes: A('banners/more-than-clothes.jpg'),
  limited: A('banners/limited.jpg'),
  aboutValues: A('banners/about-values.jpg'),
  community1: A('banners/community-1.jpg'),
  community2: A('banners/community-2.jpg'),
  community3: A('banners/community-3.jpg'),
  cartHero: A('banners/cart-hero.jpg'),
  contactHero: A('banners/contact-hero.jpg'),
  registerHero: A('banners/register-hero.jpg'),
  collectionsHero: A('banners/collections-hero.jpg'),
  ctaCap: A('banners/cta-cap.jpg'),
  aboutStory: A('banners/about-story.jpg'),
  heroGeneric: A('banners/hero-generic.jpg'),
  ig: [A('banners/ig-1.jpg'), A('banners/ig-2.jpg'), A('banners/ig-3.jpg'), A('banners/ig-4.jpg'), A('banners/ig-5.jpg'), A('banners/ig-6.jpg')],
};

export default { brand, heroes, products, categories, banners };
