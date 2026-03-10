import React, { useState, useEffect } from "react";
import {
  FiChevronDown,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiBell,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";

const AdminTopbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminName, setAdminName] = useState("Admin");
  const [greeting, setGreeting] = useState("");
  const [initials, setInitials] = useState("A");

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setDropdownOpen(false);
    navigate("/admin/login");
  };

  useEffect(() => {
    const name = localStorage.getItem("adminName") || "Admin";
    setAdminName(name);

    // Generate initials
    const nameParts = name.split(" ");
    const generatedInitials =
      nameParts.length > 1
        ? nameParts[0][0] + nameParts[1][0]
        : nameParts[0][0];

    setInitials(generatedInitials.toUpperCase());

    // Greeting logic
    const hour = new Date().getHours();

    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  return (
    <div className="admin-topbar">
      <div className="topbar-left">
        <div className="hamburger" onClick={toggleSidebar}>
          <FiMenu size={22} />
        </div>

        <div className="greeting">
          {greeting}, <strong>{adminName}</strong>
        </div>
      </div>

      <div className="topbar-right">
        <div className="notification">
          <FiBell size={18} />
          <span className="badge">3</span>
        </div>

        <div className="profile" onClick={toggleDropdown}>
          {/* Initials Avatar */}
          <div className="admin-avatar">{initials}</div>

          <FiChevronDown
            className={`arrow ${dropdownOpen ? "rotate" : ""}`}
          />

          {dropdownOpen && (
            <div className="dropdown-menu">
              <p>
                <FiSettings /> Account
              </p>
              <p className="logout" onClick={handleLogout}>
                <FiLogOut /> Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;

