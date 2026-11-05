
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";
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
import PaintingDetail from "./pages/PaintingDetail";

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
          <div className="about-topline">
            <span>02 — OUR PHILOSOPHY</span>
            <span>ARTELIER GALLERY / EST. 2026</span>
          </div>

          <div className="about-content">
            <div className="about-heading">
              <p className="eyebrow">MORE THAN JUST ART</p>

              <h2>
                Every artwork
                <br />
                tells a <span>story.</span>
              </h2>
            </div>

            <div className="about-description">
              <p>
                Art is more than decoration. It is an expression of
                identity, emotion, and the stories we choose to live with.
              </p>

              <p>
                At Artelier, we bring thoughtfully curated artworks
                closer to your everyday life. Discover pieces that
                inspire, connect, and make every space feel personal.
              </p>

              <a href="#gallery">
                DISCOVER OUR COLLECTION <span>↗</span>
              </a>
            </div>
          </div>

          <div className="about-bottom">
            <span>ART THAT SPEAKS TO YOU.</span>
            <span>MAKE YOUR SPACE MEANINGFUL.</span>
          </div>
        </section>

      </main>
 
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#home" className="brand">
              artelier<span>.</span>
            </a>

            <p>
              Discover art.
              <br />
              Create meaning.
            </p>
          </div>

          <div className="footer-navigation">
            <div className="footer-column">
              <span className="footer-label">EXPLORE</span>
              <a href="#home">Home</a>
              <a href="#gallery">Gallery</a>
              <a href="#about">About Us</a>
            </div>

            <div className="footer-column">
              <span className="footer-label">ACCOUNT</span>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>

            <div className="footer-column">
              <span className="footer-label">OUR PHILOSOPHY</span>
              <p>Art for spaces that tell your story.</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 ARTELIER GALLERY</span>
          <span>MADE FOR THE LOVE OF ART.</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
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
        <Route
          path="/paintings/:id"
          element={<PaintingDetail />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
