import React, { useState } from "react";
import heroImg from "../assets/hero-img.png";
import logo from "../assets/logo.png";
import "../styles/auth.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

   useEffect(() => {
    document.title = "Admin Login - RealSMS";
  }, []);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admin/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ SAVE ADMIN TOKEN
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("isAdmin", "true");

      // Redirect
      window.location.href = "/admin";
    } catch (err) {
      alert(err.message);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-illustration">
        <img src={heroImg} alt="Admin Login visual" />
      </div>

      <div className="login-card">
        <div className="login-mobile-logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="login-header">
          <h2>Admin Login</h2>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="login-footer">
          Authorized access only. Admin panel is restricted.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

