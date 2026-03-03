import { useState } from "react";
import "../styles/auth.css";

const AdminLogin = () => {
  const [password, setPassword] = useState("");

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
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;