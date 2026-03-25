import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiClock,
  FiPlusCircle,
  FiHeadphones,
  FiDatabase,
} from "react-icons/fi";
import "../styles/sidebar.css";
import logo from "../assets/logo.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);

  const getToken = () => localStorage.getItem("adminToken");

  /* ==============================
     Detect Mobile Screen
  ============================== */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  /* ==============================
     Fetch Sidebar Counts
  ============================== */
  useEffect(() => {
    const fetchSidebarCounts = async () => {
      try {
        const token = getToken();

        /* ---------------------------
           Pending Transactions
        --------------------------- */
        const txRes = await fetch(
          `${process.env.REACT_APP_API_URL}/api/admin/transactions/pending-count`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (txRes.ok) {
          const txData = await txRes.json();
          setPendingCount(txData.pendingCount || 0);
        }

        /* ---------------------------
           Unread Support Messages
        --------------------------- */
        const msgRes = await fetch(
          `${process.env.REACT_APP_API_URL}/api/support/admin/unread`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (msgRes.ok) {
          const msgData = await msgRes.json();

          // Ensure array
          if (Array.isArray(msgData)) {
            setUnreadMessages(msgData.length);
          } else if (Array.isArray(msgData.data)) {
            setUnreadMessages(msgData.data.length);
          } else {
            setUnreadMessages(0);
          }
        }
      } catch (error) {
        console.error("Sidebar fetch error:", error);
      }
    };

    fetchSidebarCounts();

    // Auto refresh every 30 seconds
    const interval = setInterval(fetchSidebarCounts, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && isMobile && (
        <div
          className="sidebar-overlay"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Close Button */}
        <div className="close-btn" onClick={toggleSidebar}>
          &times;
        </div>

        {/* Logo */}
        <div className="sidebar-logo">
          <img src={logo} alt="RealSMS Admin" />
        </div>

        {/* Navigation */}
        <nav>
          <NavLink to="/admin" end onClick={toggleSidebar}>
            <FiHome className="sidebar-icon" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/users" onClick={toggleSidebar}>
            <FiUsers className="sidebar-icon" />
            <span>Users</span>
          </NavLink>

          <NavLink
            to="/admin/transactions"
            onClick={toggleSidebar}
            className="nav-with-badge"
          >
            <FiClock className="sidebar-icon" />
            <span>Transactions</span>

            {pendingCount > 0 && (
              <span className="badge pulse">
                {pendingCount}
              </span>
            )}
          </NavLink>

          <NavLink to="/admin/orders" onClick={toggleSidebar}>
            <FiPlusCircle className="sidebar-icon" />
            <span>Orders</span>
          </NavLink>

         <NavLink to="/admin/logs-manager" onClick={toggleSidebar}>
            <FiDatabase className="sidebar-icon" />
            <span>Logs Manager</span>
          </NavLink>
          
          <NavLink
            to="/admin/support"
            onClick={toggleSidebar}
            className="nav-with-badge"
          >
            <FiHeadphones className="sidebar-icon" />
            <span>Support</span>

            {unreadMessages > 0 && (
              <span className="badge unread pulse">
                {unreadMessages}
              </span>
            )}
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;


