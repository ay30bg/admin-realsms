// import React, { useState, useEffect } from "react";
// import {
//   FiChevronDown,
//   FiSettings,
//   FiLogOut,
//   FiMenu,
//   FiBell,
// } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import "../styles/header.css";

// const AdminTopbar = ({ toggleSidebar }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [adminName, setAdminName] = useState("Admin");

//   const navigate = useNavigate();

//   const toggleDropdown = () => {
//     setDropdownOpen((prev) => !prev);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("isAdmin");
//     setDropdownOpen(false);
//     navigate("/admin/login");
//   };

//   useEffect(() => {
//     const name = localStorage.getItem("adminName");
//     if (name) setAdminName(name);
//   }, []);

//   return (
//     <div className="admin-topbar">
//       <div className="topbar-left">
//         <div className="hamburger" onClick={toggleSidebar}>
//           <FiMenu size={22} />
//         </div>
        
//       </div>

//       <div className="topbar-right">
//         <div className="notification">
//           <FiBell size={18} />
//           <span className="badge">3</span>
//         </div>

//         <div className="profile" onClick={toggleDropdown}>
//           <img
//             src="https://i.pravatar.cc/40"
//             alt="Admin Avatar"
//             className="avatar"
//           />
//           <span className="username">{adminName}</span>
//           <FiChevronDown
//             className={`arrow ${dropdownOpen ? "rotate" : ""}`}
//           />

//           {dropdownOpen && (
//             <div className="dropdown-menu">
//               <p>
//                 <FiSettings /> Account
//               </p>
//               <p className="logout" onClick={handleLogout}>
//                 <FiLogOut /> Logout
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


// export default AdminTopbar;

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
    const name = localStorage.getItem("adminName");
    if (name) setAdminName(name);

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

        {/* Greeting */}
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
          <img
            src="https://i.pravatar.cc/40"
            alt="Admin Avatar"
            className="avatar"
          />
          <span className="username">{adminName}</span>
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
