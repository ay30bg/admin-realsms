import React, { useState } from "react";
import heroImg from "../assets/hero-img.png";
import logo from "../assets/logo.png";
import "../styles/auth.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      window.location.href = "/admin";
    } else {
      alert("Invalid password");
    }
  };

  return (
    <div className="login-wrapper">
      {/* Left Illustration */}
      <div className="login-illustration">
        <img src={heroImg} alt="Admin Login visual" />
      </div>

      {/* Right Card */}
      <div className="login-card">
        {/* Mobile Logo */}
        <div className="login-mobile-logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="login-header">
          <h2>Admin Login</h2>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <label>Admin Password</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <p className="login-footer">
          Authorized access only, Admin panel is restricted.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
