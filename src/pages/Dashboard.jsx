// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import StatCard from "../components/StatCard";
// import {
//   FiUsers,
//   FiDollarSign,
//   FiShoppingCart,
//   FiActivity,
// } from "react-icons/fi";
// import "../styles/dashboard.css";

// const Dashboard = () => {
//   const navigate = useNavigate(); // for navigation
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     document.title = "Admin Dashboard";

//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("adminToken");

//         if (!token) {
//           window.location.href = "/admin/login";
//           return;
//         }

//         const res = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/admin/stats`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.message || "Failed to fetch stats");
//         }

//         setStats(data);
//       } catch (err) {
//         console.error("Dashboard error:", err);
//         setError(err.message || "Failed to load dashboard");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   // Loading Spinner (centered)
//   if (loading) {
//     return (
//       <div className="loading-spinner">
//         <div className="spinner"></div>
//         <p>Loading dashboard...</p>
//       </div>
//     );
//   }

//   // Error handling
//   if (error) {
//     return (
//       <div className="admin-dashboard">
//         <p className="error-text">{error}</p>
//       </div>
//     );
//   }

//   // Stats cards
//   const statCards = [
//     {
//       title: "Total Users",
//       value: stats?.totalUsers || 0,
//       icon: <FiUsers />,
//       color: "#3b82f6",
//       weeklyChange: Number(stats?.weeklyUsersChange || 0),
//     },
//     {
//       title: "Total Revenue",
//       value: `₦${(stats?.totalRevenue || 0).toLocaleString()}`,
//       icon: <FiDollarSign />,
//       color: "#10b981",
//       weeklyChange: Number(stats?.weeklyRevenueChange || 0),
//     },
//     {
//       title: "Total Transactions",
//       value: stats?.totalTransactions || 0,
//       icon: <FiActivity />,
//       color: "#f59e0b",
//       weeklyChange: Number(stats?.weeklyTransactionsChange || 0),
//     },
//     {
//       title: "Total Orders",
//       value: stats?.totalOrders || 0,
//       icon: <FiShoppingCart />,
//       color: "#6366f1",
//       weeklyChange: Number(stats?.weeklyOrdersChange || 0),
//     },
//   ];

//   return (
//     <div className="admin-dashboard">
//       {/* Welcome Card with Analytics Button */}
//       <div className="admin-welcome-card">
//         <div className="welcome-content">
//           <div>
//             <h2>Welcome Back, Admin 👋</h2>
//             <p>Here’s your platform performance overview.</p>
//           </div>
//           <div className="welcome-buttons">
//             <button
//               className="welcome-action-btn"
//               onClick={() => navigate("/admin/analytics")}
//             >
//               View Analytics
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="admin-stats-container">
//         {statCards.map((card, index) => (
//           <StatCard
//             key={index}
//             title={card.title}
//             value={card.value}
//             icon={card.icon}
//             color={card.color}
//             weeklyChange={card.weeklyChange}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import {
  FiUsers,
  FiDollarSign,
  FiShoppingCart,
  FiActivity,
} from "react-icons/fi";
import "../styles/dashboard.css";

const AdminDashboard = ({ darkMode }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Admin Dashboard";

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          window.location.href = "/admin/login";
          return;
        }

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/admin/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch stats");
        }

        setStats(data);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Loading spinner
  if (loading) {
    return (
      <div className={`dashboard ${darkMode ? "dark" : ""}`}>
        <div className="loading-spinner">
          <div className={`spinner ${darkMode ? "dark" : ""}`}></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error handling
  if (error) {
    return (
      <div className="dashboard">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  // Admin stats cards
  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: <FiUsers />,
      color: "#3b82f6",
      weeklyChange: Number(stats?.weeklyUsersChange ?? 0),
    },
    {
      title: "Total Revenue",
      value: `₦${(stats?.totalRevenue ?? 0).toLocaleString()}`,
      icon: <FiDollarSign />,
      color: "#10b981",
      weeklyChange: Number(stats?.weeklyRevenueChange ?? 0),
    },
    {
      title: "Total Transactions",
      value: stats?.totalTransactions ?? 0,
      icon: <FiActivity />,
      color: "#f59e0b",
      weeklyChange: Number(stats?.weeklyTransactionsChange ?? 0),
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders ?? 0,
      icon: <FiShoppingCart />,
      color: "#6366f1",
      weeklyChange: Number(stats?.weeklyOrdersChange ?? 0),
    },
  ];

  const handleViewAnalytics = () => navigate("/admin/analytics");

  return (
    <div className={`dashboard ${darkMode ? "dark" : ""}`}>
      {/* Admin Welcome Card */}
      <div className="welcome-card">
        <div>
          <h2>Welcome Back, Admin!</h2>
          <p>Here’s a quick overview of your platform.</p>
        </div>
        <button onClick={handleViewAnalytics}>View Analytics</button>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        {statCards.map((card, idx) => (
          <StatCard
            key={idx}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
            darkMode={darkMode}
            weeklyChange={card.weeklyChange}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
