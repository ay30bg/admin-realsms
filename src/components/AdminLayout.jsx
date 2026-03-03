import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import AdminTopbar from "./AdminTopbar";
import "../styles/admin.css";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Auto close sidebar when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mock fetch transactions (replace with API later)
  useEffect(() => {
    const mockTransactions = [
      { id: "TXN001", status: "SUCCESS" },
      { id: "TXN002", status: "PENDING" },
      { id: "TXN003", status: "PENDING" },
      { id: "TXN004", status: "SUCCESS" },
    ];
    setTransactions(mockTransactions);
  }, []);

  return (
    <div className="admin-container">
      {/* Sidebar with pending transaction badge */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        transactions={transactions} // pass transactions for badge
      />

      <div className="admin-main">
        <AdminTopbar toggleSidebar={toggleSidebar} />

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;