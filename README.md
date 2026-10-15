# GYMRAT — Built Different. Built Disciplined.

Reconstruction of the GYMRAT athletic-streetwear store from the 12+ design screenshots
(Arabic-first RTL, dark theme, lime accent `#87F52B`).

**Stack:** React 18 + Vite + React Router · Node.js + Express REST API · Prisma ORM + SQLite (PostgreSQL-compatible schema) · JWT auth (bcrypt) · Lucide icons.

---

## Run it

```bash
npm install        # install dependencies (runs `prisma generate`)
npm run setup      # create/sync the SQLite DB + seed catalog (categories, collections, 31 products)
npm run dev        # start API (:4000) + client (:5173) with hot reload
```

Open **http://localhost:5173**.

### Production

```bash
npm run build      # build the client into /dist
npm start          # Express serves /dist + REST API on :4000 (auto DB push on prestart)
```

### Other scripts

```bash
npm run db:seed    # re-seed catalog (idempotent upserts)
npm run db:studio  # Prisma Studio
```

Copy `.env.example` → `.env` to configure `DATABASE_URL`, `JWT_SECRET`, `PORT`, `CLIENT_URL`.

---

## Pages (from the screenshots)

| Route | Page |
|---|---|
| `/` | Home — hero slider (3), feature bar, shop by category, best sellers, brand banner, `#GYMRAT` strip |
| `/collections` | Collections — Core / Performance / Street Discipline / Limited blocks + product strips |
| `/collections/:slug` | Collection listing with filters (sizes, colors, price, extra details) |
| `/products` | Products — category chips, filters sidebar (right), sort, grid/compact view |
| `/products/:slug` | Product details — gallery, sizes, colors, qty, wishlist, tabs (description / sizing / care), related |
| `/about` | About — story, vision/mission/values, brand personality bars, audience, community stats |
| `/contact` | Contact — 4 info cards, working contact form (stored in DB), social panel, map panel |
| `/cart` | Cart — qty steppers, coupon `GYMRAT10` / `GYMRAT15`, order summary, suggestions |
| `/checkout` | 3-step checkout (delivery → payment COD → review) → real order in DB |
| `/login`, `/register` | Auth (register is the 4-step wizard from the design) |
| `/account`, `/orders`, `/orders/:id`, `/wishing` → `/wishlist` | Account area, order tracking, wishlist |
| `/policy/:slug` | Privacy / Terms / Returns / Shipping |

Everything visible is interactive: search overlay, filters, sort, mobile drawer, mobile tab bar,
AR/EN language switcher (full RTL/LTR flip), newsletter, contact form, wishlist hearts.

## REST API

`POST /api/auth/register|login|logout` · `GET|PATCH /api/auth/me`
`GET /api/products` (category, collection, size, color, minPrice, maxPrice, tag, badge, bestSeller, featured, search, sort) · `GET /api/products/:slug`
`GET /api/categories[/:slug]` · `GET /api/collections[/:slug]`
`GET|POST /api/cart` · `PATCH|DELETE /api/cart/:id` · `DELETE /api/cart`
`POST /api/orders` · `GET /api/orders[/:id]`
`GET /api/wishlist` · `POST|DELETE /api/wishlist/:productId`
`POST /api/newsletter` · `POST /api/contact`

Passwords hashed with bcrypt (never returned), protected routes via JWT Bearer, zod input validation.

## Database (Prisma + SQLite, portable to PostgreSQL)

`users, addresses, categories, collections, products, product_variants, product_images,
cart_items, orders, order_items, wishlists, newsletter_subscribers, contact_messages`

Seed data mirrors the screenshot catalog (names, Arabic subtitles, prices, ratings, badges).

## Assets

All imagery lives in `public/assets/` (brand, heroes, models, products, categories, banners) and is
referenced as `/assets/...` via `client/src/data/assets.js`. See **ASSETS_MANIFEST.md** for the full
inventory, source classification (Generated / Derived / Placeholder) and per-file replacement prompts.
Derived assets were cropped from generated hero photography with `tools/derive-assets.sh`.
