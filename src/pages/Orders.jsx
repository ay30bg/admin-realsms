// import { useEffect, useState, useMemo } from "react";
// import "../styles/table.css";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);

//   const rowsPerPage = 8;

//   const getToken = () => localStorage.getItem("adminToken");

//   // ==============================
//   // Fetch Orders
//   // ==============================
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = getToken();

//         const res = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/admin/orders`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!res.ok) throw new Error("Failed to fetch orders");

//         const data = await res.json();
//         setOrders(data || []);
//       } catch (error) {
//         console.error("Orders fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // ==============================
//   // Search Filter
//   // ==============================
//   const filteredOrders = useMemo(() => {
//     return orders.filter((o) => {
//       const user = o.user?.email || "";
//       const otp = o.otp || "";
//       return (
//         user.toLowerCase().includes(search.toLowerCase()) ||
//         otp.toLowerCase().includes(search.toLowerCase())
//       );
//     });
//   }, [orders, search]);

//   // ==============================
//   // Pagination
//   // ==============================
//   const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
//   const paginatedOrders = filteredOrders.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   // ==============================
//   // Export CSV
//   // ==============================
//   const handleExport = () => {
//     const csv = [
//       ["User", "OTP", "Service", "Country", "Number", "Amount", "Status", "Date"],
//       ...orders.map((o) => [
//         o.user?.email || "Unknown",
//         o.otp || "",
//         o.service?.name || "",
//         o.country?.code || "",
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

//   if (loading) {
//     return <p>Loading orders...</p>;
//   }

//   return (
//     <div>
//       <h1>Orders</h1>

//       {/* Controls */}
//       <div className="table-controls">
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Search by OTP or User..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <div className="buttons-right">
//           <button className="btn btn-export" onClick={handleExport}>
//             Export CSV
//           </button>
//         </div>
//       </div>

//       {/* Orders Table */}
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
//           {paginatedOrders.length === 0 ? (
//             <tr>
//               <td colSpan="8">No orders found</td>
//             </tr>
//           ) : (
//             paginatedOrders.map((order) => (
//               <tr key={order._id}>
//                 <td data-label="User">{order.user?.email || "Unknown"}</td>

//                 <td data-label="OTP">{order.otp || "N/A"}</td>

//                 <td data-label="Service">{order.service?.name}</td>

//                 <td data-label="Country">{order.country?.code}</td>

//                 <td data-label="Number">{order.number}</td>

//                 <td data-label="Amount">
//                   ₦{order.priceCharged?.toLocaleString()}
//                 </td>

//                 <td data-label="Status">
//                   <span
//                     className={`status-badge ${order.status}`}
//                   >
//                     {order.status?.charAt(0).toUpperCase() +
//                       order.status?.slice(1)}
//                   </span>
//                 </td>

//                 <td data-label="Date">
//                   {new Date(order.createdAt).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Pagination */}
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

import { useEffect, useState } from "react";
import "../styles/table.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 8;
  const getToken = () => localStorage.getItem("adminToken");

  const fetchOrders = async (page = 1, searchTerm = "") => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admin/orders?search=${searchTerm}&page=${page}&limit=${rowsPerPage}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      setOrders(data.data || []);
      setCurrentPage(data.page || 1);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage, search);
  }, [currentPage, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleExport = () => {
    const csv = [
      ["User", "OTP", "Service", "Country", "Number", "Amount", "Status", "Date"],
      ...orders.map((o) => [
        o.user?.email || "Unknown",
        o.otp || "",
        o.service?.name || "",
        o.country?.code || "",
        o.number,
        `₦${o.priceCharged?.toLocaleString()}`,
        o.status,
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

  if (loading) return <p>Loading orders...</p>;

  return (
    <div>
      <h1>Orders</h1>

      <div className="table-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by OTP or User..."
          value={search}
          onChange={handleSearchChange}
        />
        <div className="buttons-right">
          <button className="btn btn-export" onClick={handleExport}>
            Export CSV
          </button>
        </div>
      </div>

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
          {orders.length === 0 ? (
            <tr>
              <td colSpan="8">No orders found</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order.user?.email || "Unknown"}</td>
                <td>{order.otp || "N/A"}</td>
                <td>{order.service?.name}</td>
                <td>{order.country?.code}</td>
                <td>{order.number}</td>
                <td>₦{order.priceCharged?.toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${order.status}`}>
                    {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="current-page">
          Page {currentPage} / {totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;
