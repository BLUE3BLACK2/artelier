
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(form);
      navigate("/");
    } catch (err) {
      const errors = err.response?.data?.errors;
      setError(
        errors
          ? Object.values(errors).flat().join(" ")
          : err.response?.data?.message || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <Link to="/" className="brand">
          artelier<span>.</span>
        </Link>

        <p className="eyebrow">JOIN OUR COMMUNITY</p>
        <h1>Create an account</h1>
        <p className="auth-description">
          Create your account and discover curated artworks.
        </p>

        {error && <p className="auth-error">{error}</p>}

        <label>Full Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(event) =>
            setForm({ ...form, name: event.target.value })
          }
          placeholder="Enter your name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(event) =>
            setForm({ ...form, email: event.target.value })
          }
          placeholder="Enter your email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(event) =>
            setForm({ ...form, password: event.target.value })
          }
          placeholder="Minimum 8 characters"
          minLength={8}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={form.password_confirmation}
          onChange={(event) =>
            setForm({
              ...form,
              password_confirmation: event.target.value,
            })
          }
          placeholder="Confirm your password"
          required
        />

        <button className="auth-submit" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </main>
  );
}
