// import { useState, useEffect } from "react";
// import "../styles/table.css";

// const Users = () => {
//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [editingUser, setEditingUser] = useState(null);
//   const rowsPerPage = 5;

//   const fetchUsers = async (page = 1, searchTerm = "") => {
//     try {
//       const token = localStorage.getItem("adminToken");
//       const res = await fetch(
//         `${process.env.REACT_APP_API_URL}/api/admin/users?search=${searchTerm}&page=${page}&limit=${rowsPerPage}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const json = await res.json();
//       setData(json.data);
//       setTotalPages(Math.ceil(json.total / rowsPerPage));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers(currentPage, search);
//   }, [currentPage, search]);

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     setCurrentPage(1);
//   };

//   const handleBan = async (email) => {
//     setData((prev) =>
//       prev.map((u) =>
//         u.email === email ? { ...u, status: u.status === "Active" ? "Banned" : "Active" } : u
//       )
//     );
//     // Optionally, call backend to update status
//   };

//   const handleEditSave = async () => {
//     setData((prev) =>
//       prev.map((u) =>
//         u.email === editingUser.originalEmail
//           ? { ...u, email: editingUser.email, balance: editingUser.balance }
//           : u
//       )
//     );
//     setEditingUser(null);
//     // Optionally, send update to backend
//   };

//   const handleDelete = (email) => {
//     if (window.confirm(`Are you sure you want to delete ${email}?`)) {
//       setData((prev) => prev.filter((u) => u.email !== email));
//       // Optionally, call backend delete
//     }
//   };

//   const handleExport = () => {
//     const csv = [
//       ["Email", "Balance", "Date Joined", "Status"],
//       ...data.map((u) => [u.email, `₦${u.balance.toLocaleString()}`, new Date(u.dateJoined).toLocaleDateString(), u.status]),
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
//     <div className="table-page">
//       <h1>Users</h1>

//       <div className="table-controls">
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Search by email..."
//           value={search}
//           onChange={handleSearchChange}
//         />
//         <div className="buttons-right">
//           <button className="btn btn-export" onClick={handleExport}>Export CSV</button>
//         </div>
//       </div>

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
//           {data.map((user) => (
//             <tr key={user._id}>
//               <td data-label="Email">{user.email}</td>
//               <td data-label="Balance">₦{user.balance?.toLocaleString()}</td>
//               <td data-label="Date Joined">{new Date(user.dateJoined).toLocaleDateString()}</td>
//               <td data-label="Status">
//                 <span className={`status-badge ${user.status === "Active" ? "active" : "banned"}`}>
//                   {user.status}
//                 </span>
//               </td>
//               <td data-label="Actions">
//                 <div className="action-buttons">
//                   <button className="btn btn-edit" onClick={() => setEditingUser({ ...user, originalEmail: user.email })}>Edit</button>
//                   <button className="btn btn-ban" onClick={() => handleBan(user.email)}>
//                     {user.status === "Active" ? "Ban" : "Unban"}
//                   </button>
//                   <button className="btn btn-delete" onClick={() => handleDelete(user.email)}>Delete</button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="pagination">
//         <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</button>
//         <span className="current-page">{currentPage}</span>
//         <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</button>
//       </div>

//       {editingUser && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>Edit User</h3>
//             <label>Email</label>
//             <input type="text" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
//             <label>Balance</label>
//             <input type="number" value={editingUser.balance} onChange={(e) => setEditingUser({ ...editingUser, balance: Number(e.target.value) })} />
//             <div className="modal-actions">
//               <button className="btn btn-save" onClick={handleEditSave}>Save</button>
//               <button className="btn btn-cancel" onClick={() => setEditingUser(null)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Users;

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../styles/table.css";

const Users = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const rowsPerPage = 5;

  /* =========================
     FETCH USERS
  ========================= */
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/users", {
        params: { search, page: currentPage, limit: rowsPerPage },
      });
      setData(res.data.data);
      setTotalUsers(res.data.total);
      setLoading(false);
    } catch (error) {
      console.error("Fetch users error:", error);
      setLoading(false);
    }
  }, [search, currentPage, rowsPerPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  /* =========================
     BAN / UNBAN USER
  ========================= */
  const handleBan = async (id) => {
    try {
      await axios.patch(`/api/admin/users/${id}/ban`);
      fetchUsers();
    } catch (error) {
      console.error("Ban/Unban error:", error);
    }
  };

  /* =========================
     DELETE USER
  ========================= */
  const handleDelete = async (id, email) => {
    if (!window.confirm(`Are you sure you want to delete ${email}?`)) return;
    try {
      await axios.delete(`/api/admin/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Delete user error:", error);
    }
  };

  /* =========================
     SAVE EDITED USER
  ========================= */
  const handleEditSave = async () => {
    try {
      await axios.put(`/api/admin/users/${editingUser._id}`, {
        email: editingUser.email,
        walletBalanceNGN: editingUser.balance,
      });
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Edit user error:", error);
    }
  };

  /* =========================
     EXPORT CSV
  ========================= */
  const handleExport = () => {
    const csv = [
      ["Email", "Balance", "Date Joined", "Status"],
      ...data.map((u) => [
        u.email,
        `₦${Number(u.balance).toLocaleString()}`,
        new Date(u.dateJoined).toLocaleDateString(),
        u.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "users.csv";
    link.click();
  };

  const totalPages = Math.ceil(totalUsers / rowsPerPage);

  return (
    <div className="table-page">
      <h1>Users</h1>

      {/* Top Controls */}
      <div className="table-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="buttons-right">
          <button className="btn btn-export" onClick={handleExport}>
            Export CSV
          </button>
        </div>
      </div>

      {/* Users Table */}
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
          {loading ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          ) : (
            data.map((user) => (
              <tr key={user._id}>
                <td data-label="Email">{user.email}</td>
                <td data-label="Balance">₦{Number(user.balance).toLocaleString()}</td>
                <td data-label="Date Joined">{new Date(user.dateJoined).toLocaleDateString()}</td>
                <td data-label="Status">
                  <span className={`status-badge ${user.status === "Active" ? "active" : "banned"}`}>
                    {user.status}
                  </span>
                </td>
                <td data-label="Actions">
                  <div className="action-buttons">
                    <button
                      className="btn btn-edit"
                      onClick={() => setEditingUser({ ...user, originalEmail: user.email })}
                    >
                      Edit
                    </button>
                    <button className="btn btn-ban" onClick={() => handleBan(user._id)}>
                      {user.status === "Active" ? "Ban" : "Unban"}
                    </button>
                    <button className="btn btn-delete" onClick={() => handleDelete(user._id, user.email)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="current-page">{currentPage}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit User</h3>
            <label>Email</label>
            <input
              type="text"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
            />
            <label>Balance</label>
            <input
              type="number"
              value={editingUser.balance}
              onChange={(e) => setEditingUser({ ...editingUser, balance: Number(e.target.value) })}
            />
            <div className="modal-actions">
              <button className="btn btn-save" onClick={handleEditSave}>
                Save
              </button>
              <button className="btn btn-cancel" onClick={() => setEditingUser(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
