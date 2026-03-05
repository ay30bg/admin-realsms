// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FiHome,
//   FiUsers,
//   FiClock,
//   FiPlusCircle,
//   FiHeadphones,
// } from "react-icons/fi";
// import "../styles/sidebar.css";
// import logo from "../assets/logo.png";

// const Sidebar = ({
//   isOpen,
//   toggleSidebar,
//   transactions = [],
//   messages = [],
// }) => {
//   const [isMobile, setIsMobile] = useState(false);

//   // ==============================
//   // Detect Mobile Screen
//   // ==============================
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // ==============================
//   // Count Pending Transactions
//   // ==============================
//   const pendingCount = transactions.filter(
//     (t) => t.status === "PENDING"
//   ).length;

//   // ==============================
//   // Count Unread Messages
//   // ==============================
//   const unreadMessages = messages.filter(
//     (m) => m.unreadByAdmin === true
//   ).length;

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && isMobile && (
//         <div
//           className="sidebar-overlay"
//           onClick={toggleSidebar}
//         ></div>
//       )}

//       <aside className={`sidebar ${isOpen ? "open" : ""}`}>
//         {/* Close Button (Mobile) */}
//         <div className="close-btn" onClick={toggleSidebar}>
//           &times;
//         </div>

//         {/* Logo */}
//         <div className="sidebar-logo">
//           <img src={logo} alt="RealSMS Admin" />
//         </div>

//         {/* Navigation */}
//         <nav>
//           {/* Dashboard */}
//           <NavLink to="/admin" end onClick={toggleSidebar}>
//             <FiHome className="sidebar-icon" />
//             <span>Dashboard</span>
//           </NavLink>

//           {/* Users */}
//           <NavLink to="/admin/users" onClick={toggleSidebar}>
//             <FiUsers className="sidebar-icon" />
//             <span>Users</span>
//           </NavLink>

//           {/* Transactions */}
//           <NavLink
//             to="/admin/transactions"
//             onClick={toggleSidebar}
//             className="nav-with-badge"
//           >
//             <FiClock className="sidebar-icon" />
//             <span>Transactions</span>

//             {pendingCount > 0 && (
//               <span className="badge pulse">
//                 {pendingCount}
//               </span>
//             )}
//           </NavLink>

//           {/* Orders */}
//           <NavLink to="/admin/orders" onClick={toggleSidebar}>
//             <FiPlusCircle className="sidebar-icon" />
//             <span>Orders</span>
//           </NavLink>

//           {/* Support */}
//           <NavLink
//             to="/admin/support"
//             onClick={toggleSidebar}
//             className="nav-with-badge"
//           >
//             <FiHeadphones className="sidebar-icon" />
//             <span>Support</span>

//             {unreadMessages > 0 && (
//               <span className="badge unread pulse">
//                 {unreadMessages}
//               </span>
//             )}
//           </NavLink>
//         </nav>
//       </aside>
//     </>
//   );
// };


// export default Sidebar;

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiClock,
  FiPlusCircle,
  FiHeadphones,
} from "react-icons/fi";
import "../styles/sidebar.css";
import logo from "../assets/logo.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);

  const getToken = () => localStorage.getItem("adminToken");

  // ==============================
  // Detect Mobile Screen
  // ==============================
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ==============================
  // Fetch Pending Transactions & Unread Messages
  // ==============================
  useEffect(() => {
    const fetchSidebarCounts = async () => {
      try {
        const token = getToken();

        // Fetch transactions count
        const txRes = await fetch(
          `${process.env.REACT_APP_API_URL}/api/admin/transactions?status=PENDING`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const txData = await txRes.json();
        setPendingCount(txData.data?.length || 0);

        // Fetch unread messages count
        const msgRes = await fetch(
          `${process.env.REACT_APP_API_URL}/api/admin/support/unread`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const msgData = await msgRes.json();
        setUnreadMessages(msgData.data?.length || 0);
      } catch (error) {
        console.error("Sidebar fetch error:", error);
      }
    };

    fetchSidebarCounts();
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && isMobile && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Close Button (Mobile) */}
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
              <span className="badge pulse">{pendingCount}</span>
            )}
          </NavLink>

          <NavLink to="/admin/orders" onClick={toggleSidebar}>
            <FiPlusCircle className="sidebar-icon" />
            <span>Orders</span>
          </NavLink>

          <NavLink
            to="/admin/support"
            onClick={toggleSidebar}
            className="nav-with-badge"
          >
            <FiHeadphones className="sidebar-icon" />
            <span>Support</span>
            {unreadMessages > 0 && (
              <span className="badge unread pulse">{unreadMessages}</span>
            )}
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
