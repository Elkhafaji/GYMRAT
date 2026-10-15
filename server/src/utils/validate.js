import { z } from 'zod';

export function validate(schema, source = 'body') {
  return (req, res, next) => {
    const parsed = schema.safeParse(req[source]);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'validation_error',
        message: 'Validation failed',
        issues: parsed.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
      });
    }
    req[source === 'body' ? 'body' : source] = parsed.data;
    next();
  };
}

export const registerSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  phone: z.string().max(20).optional().or(z.literal('')),
  gender: z.string().max(20).optional().or(z.literal('')),
  birthDate: z.string().max(20).optional().or(z.literal('')),
  interests: z.string().max(200).optional().or(z.literal('')),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const cartAddSchema = z.object({
  productId: z.number().int().positive(),
  size: z.string().min(1).max(20).default('M'),
  color: z.string().min(1).max(40).default('أسود'),
  quantity: z.number().int().min(1).max(20).default(1),
});

export const orderSchema = z.object({
  fullName: z.string().min(2).max(120),
  phone: z.string().min(5).max(20),
  line1: z.string().min(3).max(200),
  city: z.string().min(2).max(80),
  country: z.string().min(2).max(60).default('EG'),
  notes: z.string().max(500).optional().or(z.literal('')),
  paymentMethod: z.enum(['cod', 'card']).default('cod'),
  couponCode: z.string().max(40).optional().or(z.literal('')),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  topic: z.string().min(2).max(60),
  message: z.string().min(5).max(2000),
});

export const newsletterSchema = z.object({ email: z.string().email() });
