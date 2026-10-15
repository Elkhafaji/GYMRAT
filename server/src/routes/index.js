import { Router } from 'express';
import * as auth from '../controllers/authController.js';
import * as catalog from '../controllers/catalogController.js';
import * as cart from '../controllers/cartController.js';
import * as orders from '../controllers/orderController.js';
import * as wishlist from '../controllers/wishlistController.js';
import * as misc from '../controllers/miscController.js';
import { requireAuth } from '../middleware/auth.js';
import {
  validate, registerSchema, loginSchema, cartAddSchema, orderSchema, contactSchema, newsletterSchema,
} from '../utils/validate.js';

const router = Router();

router.get('/health', misc.health);

// Auth
router.post('/auth/register', validate(registerSchema), auth.register);
router.post('/auth/login', validate(loginSchema), auth.login);
router.post('/auth/logout', auth.logout);
router.get('/auth/me', requireAuth, auth.me);
router.patch('/auth/me', requireAuth, auth.updateMe);

// Catalog
router.get('/products', catalog.listProducts);
router.get('/products/:slug', catalog.getProduct);
router.get('/categories', catalog.listCategories);
router.get('/categories/:slug', catalog.getCategory);
router.get('/collections', catalog.listCollections);
router.get('/collections/:slug', catalog.getCollection);

// Cart
router.get('/cart', requireAuth, cart.getCart);
router.post('/cart', requireAuth, validate(cartAddSchema), cart.addToCart);
router.patch('/cart/:id', requireAuth, cart.updateCartItem);
router.delete('/cart/:id', requireAuth, cart.removeCartItem);
router.delete('/cart', requireAuth, cart.clearCart);

// Orders
router.post('/orders', requireAuth, validate(orderSchema), orders.createOrder);
router.get('/orders', requireAuth, orders.listOrders);
router.get('/orders/:id', requireAuth, orders.getOrder);

// Wishlist
router.get('/wishlist', requireAuth, wishlist.getWishlist);
router.post('/wishlist/:productId', requireAuth, wishlist.toggleWishlist);
router.delete('/wishlist/:productId', requireAuth, wishlist.removeWishlist);

// Misc
router.post('/newsletter', validate(newsletterSchema), misc.subscribe);
router.post('/contact', validate(contactSchema), misc.contact);

export default router;
