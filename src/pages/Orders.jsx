// // import { useEffect, useState, useMemo } from "react";
// // import "../styles/table.css";

// // const Orders = () => {
// //   const [orders, setOrders] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const rowsPerPage = 5;

// //   // Mock data
// //   useEffect(() => {
// //     const mockOrders = [
// //       {
// //         id: "ORD-1001",
// //         user: "user1@email.com",
// //         service: "WhatsApp",
// //         country: "Nigeria",
// //         number: "+2348012345678",
// //         amount: 1500,
// //         status: "SUCCESS",
// //         date: "2026-02-20",
// //       },
// //       {
// //         id: "ORD-1002",
// //         user: "user2@email.com",
// //         service: "Telegram",
// //         country: "Ghana",
// //         number: "+2348098765432",
// //         amount: 1200,
// //         status: "PENDING",
// //         date: "2026-02-21",
// //       },
// //       {
// //         id: "ORD-1003",
// //         user: "user3@email.com",
// //         service: "Facebook",
// //         country: "Kenya",
// //         number: "+2348076543210",
// //         amount: 1800,
// //         status: "FAILED",
// //         date: "2026-02-22",
// //       },
// //     ];
// //     setOrders(mockOrders);
// //   }, []);

// //   // Filtered data by search
// //   const filteredOrders = useMemo(
// //     () =>
// //       orders.filter(
// //         (o) =>
// //           o.user.toLowerCase().includes(search.toLowerCase()) ||
// //           o.id.toLowerCase().includes(search.toLowerCase())
// //       ),
// //     [orders, search]
// //   );

// //   // Pagination
// //   const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
// //   const paginatedOrders = filteredOrders.slice(
// //     (currentPage - 1) * rowsPerPage,
// //     currentPage * rowsPerPage
// //   );

// //   // Export CSV
// //   const handleExport = () => {
// //     const csv = [
// //       ["Order ID", "User", "Service", "Country", "Number", "Amount", "Status", "Date"],
// //       ...orders.map((o) => [
// //         o.id,
// //         o.user,
// //         o.service,
// //         o.country,
// //         o.number,
// //         `₦${o.amount.toLocaleString()}`,
// //         o.status,
// //         o.date,
// //       ]),
// //     ]
// //       .map((row) => row.join(","))
// //       .join("\n");

// //     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
// //     const link = document.createElement("a");
// //     link.href = URL.createObjectURL(blob);
// //     link.download = "orders.csv";
// //     link.click();
// //   };

// //   return (
// //     <div>
// //       <h1>Orders</h1>

// //       {/* Top Controls */}
// //       <div className="table-controls">
// //         <input
// //           type="text"
// //           className="search-input"
// //           placeholder="Search by Order ID or User..."
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //         />
// //         <div className="buttons-right">
// //           <button className="btn btn-export" onClick={handleExport}>
// //             Export CSV
// //           </button>
// //         </div>
// //       </div>

// //       {/* Responsive Table */}
// //       <table className="admin-table">
// //         <thead>
// //           <tr>
// //             <th>Order ID</th>
// //             <th>User</th>
// //             <th>Service</th>
// //             <th>Country</th>
// //             <th>Number</th>
// //             <th>Amount</th>
// //             <th>Status</th>
// //             <th>Date</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {paginatedOrders.map((order) => (
// //             <tr key={order.id}>
// //               <td data-label="Order ID">{order.id}</td>
// //               <td data-label="User">{order.user}</td>
// //               <td data-label="Service">{order.service}</td>
// //               <td data-label="Country">{order.country}</td>
// //               <td data-label="Number">{order.number}</td>
// //               <td data-label="Amount">₦{order.amount.toLocaleString()}</td>
// //               <td data-label="Status">
// //                 <span
// //                   className={`status-badge ${
// //                     order.status === "SUCCESS"
// //                       ? "active"
// //                       : order.status === "PENDING"
// //                       ? "pending"
// //                       : "failed"
// //                   }`}
// //                 >
// //                   {order.status}
// //                 </span>
// //               </td>
// //               <td data-label="Date">{order.date}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {/* Pagination */}
// //       <div className="pagination">
// //         <button
// //           onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
// //           disabled={currentPage === 1}
// //         >
// //           Previous
// //         </button>
// //         <span className="current-page">{currentPage}</span>
// //         <button
// //           onClick={() =>
// //             setCurrentPage((p) => Math.min(totalPages, p + 1))
// //           }
// //           disabled={currentPage === totalPages || totalPages === 0}
// //         >
// //           Next
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };


// // export default Orders;

// import { useEffect, useState, useMemo } from "react";
// import "../styles/table.css";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);

//   const rowsPerPage = 5;

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
//       const id = o._id || "";

//       return (
//         user.toLowerCase().includes(search.toLowerCase()) ||
//         id.toLowerCase().includes(search.toLowerCase())
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
//       [
//         "Order ID",
//         "User",
//         "Service",
//         "Country",
//         "Number",
//         "Amount",
//         "Status",
//         "Date",
//       ],
//       ...orders.map((o) => [
//         o._id,
//         o.user?.email || "N/A",
//         o.service?.code || o.service?.name || "N/A",
//         o.country?.code || o.country?.name || "N/A",
//         o.number || "",
//         `₦${o.amount}`,
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

//   if (loading) return <p>Loading orders...</p>;

//   return (
//     <div>
//       <h1>Orders</h1>

//       {/* Controls */}
//       <div className="table-controls">
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Search by Order ID or User..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
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
//             <th>Order ID</th>
//             <th>User</th>
//             <th>Service</th>
//             <th>Country</th>
//             <th>Number</th>
//             <th>Amount</th>
//             <th>Status</th>
//             <th>Date</th>
//           </tr>
//         </thead>

//         <tbody>
//           {paginatedOrders.map((order) => (
//             <tr key={order._id}>
//               <td data-label="Order ID">{order._id}</td>

//               <td data-label="User">
//                 {order.user?.email || "N/A"}
//               </td>

//               <td data-label="Service">
//                 {order.service?.code || order.service?.name || "N/A"}
//               </td>

//               <td data-label="Country">
//                 {order.country?.code || order.country?.name || "N/A"}
//               </td>

//               <td data-label="Number">{order.number}</td>

//               <td data-label="Amount">
//                 ₦{order.amount?.toLocaleString()}
//               </td>

//               <td data-label="Status">
//                 <span
//                   className={`status-badge ${
//                     order.status === "SUCCESS"
//                       ? "active"
//                       : order.status === "PENDING"
//                       ? "pending"
//                       : "failed"
//                   }`}
//                 >
//                   {order.status}
//                 </span>
//               </td>

//               <td data-label="Date">
//                 {new Date(order.createdAt).toLocaleDateString()}
//               </td>
//             </tr>
//           ))}
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
//           onClick={() =>
//             setCurrentPage((p) => Math.min(totalPages, p + 1))
//           }
//           disabled={currentPage === totalPages || totalPages === 0}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Orders;

import { useEffect, useState, useMemo } from "react";
import "../styles/table.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 8;

  const getToken = () => localStorage.getItem("adminToken");

  // ==============================
  // Fetch Orders
  // ==============================
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = getToken();

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/admin/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();

        setOrders(data || []);
      } catch (error) {
        console.error("Orders fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ==============================
  // Search Filter
  // ==============================
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const user = o.user?.email || "";
      const id = o.orderid || "";

      return (
        user.toLowerCase().includes(search.toLowerCase()) ||
        id.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [orders, search]);

  // ==============================
  // Pagination
  // ==============================
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ==============================
  // Export CSV
  // ==============================
  const handleExport = () => {
    const csv = [
      [
        "Order ID",
        "User",
        "Service",
        "Country",
        "Number",
        "Amount",
        "Status",
        "Date",
      ],
      ...orders.map((o) => [
        o.orderid,
        o.user?.email || "Unknown",
        o.service?.name || "",
        o.country?.code || "",
        o.number,
        `₦${o.priceCharged}`,
        o.status,
        new Date(o.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "orders.csv";
    link.click();
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div>
      <h1>Orders</h1>

      {/* ==============================
         Controls
      ============================== */}
      <div className="table-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by Order ID or User..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="buttons-right">
          <button className="btn btn-export" onClick={handleExport}>
            Export CSV
          </button>
        </div>
      </div>

      {/* ==============================
         Orders Table
      ============================== */}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Service</th>
            <th>Country</th>
            <th>Number</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {paginatedOrders.length === 0 ? (
            <tr>
              <td colSpan="8">No orders found</td>
            </tr>
          ) : (
            paginatedOrders.map((order) => (
              <tr key={order._id}>
                <td data-label="Order ID">{order.orderid}</td>

                <td data-label="User">
                  {order.user?.email || "Unknown"}
                </td>

                <td data-label="Service">
                  {order.service?.name}
                </td>

                <td data-label="Country">
                  {order.country?.code}
                </td>

                <td data-label="Number">
                  {order.number}
                </td>

                <td data-label="Amount">
                  ₦{order.priceCharged?.toLocaleString()}
                </td>

                <td data-label="Status">
                  <span className={`status-badge ${order.status}`}>
                    {order.status}
                  </span>
                </td>

                <td data-label="Date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ==============================
         Pagination
      ============================== */}

      <div className="pagination">
        <button
          onClick={() =>
            setCurrentPage((p) => Math.max(1, p - 1))
          }
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="current-page">
          Page {currentPage} / {totalPages || 1}
        </span>

        <button
          onClick={() =>
            setCurrentPage((p) => Math.min(totalPages, p + 1))
          }
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;

