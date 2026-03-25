// import { useState, useEffect, useCallback } from "react";
// import "../styles/table.css";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const rowsPerPage = 8;
//   const getToken = () => localStorage.getItem("adminToken");

//   useEffect(() => {
//     document.title = "Orders - Admin RealSMS";
//   }, []);

//   /* ==============================
//      FETCH ORDERS (WITH SEARCH & PAGINATION)
//   ============================= */
//   const fetchOrders = useCallback(async (page = 1, searchTerm = "") => {
//     try {
//       setLoading(true);

//       const res = await fetch(
//         `${process.env.REACT_APP_API_URL}/api/admin/orders?search=${searchTerm}&page=${page}&limit=${rowsPerPage}`,
//         {
//           headers: {
//             Authorization: `Bearer ${getToken()}`,
//           },
//         }
//       );

//       if (!res.ok) throw new Error("Failed to fetch orders");

//       const json = await res.json();

//       setOrders(json.data || []);
//       setTotalPages(json.totalPages || 1);
//     } catch (err) {
//       console.error("Fetch orders error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchOrders(currentPage, search);
//   }, [currentPage, search, fetchOrders]);

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     setCurrentPage(1);
//   };

//   /* ==============================
//      EXPORT CSV
//   ============================= */
//   const handleExport = () => {
//     const csv = [
//       ["User", "OTP", "Service", "Country", "Number", "Amount", "Status", "Date"],
//       ...orders.map((o) => [
//         o.user,
//         o.otp,
//         o.service,
//         o.country,
//         o.number,
//         `₦${o.priceCharged?.toLocaleString()}`,
//         o.status,
//         new Date(o.createdAt).toLocaleDateString(),
//       ]),
//     ]
//       .map((row) => row.join(","))
//       .join("\n");

//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "orders.csv";
//     link.click();
//   };

//   return (
//     <div className="table-page">
//       <h1>Orders</h1>

//       {/* Controls */}
//       <div className="table-controls">
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Search by User or OTP..."
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
//             <th>User</th>
//             <th>OTP</th>
//             <th>Service</th>
//             <th>Country</th>
//             <th>Number</th>
//             <th>Amount</th>
//             <th>Status</th>
//             <th>Date</th>
//           </tr>
//         </thead>

//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="8" style={{ textAlign: "center" }}>
//                 Loading...
//               </td>
//             </tr>
//           ) : orders.length === 0 ? (
//             <tr>
//               <td colSpan="8" style={{ textAlign: "center" }}>
//                 No orders found
//               </td>
//             </tr>
//           ) : (
//             orders.map((order) => (
//               <tr key={order._id}>
//                 <td data-label="User">{order.user}</td>
//                 <td data-label="OTP">{order.otp}</td>
//                 <td data-label="Service">{order.service}</td>
//                 <td data-label="Country">{order.country}</td>
//                 <td data-label="Number">{order.number}</td>
//                 <td data-label="Amount">₦{order.priceCharged?.toLocaleString()}</td>
//                 <td data-label="Status">
//                   <span className={`status-badge ${order.status.toLowerCase()}`}>
//                     {order.status}
//                   </span>
//                 </td>
//                 <td data-label="Date">{new Date(order.createdAt).toLocaleDateString()}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//          {/* Pagination */}
//       <div className="pagination">
//         <button
//           onClick={() =>
//             setCurrentPage((p) => Math.max(1, p - 1))
//           }
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>

//         <span className="current-page">{currentPage}</span>

//         <button
//           onClick={() =>
//             setCurrentPage((p) =>
//               Math.min(totalPages, p + 1)
//             )
//           }
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
      
//     </div>
//   );
// };

// export default Orders;

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

  /* ==============================
     HELPER (FORMAT EMPTY VALUES)
  ============================= */
  const formatValue = (val) => {
    return val && val.toString().trim() !== "" ? val : "-";
  };

  /* ==============================
     FETCH ORDERS (WITH SEARCH & PAGINATION)
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
        formatValue(o.user),
        formatValue(o.otp),
        formatValue(o.service),
        formatValue(o.country),
        formatValue(o.number),
        `₦${o.priceCharged?.toLocaleString() || "0"}`,
        formatValue(o.status),
        new Date(o.createdAt).toLocaleDateString(),
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
                <td data-label="User">{formatValue(order.user)}</td>
                <td data-label="OTP">{formatValue(order.otp)}</td>
                <td data-label="Service">{formatValue(order.service)}</td>
                <td data-label="Country">{formatValue(order.country)}</td>
                <td data-label="Number">{formatValue(order.number)}</td>
                <td data-label="Amount">
                  ₦{order.priceCharged?.toLocaleString() || "0"}
                </td>
                <td data-label="Status">
                  <span className={`status-badge ${order.status?.toLowerCase()}`}>
                    {formatValue(order.status)}
                  </span>
                </td>
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
