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
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     document.title = "Admin Dashboard - RealSMS Admin Panel";

//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("No token found. Please login.");

//         const response = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/admin/stats`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const text = await response.text();

//         let data;
//         try {
//           data = JSON.parse(text);
//         } catch {
//           throw new Error("Unexpected server response.");
//         }

//         if (!response.ok) {
//           throw new Error(data.message || "Failed to fetch admin stats");
//         }

//         setStats(data);
//       } catch (err) {
//         console.error("Admin stats error:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   // 🔄 Loading State
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

//   // ❌ Error State
//   if (error) {
//     return (
//       <div className="admin-dashboard">
//         <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
//           Error: {error}
//         </p>
//       </div>
//     );
//   }

//   // 🛡 Safe fallback values
//   const totalUsers = stats?.totalUsers || 0;
//   const totalOrders = stats?.totalOrders || 0;
//   const totalTransactions = stats?.totalTransactions || 0;
//   const totalRevenue = stats?.totalRevenue || 0;
//   const revenueChange = Number(stats?.weeklyRevenueChange || 0);

//   const statCards = [
//     {
//       title: "Total Users",
//       value: totalUsers,
//       icon: <FiUsers />,
//       color: "#3b82f6",
//     },
//     {
//       title: "Total Revenue",
//       value: `₦${totalRevenue.toLocaleString()}`,
//       icon: <FiDollarSign />,
//       color: "#10b981",
//       weeklyChange: { value: revenueChange },
//     },
//     {
//       title: "Total Transactions",
//       value: totalTransactions,
//       icon: <FiActivity />,
//       color: "#f59e0b",
//     },
//     {
//       title: "Total Orders",
//       value: totalOrders,
//       icon: <FiShoppingCart />,
//       color: "#6366f1",
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

//       {/* Stats Section */}
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
import {
  FiUsers,
  FiDollarSign,
  FiShoppingCart,
  FiActivity,
} from "react-icons/fi";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Admin Dashboard";

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");

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
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: <FiUsers />,
      color: "#3b82f6",
      weeklyChange: Number(stats?.weeklyUsersChange || 0),
    },
    {
      title: "Total Revenue",
      value: `₦${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: <FiDollarSign />,
      color: "#10b981",
      weeklyChange: Number(stats?.weeklyRevenueChange || 0),
    },
    {
      title: "Total Transactions",
      value: stats?.totalTransactions || 0,
      icon: <FiActivity />,
      color: "#f59e0b",
      weeklyChange: Number(stats?.weeklyTransactionsChange || 0),
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: <FiShoppingCart />,
      color: "#6366f1",
      weeklyChange: Number(stats?.weeklyOrdersChange || 0),
    },
  ];

  return (
    <div className="admin-dashboard">
      {/* Welcome Card */}
      <div className="admin-welcome-card">
        <h2>Welcome Back, Admin 👋</h2>
        <p>Here’s your platform performance overview.</p>
      </div>

      {/* Stats */}
      <div className="admin-stats-container">
        {statCards.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
            weeklyChange={card.weeklyChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
