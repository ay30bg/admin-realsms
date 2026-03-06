import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Transactions from "./pages/Transactions";
import Orders from "./pages/Orders";
import AdminLogin from "./pages/AdminLogin";
import Support from "./pages/Support";

function App() {
  return (
    <Router>
      <Routes>

        {/* Redirect root to admin dashboard */}
        <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />

        {/* Admin Login */}
        <Route path="/" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="users" element={<Users />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="orders" element={<Orders />} />
          <Route path="support" element={<Support />} />
        </Route>

        {/* 404 Page (Optional) */}
        <Route path="*" element={<h2 style={{ padding: "40px" }}>404 - Page Not Found</h2>} />

      </Routes>
    </Router>
  );
}

export default App;
