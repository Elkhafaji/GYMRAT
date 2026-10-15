/* GYMRAT — routes (lazy pages + layout) */
import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import SearchOverlay from './components/SearchOverlay.jsx';
import MobileDrawer from './components/MobileDrawer.jsx';
import MobileTabBar from './components/MobileTabBar.jsx';
import { useApp } from './context/AppContext.jsx';
import { Check } from 'lucide-react';

const Home = lazy(() => import('./pages/Home.jsx'));
const Collections = lazy(() => import('./pages/Collections.jsx'));
const Collection = lazy(() => import('./pages/Collection.jsx'));
const Products = lazy(() => import('./pages/Products.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));
const Checkout = lazy(() => import('./pages/Checkout.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Account = lazy(() => import('./pages/Account.jsx'));
const Orders = lazy(() => import('./pages/Orders.jsx'));
const OrderDetail = lazy(() => import('./pages/OrderDetail.jsx'));
const Wishlist = lazy(() => import('./pages/Wishlist.jsx'));
const Policy = lazy(() => import('./pages/Policy.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function ScrollTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Loader() {
  return (
    <div style={{ minHeight: '50vh', display: 'grid', placeItems: 'center', color: 'var(--muted)' }}>
      <div className="script" style={{ fontSize: 26 }}>TRAIN. WEAR. REPEAT.</div>
    </div>
  );
}

export default function App() {
  const { toast, searchOpen, menuOpen } = useApp();
  return (
    <>
      <ScrollTop />
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:slug" element={<Collection />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/categories/:slug" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/policy/:slug" element={<Policy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <MobileTabBar />
      {searchOpen && <SearchOverlay />}
      {menuOpen && <MobileDrawer />}
      {toast && (
        <div className="toast" role="status">
          <Check size={18} /> {toast.msg}
        </div>
      )}
    </>
  );
}
