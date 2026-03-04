// // import React, { useEffect, useState } from "react";
// // import StatCard from "../components/StatCard";
// // import {
// //   FiUsers,
// //   FiDollarSign,
// //   FiShoppingCart,
// //   FiActivity,
// // } from "react-icons/fi";
// // import "../styles/dashboard.css";

// // const Dashboard = () => {
// //   const [stats, setStats] = useState(null);

// //   useEffect(() => {
// //     const fetchStats = async () => {
// //       const token = localStorage.getItem("adminToken");

// //       if (!token) {
// //         window.location.href = "/admin/login";
// //         return;
// //       }

// //       try {
// //         const res = await fetch(
// //           `${process.env.REACT_APP_API_URL}/api/admin/stats`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );

// //         const data = await res.json();

// //         if (!res.ok) {
// //           throw new Error(data.message);
// //         }

// //         setStats(data);
// //       } catch (err) {
// //         console.error("Dashboard error:", err);
// //         localStorage.removeItem("adminToken");
// //         window.location.href = "/admin/login";
// //       }
// //     };

// //     fetchStats();
// //   }, []);

// //   if (!stats) return <p>Loading...</p>;

// //   return (
// //     <div className="admin-dashboard">
// //       <div className="admin-stats-container">
// //         <StatCard
// //           title="Total Users"
// //           value={stats.totalUsers}
// //           icon={<FiUsers />}
// //           color="#3b82f6"
// //           weeklyChange={Number(stats.weeklyUsersChange)}
// //         />

// //         <StatCard
// //           title="Total Revenue"
// //           value={`₦${stats.totalRevenue.toLocaleString()}`}
// //           icon={<FiDollarSign />}
// //           color="#10b981"
// //           weeklyChange={Number(stats.weeklyRevenueChange)}
// //         />

// //         <StatCard
// //           title="Total Transactions"
// //           value={stats.totalTransactions}
// //           icon={<FiActivity />}
// //           color="#f59e0b"
// //           weeklyChange={Number(stats.weeklyTransactionsChange)}
// //         />

// //         <StatCard
// //           title="Total Orders"
// //           value={stats.totalOrders}
// //           icon={<FiShoppingCart />}
// //           color="#6366f1"
// //           weeklyChange={Number(stats.weeklyOrdersChange)}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import React, { useEffect, useState } from "react";
// import StatCard from "../components/StatCard";
// import {
//   FiUsers,
//   FiDollarSign,
//   FiShoppingCart,
//   FiActivity,
// } from "react-icons/fi";
// import "../styles/dashboard.css";

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     document.title = "Admin Dashboard";

//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("adminToken");

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
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   // Loading Spinner
//   if (loading) {
//     return (
//       <div className="admin-dashboard">
//         <div className="spinner-container">
//           <div className="spinner"></div>
//           <p>Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error Handling
//   if (error) {
//     return (
//       <div className="admin-dashboard">
//         <p className="error-text">{error}</p>
//       </div>
//     );
//   }

//   // Stats cards data
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
//       {/* Welcome Card */}
//       <div className="admin-welcome-card">
//         <h2>Welcome Back, Admin 👋</h2>
//         <p>Here’s your platform performance overview.</p>
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

  // Loading Spinner (centered on full page)
  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Error handling
  if (error) {
    return (
      <div className="admin-dashboard">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  // Stats cards
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
