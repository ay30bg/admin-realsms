// import React, { useEffect, useState } from "react";
// import StatCard from "../components/StatCard";
// import {
//   FiUsers,
//   FiDollarSign,
//   FiShoppingCart,
//   FiActivity,
// } from "react-icons/fi";
// import "../styles/dashboard.css";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalRevenue: 0,
//     totalTransactions: 0,
//     totalOrders: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     document.title = "Admin Dashboard - RealSMS Admin Panel";

//     // Simulate fetching data
//     setTimeout(() => {
//       setStats({
//         totalUsers: 1245,
//         totalRevenue: 2450000,
//         totalTransactions: 870,
//         totalOrders: 532,
//       });

//       setLoading(false);
//     }, 800);
//   }, []);

//   if (loading) {
//     return (
//       <div className="admin-dashboard">
//         <div className="loading-spinner">
//           <div className="spinner"></div>
//           <p>Loading admin dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   const statCards = [
//     {
//       title: "Total Users",
//       value: stats.totalUsers,
//       icon: <FiUsers />,
//       color: "#3b82f6",
//       weeklyChange: { value: 12 }, // +12% this week
//     },
//     {
//       title: "Total Revenue",
//       value: `₦${stats.totalRevenue.toLocaleString()}`,
//       icon: <FiDollarSign />,
//       color: "#10b981",
//       weeklyChange: { value: 8 }, // +8% this week
//     },
//     {
//       title: "Total Transactions",
//       value: stats.totalTransactions,
//       icon: <FiActivity />,
//       color: "#f59e0b",
//       weeklyChange: { value: -5 }, // -5% this week
//     },
//     {
//       title: "Total Orders",
//       value: stats.totalOrders,
//       icon: <FiShoppingCart />,
//       color: "#6366f1",
//       weeklyChange: { value: 20 }, // +20% this week
//     },
//   ];

//   return (
//     <div className="admin-dashboard">
//       {/* Welcome Section */}
//       <div className="admin-welcome-card">
//         <div>
//           <h2>Welcome Back, Admin 👋</h2>
//           <p>Here’s an overview of platform performance.</p>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="admin-stats-container">
//         {statCards.map((stat, index) => (
//           <StatCard
//             key={index}
//             title={stat.title}
//             value={stat.value}
//             icon={stat.icon}
//             color={stat.color}
//             weeklyChange={stat.weeklyChange}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };


// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { FiUsers, FiDollarSign, FiShoppingCart, FiActivity } from "react-icons/fi";
import "../styles/dashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Admin Dashboard - RealSMS Admin Panel";

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please login.");

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Handle non-JSON responses gracefully
        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Unexpected response from server: " + text);
        }

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch admin stats");
        }

        setStats(data);
      } catch (err) {
        console.error("Admin stats error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
          Error: {error}
        </p>
      </div>
    );
  }

  const statCards = [
    { title: "Total Users", value: stats.totalUsers, icon: <FiUsers />, color: "#3b82f6" },
    { title: "Total Revenue", value: `₦${stats.totalRevenue.toLocaleString()}`, icon: <FiDollarSign />, color: "#10b981" },
    { title: "Total Transactions", value: stats.totalTransactions, icon: <FiActivity />, color: "#f59e0b" },
    { title: "Total Orders", value: stats.totalOrders, icon: <FiShoppingCart />, color: "#6366f1" },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-welcome-card">
        <div>
          <h2>Welcome Back, Admin 👋</h2>
          <p>Here’s an overview of platform performance.</p>
        </div>
      </div>

      <div className="admin-stats-container">
        {statCards.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
