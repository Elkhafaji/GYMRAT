import prisma from '../services/db.js';

const SORTS = {
  bestselling: [{ bestSeller: 'desc' }, { reviewCount: 'desc' }],
  newest: [{ createdAt: 'desc' }],
  'price-asc': [{ price: 'asc' }],
  'price-desc': [{ price: 'desc' }],
  rating: [{ rating: 'desc' }],
};

export async function listProducts(req, res) {
  const q = req.query;
  const where = {};
  if (q.category) {
    const slugs = String(q.category).split(',').filter(Boolean);
    where.category = { slug: { in: slugs } };
  }
  if (q.collection) where.collections = { some: { slug: String(q.collection) } };
  if (q.search) {
    const s = String(q.search);
    where.OR = [
      { name: { contains: s } },
      { subtitleAr: { contains: s } },
      { subtitle: { contains: s } },
      { descriptionAr: { contains: s } },
    ];
  }
  if (q.badge) where.badge = String(q.badge);
  if (q.bestSeller === '1' || q.bestSeller === 'true') where.bestSeller = true;
  if (q.featured === '1' || q.featured === 'true') where.featured = true;
  if (q.minPrice || q.maxPrice) {
    where.price = {};
    if (q.minPrice) where.price.gte = Number(q.minPrice);
    if (q.maxPrice) where.price.lte = Number(q.maxPrice);
  }
  if (q.size) where.variants = { some: { size: String(q.size) } };
  if (q.color) where.variants = { some: { color: String(q.color) } };
  if (q.tag) {
    const tags = String(q.tag).split(',').filter(Boolean);
    where.AND = tags.map((t) => ({ tags: { contains: t } }));
  }

  const orderBy = SORTS[String(q.sort || 'bestselling')] || SORTS.bestselling;
  const take = q.limit ? Math.min(Number(q.limit), 60) : undefined;

  const products = await prisma.product.findMany({
    where,
    orderBy,
    take,
    include: {
      category: true,
      variants: true,
      collections: { select: { slug: true, name: true, nameAr: true } },
    },
  });
  res.json({ products });
}

export async function getProduct(req, res) {
  const product = await prisma.product.findUnique({
    where: { slug: req.params.slug },
    include: {
      category: true,
      images: { orderBy: { sortOrder: 'asc' } },
      variants: true,
      collections: true,
    },
  });
  if (!product) return res.status(404).json({ error: 'not_found', message: 'Product not found' });

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id } },
    take: 4,
    include: { variants: true, category: true },
    orderBy: [{ bestSeller: 'desc' }, { reviewCount: 'desc' }],
  });
  res.json({ product, related });
}

export async function listCategories(_req, res) {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { products: true } } },
  });
  res.json({
    categories: categories.map((c) => ({
      id: c.id, slug: c.slug, name: c.name, nameAr: c.nameAr, icon: c.icon, image: c.image,
      productCount: c._count.products,
    })),
  });
}

export async function getCategory(req, res) {
  const category = await prisma.category.findUnique({
    where: { slug: req.params.slug },
    include: { _count: { select: { products: true } } },
  });
  if (!category) return res.status(404).json({ error: 'not_found', message: 'Category not found' });
  res.json({ category: { ...category, productCount: category._count.products } });
}

export async function listCollections(_req, res) {
  const collections = await prisma.collection.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { products: true } }, products: { take: 5, include: { variants: true } } },
  });
  res.json({ collections });
}

export async function getCollection(req, res) {
  const collection = await prisma.collection.findUnique({
    where: { slug: req.params.slug },
    include: {
      _count: { select: { products: true } },
      products: { include: { variants: true, category: true } },
    },
  });
  if (!collection) return res.status(404).json({ error: 'not_found', message: 'Collection not found' });
  res.json({ collection });
}
