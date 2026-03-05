// // // import { useState, useMemo } from "react";
// // // import "../styles/table.css";

// // // const Transactions = () => {
// // //   const initialData = [
// // //     {
// // //       ref: "TXN001",
// // //       user: "user1@email.com",
// // //       amount: 10000,
// // //       status: "SUCCESS",
// // //       method: "Paystack",
// // //       date: "2026-02-20",
// // //     },
// // //     {
// // //       ref: "TXN002",
// // //       user: "user2@email.com",
// // //       amount: 5000,
// // //       status: "PENDING",
// // //       method: "NowPayments",
// // //       date: "2026-02-21",
// // //     },
// // //     {
// // //       ref: "TXN003",
// // //       user: "user3@email.com",
// // //       amount: 7500,
// // //       status: "PENDING",
// // //       method: "Korapay",
// // //       date: "2026-02-22",
// // //     },
// // //     {
// // //       ref: "TXN004",
// // //       user: "user4@email.com",
// // //       amount: 2000,
// // //       status: "SUCCESS",
// // //       method: "Flutterwave",
// // //       date: "2026-02-23",
// // //     },
// // //   ];

// // //   const [transactions, setTransactions] = useState(initialData);
// // //   const [search, setSearch] = useState("");
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const rowsPerPage = 5;

// // //   const filteredData = useMemo(
// // //     () =>
// // //       transactions.filter(
// // //         (t) =>
// // //           t.user.toLowerCase().includes(search.toLowerCase()) ||
// // //           t.ref.toLowerCase().includes(search.toLowerCase())
// // //       ),
// // //     [transactions, search]
// // //   );

// // //   const totalPages = Math.ceil(filteredData.length / rowsPerPage);

// // //   const paginatedData = filteredData.slice(
// // //     (currentPage - 1) * rowsPerPage,
// // //     currentPage * rowsPerPage
// // //   );

// // //   const handleConfirm = (ref) => {
// // //     if (window.confirm(`Confirm deposit ${ref}?`)) {
// // //       setTransactions((prev) =>
// // //         prev.map((t) =>
// // //           t.ref === ref && t.status === "PENDING"
// // //             ? { ...t, status: "SUCCESS" }
// // //             : t
// // //         )
// // //       );
// // //     }
// // //   };

// // //   const handleExport = () => {
// // //     const csv = [
// // //       ["Reference", "User", "Amount", "Status", "Payment Method", "Date"],
// // //       ...transactions.map((t) => [
// // //         t.ref,
// // //         t.user,
// // //         `₦${t.amount}`,
// // //         t.status,
// // //         t.method,
// // //         t.date,
// // //       ]),
// // //     ]
// // //       .map((row) => row.join(","))
// // //       .join("\n");

// // //     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
// // //     const link = document.createElement("a");
// // //     link.href = URL.createObjectURL(blob);
// // //     link.download = "transactions.csv";
// // //     link.click();
// // //   };

// // //   return (
// // //     <div>
// // //       <h1>Transactions</h1>

// // //       {/* Top Controls */}
// // //       <div className="table-controls">
// // //         <input
// // //           type="text"
// // //           className="search-input"
// // //           placeholder="Search by user or reference..."
// // //           value={search}
// // //           onChange={(e) => setSearch(e.target.value)}
// // //         />

// // //         <div className="buttons-right">
// // //           <button className="btn btn-export" onClick={handleExport}>
// // //             Export CSV
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Responsive Table SAME AS USERS */}
// // //       <table className="admin-table">
// // //         <thead>
// // //           <tr>
// // //             <th>Reference</th>
// // //             <th>User</th>
// // //             <th>Amount</th>
// // //             <th>Status</th>
// // //             <th>Payment Method</th>
// // //             <th>Date</th>
// // //             <th>Actions</th>
// // //           </tr>
// // //         </thead>

// // //         <tbody>
// // //           {paginatedData.map((t) => (
// // //             <tr key={t.ref}>
// // //               <td data-label="Reference">{t.ref}</td>
// // //               <td data-label="User">{t.user}</td>
// // //               <td data-label="Amount">
// // //                 ₦{t.amount.toLocaleString()}
// // //               </td>
// // //               <td data-label="Status">
// // //                 <span
// // //                   className={`status-badge ${
// // //                     t.status === "SUCCESS"
// // //                       ? "active"
// // //                       : t.status === "PENDING"
// // //                       ? "pending"
// // //                       : "failed"
// // //                   }`}
// // //                 >
// // //                   {t.status}
// // //                 </span>
// // //               </td>
// // //               <td data-label="Payment Method">{t.method}</td>
// // //               <td data-label="Date">{t.date}</td>
// // //               <td data-label="Actions">
// // //                 <div className="action-buttons">
// // //                   {t.status === "PENDING" && (
// // //                     <button
// // //                       className="btn btn-confirm"
// // //                       onClick={() => handleConfirm(t.ref)}
// // //                     >
// // //                       Confirm
// // //                     </button>
// // //                   )}
// // //                 </div>
// // //               </td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>

// // //       {/* Pagination */}
// // //       <div className="pagination">
// // //         <button
// // //           onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
// // //           disabled={currentPage === 1}
// // //         >
// // //           Previous
// // //         </button>

// // //         <span className="current-page">{currentPage}</span>

// // //         <button
// // //           onClick={() =>
// // //             setCurrentPage((p) => Math.min(totalPages, p + 1))
// // //           }
// // //           disabled={currentPage === totalPages || totalPages === 0}
// // //         >
// // //           Next
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };


// // // export default Transactions;

// // import { useState, useEffect, useMemo, useCallback } from "react";
// // import "../styles/table.css";

// // const Transactions = () => {
// //   const [transactions, setTransactions] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [loading, setLoading] = useState(false);

// //   const rowsPerPage = 5;

// //   const getToken = () => localStorage.getItem("adminToken");

// //   /* ================= FETCH TRANSACTIONS ================= */

// //   const fetchTransactions = useCallback(async () => {
// //     try {
// //       setLoading(true);

// //       const res = await fetch(
// //         `${process.env.REACT_APP_API_URL}/api/admin/transactions`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${getToken()}`,
// //           },
// //         }
// //       );

// //       const data = await res.json();

// //       if (data.success) {
// //         setTransactions(data.data || []);
// //       }
// //     } catch (error) {
// //       console.error("Fetch transactions error:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchTransactions();
// //   }, [fetchTransactions]);

// //   /* ================= SEARCH ================= */

// //   const filteredData = useMemo(() => {
// //     return transactions.filter(
// //       (t) =>
// //         t.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
// //         t.ref?.toLowerCase().includes(search.toLowerCase())
// //     );
// //   }, [transactions, search]);

// //   /* ================= PAGINATION ================= */

// //   const totalPages = Math.ceil(filteredData.length / rowsPerPage);

// //   const paginatedData = filteredData.slice(
// //     (currentPage - 1) * rowsPerPage,
// //     currentPage * rowsPerPage
// //   );

// //   /* ================= CONFIRM TRANSACTION ================= */

// //   const handleConfirm = async (ref) => {
// //     if (!window.confirm(`Confirm deposit ${ref}?`)) return;

// //     try {
// //       const res = await fetch(
// //         `${process.env.REACT_APP_API_URL}/api/admin/transactions/${ref}/confirm`,
// //         {
// //           method: "PATCH",
// //           headers: {
// //             Authorization: `Bearer ${getToken()}`,
// //           },
// //         }
// //       );

// //       const result = await res.json();

// //       if (result.success) {
// //         fetchTransactions();
// //       } else {
// //         alert(result.message || "Failed to confirm transaction");
// //       }
// //     } catch (error) {
// //       console.error("Confirm transaction error:", error);
// //     }
// //   };

// //   /* ================= EXPORT CSV ================= */

// //   const handleExport = () => {
// //     const csv = [
// //       ["Reference", "User", "Amount", "Status", "Payment Method", "Date"],
// //       ...transactions.map((t) => [
// //         t.ref,
// //         t.user?.email,
// //         `₦${t.amount}`,
// //         t.status,
// //         t.method,
// //         new Date(t.createdAt).toLocaleDateString(),
// //       ]),
// //     ]
// //       .map((row) => row.join(","))
// //       .join("\n");

// //     const blob = new Blob([csv], {
// //       type: "text/csv;charset=utf-8;",
// //     });

// //     const link = document.createElement("a");
// //     link.href = URL.createObjectURL(blob);
// //     link.download = "transactions.csv";
// //     link.click();
// //   };

// //   return (
// //     <div className="table-page">
// //       <h1>Transactions</h1>

// //       {/* Top Controls */}
// //       <div className="table-controls">
// //         <input
// //           type="text"
// //           className="search-input"
// //           placeholder="Search by user or reference..."
// //           value={search}
// //           onChange={(e) => {
// //             setSearch(e.target.value);
// //             setCurrentPage(1);
// //           }}
// //         />

// //         <div className="buttons-right">
// //           <button className="btn btn-export" onClick={handleExport}>
// //             Export CSV
// //           </button>
// //         </div>
// //       </div>

// //       {/* Table */}
// //       <table className="admin-table">
// //         <thead>
// //           <tr>
// //             <th>Reference</th>
// //             <th>User</th>
// //             <th>Amount</th>
// //             <th>Status</th>
// //             <th>Payment Method</th>
// //             <th>Date</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>

// //         <tbody>
// //           {loading ? (
// //             <tr>
// //               <td colSpan="7" style={{ textAlign: "center" }}>
// //                 Loading...
// //               </td>
// //             </tr>
// //           ) : paginatedData.length === 0 ? (
// //             <tr>
// //               <td colSpan="7" style={{ textAlign: "center" }}>
// //                 No transactions found
// //               </td>
// //             </tr>
// //           ) : (
// //             paginatedData.map((t) => (
// //               <tr key={t._id}>
// //                 <td data-label="Reference">{t.ref}</td>

// //                 <td data-label="User">
// //                   {t.user?.email || "Unknown"}
// //                 </td>

// //                 <td data-label="Amount">
// //                   ₦{t.amount?.toLocaleString()}
// //                 </td>

// //                 <td data-label="Status">
// //                   <span
// //                     className={`status-badge ${
// //                       t.status === "SUCCESS"
// //                         ? "active"
// //                         : t.status === "PENDING"
// //                         ? "pending"
// //                         : "failed"
// //                     }`}
// //                   >
// //                     {t.status}
// //                   </span>
// //                 </td>

// //                 <td data-label="Payment Method">{t.method}</td>

// //                 <td data-label="Date">
// //                   {new Date(t.createdAt).toLocaleDateString()}
// //                 </td>

// //                 <td data-label="Actions">
// //                   <div className="action-buttons">
// //                     {t.status === "PENDING" && (
// //                       <button
// //                         className="btn btn-confirm"
// //                         onClick={() => handleConfirm(t.ref)}
// //                       >
// //                         Confirm
// //                       </button>
// //                     )}
// //                   </div>
// //                 </td>
// //               </tr>
// //             ))
// //           )}
// //         </tbody>
// //       </table>

// //       {/* Pagination */}
// //       <div className="pagination">
// //         <button
// //           onClick={() =>
// //             setCurrentPage((p) => Math.max(1, p - 1))
// //           }
// //           disabled={currentPage === 1}
// //         >
// //           Previous
// //         </button>

// //         <span className="current-page">{currentPage}</span>

// //         <button
// //           onClick={() =>
// //             setCurrentPage((p) =>
// //               Math.min(totalPages, p + 1)
// //             )
// //           }
// //           disabled={currentPage === totalPages || totalPages === 0}
// //         >
// //           Next
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Transactions;

// import { useState, useEffect, useMemo, useCallback } from "react";
// import "../styles/table.css";

// const Transactions = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const rowsPerPage = 5;
//   const getToken = () => localStorage.getItem("adminToken");

//   /* ================= FETCH TRANSACTIONS ================= */
//   const fetchTransactions = useCallback(async () => {
//     try {
//       setLoading(true);

//       const res = await fetch(
//         `${process.env.REACT_APP_API_URL}/api/admin/transactions`,
//         {
//           headers: {
//             Authorization: `Bearer ${getToken()}`,
//           },
//         }
//       );

//       const data = await res.json();

//       if (data.success) {
//         setTransactions(data.data || []);
//       } else {
//         console.error("Failed to fetch transactions:", data.message);
//       }
//     } catch (error) {
//       console.error("Fetch transactions error:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTransactions();
//   }, [fetchTransactions]);

//   /* ================= SEARCH ================= */
//   const filteredData = useMemo(() => {
//     return transactions.filter(
//       (t) =>
//         t.user?.toLowerCase().includes(search.toLowerCase()) ||
//         t.ref?.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [transactions, search]);

//   /* ================= PAGINATION ================= */
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);

//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   /* ================= CONFIRM TRANSACTION ================= */
//   const handleConfirm = async (ref) => {
//     if (!window.confirm(`Confirm deposit ${ref}?`)) return;

//     try {
//       const res = await fetch(
//         `${process.env.REACT_APP_API_URL}/api/admin/transactions/${ref}/confirm`,
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${getToken()}`,
//           },
//         }
//       );

//       const result = await res.json();

//       if (result.success) {
//         fetchTransactions();
//       } else {
//         alert(result.message || "Failed to confirm transaction");
//       }
//     } catch (error) {
//       console.error("Confirm transaction error:", error);
//     }
//   };

//   /* ================= EXPORT CSV ================= */
//   const handleExport = () => {
//     const csv = [
//       ["Reference", "User", "Amount", "Status", "Payment Method", "Date"],
//       ...transactions.map((t) => [
//         t.ref,
//         t.user || "Unknown",
//         `₦${t.amount?.toLocaleString()}`,
//         t.status,
//         t.method,
//         t.date || "N/A",
//       ]),
//     ]
//       .map((row) => row.join(","))
//       .join("\n");

//     const blob = new Blob([csv], {
//       type: "text/csv;charset=utf-8;",
//     });

//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "transactions.csv";
//     link.click();
//   };

//   return (
//     <div className="table-page">
//       <h1>Transactions</h1>

//       {/* Top Controls */}
//       <div className="table-controls">
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Search by user or reference..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1);
//           }}
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
//             <th>Reference</th>
//             <th>User</th>
//             <th>Amount</th>
//             <th>Status</th>
//             <th>Payment Method</th>
//             <th>Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="7" style={{ textAlign: "center" }}>
//                 Loading...
//               </td>
//             </tr>
//           ) : paginatedData.length === 0 ? (
//             <tr>
//               <td colSpan="7" style={{ textAlign: "center" }}>
//                 No transactions found
//               </td>
//             </tr>
//           ) : (
//             paginatedData.map((t) => (
//               <tr key={t.ref}>
//                 <td data-label="Reference">{t.ref}</td>
//                 <td data-label="User">{t.user || "Unknown"}</td>
//                 <td data-label="Amount">₦{t.amount?.toLocaleString()}</td>
//                 <td data-label="Status">
//                   <span
//                     className={`status-badge ${
//                       t.status === "SUCCESS"
//                         ? "active"
//                         : t.status === "PENDING"
//                         ? "pending"
//                         : "failed"
//                     }`}
//                   >
//                     {t.status}
//                   </span>
//                 </td>
//                 <td data-label="Payment Method">{t.method}</td>
//                 <td data-label="Date">{t.date || "N/A"}</td>
//                 <td data-label="Actions">
//                   {t.status === "PENDING" && (
//                     <button
//                       className="btn btn-confirm"
//                       onClick={() => handleConfirm(t.ref)}
//                     >
//                       Confirm
//                     </button>
//                   )}
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

// export default Transactions;

import { useState, useEffect, useCallback } from "react";
import "../styles/table.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const rowsPerPage = 5;

  const getToken = () => localStorage.getItem("adminToken");

  /* ================= FETCH TRANSACTIONS FROM BACKEND ================= */
  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admin/transactions?search=${search}&page=${currentPage}&limit=${rowsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setTransactions(data.data || []);
        setTotalPages(data.totalPages || 1);
      }
    } catch (error) {
      console.error("Fetch transactions error:", error);
    } finally {
      setLoading(false);
    }
  }, [search, currentPage]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  /* ================= CONFIRM TRANSACTION ================= */
  const handleConfirm = async (ref) => {
    if (!window.confirm(`Confirm deposit ${ref}?`)) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admin/transactions/${ref}/confirm`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const result = await res.json();

      if (result.success) {
        fetchTransactions();
      } else {
        alert(result.message || "Failed to confirm transaction");
      }
    } catch (error) {
      console.error("Confirm transaction error:", error);
    }
  };

  /* ================= EXPORT CSV ================= */
  const handleExport = () => {
    const csv = [
      ["Reference", "User", "Amount", "Status", "Payment Method", "Date"],
      ...transactions.map((t) => [
        t.ref,
        t.user || "Unknown",
        `₦${t.amount?.toLocaleString()}`,
        t.status,
        t.method,
        new Date(t.date).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions.csv";
    link.click();
  };

  return (
    <div className="table-page">
      <h1>Transactions</h1>

      {/* ================= TOP CONTROLS ================= */}
      <div className="table-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by reference..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset page when search changes
          }}
        />

        <div className="buttons-right">
          <button className="btn btn-export" onClick={handleExport}>
            Export CSV
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Reference</th>
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment Method</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Loading...
              </td>
            </tr>
          ) : transactions.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((t) => (
              <tr key={t._id}>
                <td data-label="Reference">{t.ref}</td>

                <td data-label="User">{t.user || "Unknown"}</td>

                <td data-label="Amount">₦{t.amount?.toLocaleString()}</td>

                <td data-label="Status">
                  <span
                    className={`status-badge ${
                      t.status === "SUCCESS"
                        ? "active"
                        : t.status === "PENDING"
                        ? "pending"
                        : "failed"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>

                <td data-label="Payment Method">{t.method}</td>

                <td data-label="Date">
                  {new Date(t.date).toLocaleDateString()}
                </td>

                <td data-label="Actions">
                  <div className="action-buttons">
                    {t.status === "PENDING" && (
                      <button
                        className="btn btn-confirm"
                        onClick={() => handleConfirm(t.ref)}
                      >
                        Confirm
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ================= PAGINATION ================= */}
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
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Transactions;
