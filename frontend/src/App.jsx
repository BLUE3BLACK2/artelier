
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGallery from "./components/ProductGallery";
import CartDrawer from "./components/CartDrawer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import Admin from "./pages/Admin";
import "./App.css";

function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart } = useCart();

  function handleAddToCart(painting) {
    addToCart(painting);
    setIsCartOpen(true);
  }

  return (
    <>
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      <main>
        <Hero />
        <ProductGallery onAddToCart={handleAddToCart} />

        <section className="about-section" id="about">
          <p className="eyebrow">OUR PHILOSOPHY</p>
          <h2>Every artwork tells a story.</h2>
          <p>
            Artelier brings thoughtfully curated artworks closer to
            your everyday life. Find a piece that speaks to you.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#home" className="brand">
          artelier<span>.</span>
        </a>
        <p>Discover art. Create meaning.</p>
        <p>© 2026 Artelier Gallery</p>
      </footer>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}

function GuestRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
}

function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
