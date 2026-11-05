import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar({ onOpenCart }) {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        artelier<span>.</span>
      </Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <a href="/#gallery">Gallery</a>
        <a href="/#about">About</a>
      </nav>

      <div className="nav-actions">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? "☀" : "☾"}
        </button>

        {user ? (
          <>
            {user.role === "admin" && (
              <Link to="/admin" className="auth-nav-link">
                Admin
              </Link>
            )}

            <span className="user-name">{user.name}</span>

            <button
              className="auth-nav-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-nav-link">
              Login
            </Link>

            <Link to="/register" className="auth-nav-button">
              Register
            </Link>
          </>
        )}

        <button className="cart-button" onClick={onOpenCart}>
          Cart <span>{cartCount}</span>
        </button>
      </div>
    </header>
  );
}