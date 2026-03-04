// import { useState, useMemo } from "react";
// import "../styles/table.css";

// const Users = () => {
//   const initialData = [
//     { email: "user1@email.com", balance: 5000, dateJoined: "2026-02-12", status: "Active" },
//     { email: "user2@email.com", balance: 2000, dateJoined: "2026-02-14", status: "Banned" },
//     { email: "user3@email.com", balance: 1500, dateJoined: "2026-02-15", status: "Active" },
//     { email: "user4@email.com", balance: 8000, dateJoined: "2026-02-18", status: "Active" },
//   ];

//   const [data, setData] = useState(initialData);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editingUser, setEditingUser] = useState(null);
//   const rowsPerPage = 5;

//   // Filter users
//   const filteredData = useMemo(
//     () =>
//       data.filter((u) =>
//         u.email.toLowerCase().includes(search.toLowerCase())
//       ),
//     [data, search]
//   );

//   // Pagination
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   // Ban / Unban
//   const handleBan = (email) => {
//     setData((prev) =>
//       prev.map((u) =>
//         u.email === email
//           ? { ...u, status: u.status === "Active" ? "Banned" : "Active" }
//           : u
//       )
//     );
//   };

//   // Delete user
//   const handleDelete = (email) => {
//     if (window.confirm(`Are you sure you want to delete ${email}?`)) {
//       setData((prev) => prev.filter((u) => u.email !== email));
//     }
//   };

//   // Save edited user
//   const handleEditSave = () => {
//     setData((prev) =>
//       prev.map((u) =>
//         u.email === editingUser.originalEmail
//           ? {
//               ...u,
//               email: editingUser.email,
//               balance: editingUser.balance,
//             }
//           : u
//       )
//     );
//     setEditingUser(null);
//   };

//   // Export CSV
//   const handleExport = () => {
//     const csv = [
//       ["Email", "Balance", "Date Joined", "Status"],
//       ...data.map((u) => [u.email, `₦${u.balance.toLocaleString()}`, u.dateJoined, u.status]),
//     ]
//       .map((row) => row.join(","))
//       .join("\n");

//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "users.csv";
//     link.click();
//   };

//   return (
//     <div>
//       <h1>Users</h1>

//       {/* Top Controls */}
//       <div className="table-controls">
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Search by email..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <div className="buttons-right">
//           <button className="btn btn-export" onClick={handleExport}>
//             Export CSV
//           </button>
//         </div>
//       </div>

//       {/* Responsive Table */}
//       <table className="admin-table">
//         <thead>
//           <tr>
//             <th>Email</th>
//             <th>Balance</th>
//             <th>Date Joined</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {paginatedData.map((user) => (
//             <tr key={user.email}>
//               <td data-label="Email">{user.email}</td>
//               <td data-label="Balance">₦{user.balance}</td>
//               <td data-label="Date Joined">{user.dateJoined}</td>
//               <td data-label="Status">
//                 <span
//                   className={`status-badge ${
//                     user.status === "Active" ? "active" : "banned"
//                   }`}
//                 >
//                   {user.status}
//                 </span>
//               </td>
//               <td data-label="Actions">
//                 <div className="action-buttons">
//                   <button
//                     className="btn btn-edit"
//                     onClick={() =>
//                       setEditingUser({
//                         ...user,
//                         originalEmail: user.email,
//                       })
//                     }
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="btn btn-ban"
//                     onClick={() => handleBan(user.email)}
//                   >
//                     {user.status === "Active" ? "Ban" : "Unban"}
//                   </button>

//                   <button
//                     className="btn btn-delete"
//                     onClick={() => handleDelete(user.email)}
//                   >
//                     Delete
//                   </button>
//                 </div>
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

//       {/* Edit Modal */}
//       {editingUser && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>Edit User</h3>

//             <label>Email</label>
//             <input
//               type="text"
//               value={editingUser.email}
//               onChange={(e) =>
//                 setEditingUser({
//                   ...editingUser,
//                   email: e.target.value,
//                 })
//               }
//             />

//             <label>Balance</label>
//             <input
//               type="number"
//               value={editingUser.balance}
//               onChange={(e) =>
//                 setEditingUser({
//                   ...editingUser,
//                   balance: Number(e.target.value),
//                 })
//               }
//             />

//             <div className="modal-actions">
//               <button
//                 className="btn btn-save"
//                 onClick={handleEditSave}
//               >
//                 Save
//               </button>

//               <button
//                 className="btn btn-cancel"
//                 onClick={() => setEditingUser(null)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


// export default Users;

import { useState, useEffect, useMemo } from "react";
import "../styles/table.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredData = useMemo(
    () => users.filter((u) => u.email.toLowerCase().includes(search.toLowerCase())),
    [users, search]
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleBan = async (email) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.email === email ? { ...u, status: u.status === "Active" ? "Banned" : "Active" } : u
      )
    );
    // TODO: Call backend API to update status
  };

  const handleDelete = async (email) => {
    if (window.confirm(`Are you sure you want to delete ${email}?`)) {
      setUsers((prev) => prev.filter((u) => u.email !== email));
      // TODO: Call backend API to delete user
    }
  };

  const handleEditSave = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.email === editingUser.originalEmail
          ? { ...u, email: editingUser.email, balance: editingUser.balance }
          : u
      )
    );
    setEditingUser(null);
    // TODO: Call backend API to update user
  };

  const handleExport = () => {
    const csv = [
      ["Email", "Balance", "Date Joined", "Status"],
      ...users.map((u) => [u.email, `₦${u.balance.toLocaleString()}`, u.createdAt?.split("T")[0] || "-", u.status]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "users.csv";
    link.click();
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h1>Users</h1>

      <div className="table-controls">
        <input
          type="text"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleExport}>Export CSV</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Balance</th>
            <th>Date Joined</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>₦{user.balance?.toLocaleString() || 0}</td>
              <td>{user.createdAt?.split("T")[0] || "-"}</td>
              <td>
                <span className={`status-badge ${user.status === "Active" ? "active" : "banned"}`}>
                  {user.status}
                </span>
              </td>
              <td>
                <button onClick={() => setEditingUser({ ...user, originalEmail: user.email })}>Edit</button>
                <button onClick={() => handleBan(user.email)}>
                  {user.status === "Active" ? "Ban" : "Unban"}
                </button>
                <button onClick={() => handleDelete(user.email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage}</span>
        <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</button>
      </div>

      {editingUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit User</h3>
            <label>Email</label>
            <input value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
            <label>Balance</label>
            <input type="number" value={editingUser.balance} onChange={(e) => setEditingUser({ ...editingUser, balance: Number(e.target.value) })} />
            <div className="modal-actions">
              <button onClick={handleEditSave}>Save</button>
              <button onClick={() => setEditingUser(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
