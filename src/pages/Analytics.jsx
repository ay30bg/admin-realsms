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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Analytics - Admin Dashboard";

    const fetchWeeklyStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/admin/weekly-stats`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setWeeklyData(data);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyStats();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading analytics...</p>;

  // Chart data
  const chartConfig = {
    users: {
      labels: weeklyData.map(d => d.date),
      datasets: [
        {
          label: "New Users",
          data: weeklyData.map(d => d.newUsers),
          borderColor: "#3b82f6",
          backgroundColor: "#3b82f620",
          tension: 0.3,
        },
      ],
    },
    revenue: {
      labels: weeklyData.map(d => d.date),
      datasets: [
        {
          label: "Revenue (₦)",
          data: weeklyData.map(d => d.revenue),
          backgroundColor: "#10b98180",
          borderColor: "#10b981",
        },
      ],
    },
    transactions: {
      labels: weeklyData.map(d => d.date),
      datasets: [
        {
          label: "Transactions",
          data: weeklyData.map(d => d.transactions),
          borderColor: "#f59e0b",
          backgroundColor: "#f59e0b20",
          tension: 0.3,
        },
      ],
    },
    orders: {
      labels: weeklyData.map(d => d.date),
      datasets: [
        {
          label: "Orders",
          data: weeklyData.map(d => d.orders),
          backgroundColor: "#6366f180",
          borderColor: "#6366f1",
        },
      ],
    },
  };

  return (
    <div className="analytics-page">
      <h2>Analytics / Dashboard Insights</h2>

      <div className="analytics-section">
        <h3>New Users (Last 7 Days)</h3>
        <Line data={chartConfig.users} />
      </div>

      <div className="analytics-section">
        <h3>Revenue (Last 7 Days)</h3>
        <Bar data={chartConfig.revenue} />
      </div>

      <div className="analytics-section">
        <h3>Transactions (Last 7 Days)</h3>
        <Line data={chartConfig.transactions} />
      </div>

      <div className="analytics-section">
        <h3>Orders (Last 7 Days)</h3>
        <Bar data={chartConfig.orders} />
      </div>
    </div>
  );
};

export default Analytics;
