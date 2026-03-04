// import React, { useEffect, useState } from "react";
// import { Line, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import "../styles/analytics.css";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Analytics = () => {
//   const [dailyData, setDailyData] = useState([]);
//   const [overview, setOverview] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [dateFilter, setDateFilter] = useState("7");
//   const [alerts, setAlerts] = useState([]);

//   useEffect(() => {
//     document.title = "Analytics - Admin Dashboard";

//     const fetchAnalytics = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("adminToken");

//         // 🔹 Fetch Daily Breakdown
//         const dailyRes = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/admin/analytics/daily?days=${dateFilter}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         const daily = await dailyRes.json();
//         setDailyData(daily);

//         // 🔹 Fetch Overview Totals
//         const overviewRes = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/admin/analytics/overview`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         const overviewData = await overviewRes.json();
//         setOverview(overviewData);

//         // 🔹 Alerts
//         const totalTransactions = daily.reduce((sum, d) => sum + d.transactions, 0);
//         const totalOrders = daily.reduce((sum, d) => sum + d.orders, 0);

//         const newAlerts = [];
//         if (totalTransactions < 5)
//           newAlerts.push("Transactions are very low this period!");
//         if (totalOrders < 5)
//           newAlerts.push("Orders are very low this period!");

//         setAlerts(newAlerts);
//       } catch (err) {
//         console.error("Analytics fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnalytics();
//   }, [dateFilter]);

//   if (loading) return <p style={{ textAlign: "center" }}>Loading analytics...</p>;

//   if (!dailyData || dailyData.length === 0)
//     return <p style={{ textAlign: "center" }}>No analytics data available.</p>;

//   // 🔹 Growth Calculation
//   const calcGrowth = (arr, key) => {
//     if (arr.length < 2) return 0;
//     const today = arr[arr.length - 1][key];
//     const yesterday = arr[arr.length - 2][key];
//     if (yesterday === 0) return today > 0 ? 100 : 0;
//     return (((today - yesterday) / yesterday) * 100).toFixed(2);
//   };

//   const kpis = [
//     {
//       label: "Total Users",
//       value: overview?.totalUsers || 0,
//       growth: calcGrowth(dailyData, "newUsers"),
//     },
//     {
//       label: "Total Revenue (₦)",
//       value: overview?.totalRevenue?.toLocaleString() || "0",
//       growth: calcGrowth(dailyData, "revenue"),
//     },
//     {
//       label: "Transactions",
//       value: overview?.totalTransactions || 0,
//       growth: calcGrowth(dailyData, "transactions"),
//     },
//     {
//       label: "Orders",
//       value: overview?.totalOrders || 0,
//       growth: calcGrowth(dailyData, "orders"),
//     },
//   ];

//   const chartConfig = {
//     labels: dailyData.map((d) => d.date),
//   };

//   return (
//     <div className="analytics-page">
//       <h2>Analytics</h2>

//       {/* Date Filter */}
//       <div className="analytics-filter">
//         <label>Show data for:</label>
//         <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
//           <option value="7">Last 7 Days</option>
//           <option value="14">Last 14 Days</option>
//           <option value="30">Last 30 Days</option>
//         </select>
//       </div>

//       {/* Alerts */}
//       {alerts.length > 0 && (
//         <div className="analytics-alerts">
//           {alerts.map((alert, idx) => (
//             <div key={idx} className="analytics-alert">
//               ⚠️ {alert}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* KPI Cards */}
//       <div className="analytics-kpis">
//         {kpis.map((kpi, idx) => (
//           <div
//             key={idx}
//             className="kpi-card"
//             style={{
//               borderTop: `4px solid ${
//                 kpi.growth > 0
//                   ? "#10b981"
//                   : kpi.growth < 0
//                   ? "#ef4444"
//                   : "#fbbf24"
//               }`,
//             }}
//           >
//             <div className="kpi-label">{kpi.label}</div>
//             <div className="kpi-value">{kpi.value}</div>
//             <div
//               className="kpi-growth"
//               style={{
//                 color:
//                   kpi.growth > 0
//                     ? "#10b981"
//                     : kpi.growth < 0
//                     ? "#ef4444"
//                     : "#fbbf24",
//               }}
//             >
//               {kpi.growth > 0 && `▲ ${kpi.growth}%`}
//               {kpi.growth < 0 && `▼ ${Math.abs(kpi.growth)}%`}
//               {kpi.growth === "0.00" && "—"}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="analytics-section">
//         <h3>New Users</h3>
//         <Line
//           data={{
//             ...chartConfig,
//             datasets: [
//               {
//                 label: "New Users",
//                 data: dailyData.map((d) => d.newUsers),
//                 borderColor: "#3b82f6",
//                 backgroundColor: "#3b82f620",
//                 tension: 0.3,
//               },
//             ],
//           }}
//         />
//       </div>

//       <div className="analytics-section">
//         <h3>Revenue</h3>
//         <Bar
//           data={{
//             ...chartConfig,
//             datasets: [
//               {
//                 label: "Revenue (₦)",
//                 data: dailyData.map((d) => d.revenue),
//                 backgroundColor: "#10b98180",
//               },
//             ],
//           }}
//         />
//       </div>

//       <div className="analytics-section">
//         <h3>Transactions</h3>
//         <Line
//           data={{
//             ...chartConfig,
//             datasets: [
//               {
//                 label: "Transactions",
//                 data: dailyData.map((d) => d.transactions),
//                 borderColor: "#f59e0b",
//                 backgroundColor: "#f59e0b20",
//                 tension: 0.3,
//               },
//             ],
//           }}
//         />
//       </div>

//       <div className="analytics-section">
//         <h3>Orders</h3>
//         <Bar
//           data={{
//             ...chartConfig,
//             datasets: [
//               {
//                 label: "Orders",
//                 data: dailyData.map((d) => d.orders),
//                 backgroundColor: "#6366f180",
//               },
//             ],
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Analytics;

import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/analytics.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [overview, setOverview] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    totalTransactions: 0,
    totalOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("7");
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    document.title = "Analytics - Admin Dashboard";

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("adminToken");

        // Fetch Overview Totals
        const overviewRes = await fetch(
          `${process.env.REACT_APP_API_URL}/api/admin/analytics/overview`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const overviewData = await overviewRes.json();

        // Fetch Daily Breakdown
        const dailyRes = await fetch(
          `${process.env.REACT_APP_API_URL}/api/admin/analytics/daily?days=${dateFilter}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const dailyData = await dailyRes.json();

        setOverview(overviewData);
        setWeeklyData(dailyData);

        // Generate Alerts
        const newAlerts = [];
        if (overviewData.totalTransactions < 5)
          newAlerts.push("Transactions are very low this period!");
        if (overviewData.totalOrders < 5)
          newAlerts.push("Orders are very low this period!");
        setAlerts(newAlerts);

      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [dateFilter]);

  if (loading)
    return <p style={{ textAlign: "center" }}>Loading analytics...</p>;

  // Growth calculation (last day vs previous day)
  const calcGrowth = (arr, key) => {
    if (!arr || arr.length < 2) return 0;
    const today = Number(arr[arr.length - 1][key] || 0);
    const yesterday = Number(arr[arr.length - 2][key] || 0);
    if (yesterday === 0) return today > 0 ? 100 : 0;
    return Number((((today - yesterday) / yesterday) * 100).toFixed(2));
  };

  const kpis = [
    {
      label: "Total Users",
      value: overview.totalUsers,
      growth: calcGrowth(weeklyData, "newUsers"),
    },
    {
      label: "Total Revenue (₦)",
      value: Number(overview.totalRevenue || 0).toLocaleString(),
      growth: calcGrowth(weeklyData, "revenue"),
    },
    {
      label: "Transactions",
      value: overview.totalTransactions,
      growth: calcGrowth(weeklyData, "transactions"),
    },
    {
      label: "Orders",
      value: overview.totalOrders,
      growth: calcGrowth(weeklyData, "orders"),
    },
  ];

  const chartConfig = {
    users: {
      labels: weeklyData.map((d) => d.date),
      datasets: [
        {
          label: "New Users",
          data: weeklyData.map((d) => d.newUsers),
          borderColor: "#3b82f6",
          backgroundColor: "#3b82f620",
          tension: 0.3,
        },
      ],
    },
    revenue: {
      labels: weeklyData.map((d) => d.date),
      datasets: [
        {
          label: "Revenue (₦)",
          data: weeklyData.map((d) => d.revenue),
          backgroundColor: "#10b98180",
          borderColor: "#10b981",
        },
      ],
    },
    transactions: {
      labels: weeklyData.map((d) => d.date),
      datasets: [
        {
          label: "Transactions",
          data: weeklyData.map((d) => d.transactions),
          borderColor: "#f59e0b",
          backgroundColor: "#f59e0b20",
          tension: 0.3,
        },
      ],
    },
    orders: {
      labels: weeklyData.map((d) => d.date),
      datasets: [
        {
          label: "Orders",
          data: weeklyData.map((d) => d.orders),
          backgroundColor: "#6366f180",
          borderColor: "#6366f1",
        },
      ],
    },
  };

  return (
    <div className="analytics-page">
      <h2>Analytics</h2>

      {/* Date Filter */}
      <div className="analytics-filter">
        <label>Show data for:</label>
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="7">Last 7 Days</option>
          <option value="14">Last 14 Days</option>
          <option value="30">Last 30 Days</option>
        </select>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="analytics-alerts">
          {alerts.map((alert, idx) => (
            <div key={idx} className="analytics-alert">
              ⚠️ {alert}
            </div>
          ))}
        </div>
      )}

      {/* KPI Cards */}
      <div className="analytics-kpis">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="kpi-card"
            style={{
              borderTop: `4px solid ${
                kpi.growth > 0
                  ? "#10b981"
                  : kpi.growth < 0
                  ? "#ef4444"
                  : "#fbbf24"
              }`,
            }}
          >
            <div className="kpi-label">{kpi.label}</div>
            <div className="kpi-value">{kpi.value}</div>
            <div
              className="kpi-growth"
              style={{
                color:
                  kpi.growth > 0
                    ? "#10b981"
                    : kpi.growth < 0
                    ? "#ef4444"
                    : "#fbbf24",
              }}
            >
              {kpi.growth > 0 && `▲ ${kpi.growth}%`}
              {kpi.growth < 0 && `▼ ${Math.abs(kpi.growth)}%`}
              {kpi.growth === 0 && "—"}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="analytics-section">
        <h3>New Users</h3>
        <Line data={chartConfig.users} />
      </div>

      <div className="analytics-section">
        <h3>Revenue</h3>
        <Bar data={chartConfig.revenue} />
      </div>

      <div className="analytics-section">
        <h3>Transactions</h3>
        <Line data={chartConfig.transactions} />
      </div>

      <div className="analytics-section">
        <h3>Orders</h3>
        <Bar data={chartConfig.orders} />
      </div>
    </div>
  );
};

export default Analytics;

