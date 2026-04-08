// import { useState, useEffect, useCallback } from "react";
// import "../styles/table.css";
// import axios from "axios";

// const LogsOrders = () => {
//   const [logs, setLogs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const rowsPerPage = 8;

//   const getToken = () => localStorage.getItem("adminToken");

//   useEffect(() => {
//     document.title = "Logs Orders - Admin RealSMS";
//   }, []);

//   /* ==============================
//      FORMAT EMPTY VALUES
//   ============================= */
//   const formatValue = (val) => (val && val.toString().trim() !== "" ? val : "-");

//   /* ==============================
//      FETCH LOG ORDERS
//   ============================= */
//   const fetchLogs = useCallback(
//     async (page = 1, searchTerm = "") => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `${process.env.REACT_APP_API_URL}/api/admin/log-orders`,
//           {
//             params: { page, limit: rowsPerPage, search: searchTerm },
//             headers: { Authorization: `Bearer ${getToken()}` },
//           }
//         );

//         setLogs(res.data.data || []);
//         setTotalPages(res.data.totalPages || 1);
//       } catch (err) {
//         console.error("Fetch log orders error:", err);
//       } finally {
//         setLoading(false);
//       }
//     },
//     []
//   );

//   useEffect(() => {
//     fetchLogs(currentPage, search);
//   }, [currentPage, search, fetchLogs]);

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     setCurrentPage(1);
//   };

//   /* ==============================
//      EXPORT CSV
//   ============================= */
//   const handleExport = () => {
//     const csv = [
//       ["Date", "Platform", "Product", "Price", "Quantity", "Details"],
//       ...logs.map((log) => [
//         log.createdAt ? new Date(log.createdAt).toLocaleDateString() : "-",
//         formatValue(log.platform),
//         formatValue(log.product),
//         `₦${log.price?.toLocaleString() || "0"}`,
//         formatValue(log.quantity),
//         formatValue(log.details),
//       ]),
//     ]
//       .map((row) => row.join(","))
//       .join("\n");

//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "log-orders.csv";
//     link.click();
//   };

//   return (
//     <div className="table-page">
//       <h1>Logs Orders</h1>

//       {/* Controls */}
//       <div className="table-controls">
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Search platform, product, or user..."
//           value={search}
//           onChange={handleSearchChange}
//         />

//         <div className="buttons-right">
//           <button className="btn btn-export" onClick={handleExport}>
//             Export CSV
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <table className="admin-table">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Platform</th>
//             <th>Product</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Details</th>
//           </tr>
//         </thead>

//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="6" style={{ textAlign: "center" }}>
//                 Loading...
//               </td>
//             </tr>
//           ) : logs.length === 0 ? (
//             <tr>
//               <td colSpan="6" style={{ textAlign: "center" }}>
//                 No log orders found
//               </td>
//             </tr>
//           ) : (
//             logs.map((log) => (
//               <tr key={log._id}>
//                 <td data-label="Date">
//                   {log.createdAt ? new Date(log.createdAt).toLocaleDateString() : "-"}
//                 </td>
//                 <td data-label="Platform">{formatValue(log.platform)}</td>
//                 <td data-label="Product">{formatValue(log.product)}</td>
//                 <td data-label="Price">₦{log.price?.toLocaleString() || "0"}</td>
//                 <td data-label="Quantity">{formatValue(log.quantity)}</td>
//                 <td data-label="Details">
//                   {log.details
//                     ? log.details.length > 50
//                       ? log.details.slice(0, 50) + "..."
//                       : log.details
//                     : "-"}
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="pagination">
//         <button
//           onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>

//         <span className="current-page">{currentPage}</span>

//         <button
//           onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LogsOrders;

import { useState, useEffect, useCallback } from "react";
import "../styles/table.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const rowsPerPage = 8;
  const getToken = () => localStorage.getItem("adminToken");

  useEffect(() => {
    document.title = "Orders - Admin RealSMS";
  }, []);

  const formatValue = (val) =>
    val && val.toString().trim() !== "" ? val : "-";

  /* ==============================
     FETCH ORDERS
  ============================= */
  const fetchOrders = useCallback(async (page = 1, searchTerm = "") => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admin/orders?search=${searchTerm}&page=${page}&limit=${rowsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch orders");

      const json = await res.json();

      setOrders(json.data || []);
      setTotalPages(json.totalPages || 1);
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders(currentPage, search);
  }, [currentPage, search, fetchOrders]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  /* ==============================
     EXPORT CSV
  ============================= */
  const handleExport = () => {
    const csv = [
      ["User", "OTP", "Service", "Country", "Number", "Amount", "Status", "Date"],
      ...orders.map((o) => [
        o.user && o.user !== "Guest" ? o.user : "Guest",
        formatValue(o.otp),
        formatValue(o.service),
        formatValue(o.country),
        formatValue(o.number),
        `₦${o.priceCharged?.toLocaleString() || "0"}`,
        formatValue(o.status),
        o.createdAt
          ? new Date(o.createdAt).toLocaleDateString()
          : "-",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "orders.csv";
    link.click();
  };

  return (
    <div className="table-page">
      <h1>Orders</h1>

      {/* Controls */}
      <div className="table-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by User or OTP..."
          value={search}
          onChange={handleSearchChange}
        />

        <div className="buttons-right">
          <button className="btn btn-export" onClick={handleExport}>
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>OTP</th>
            <th>Service</th>
            <th>Country</th>
            <th>Number</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                Loading...
              </td>
            </tr>
          ) : orders.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                {/* USER */}
                <td data-label="User">
                  {order.user && order.user !== "Guest" ? (
                    order.user.length > 20
                      ? order.user.slice(0, 20) + "..."
                      : order.user
                  ) : (
                    <span className="guest-badge">Guest</span>
                  )}
                </td>

                {/* OTP */}
                <td data-label="OTP">{formatValue(order.otp)}</td>

                {/* SERVICE */}
                <td data-label="Service">{formatValue(order.service)}</td>

                {/* COUNTRY */}
                <td data-label="Country">{formatValue(order.country)}</td>

                {/* NUMBER */}
                <td data-label="Number">{formatValue(order.number)}</td>

                {/* AMOUNT */}
                <td data-label="Amount">
                  ₦{order.priceCharged?.toLocaleString() || "0"}
                </td>

                {/* STATUS */}
                <td data-label="Status">
                  <span className={`status-badge ${order.status?.toLowerCase()}`}>
                    {formatValue(order.status)}
                  </span>
                </td>

                {/* DATE */}
                <td data-label="Date">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="current-page">{currentPage}</span>

        <button
          onClick={() =>
            setCurrentPage((p) => Math.min(totalPages, p + 1))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;
