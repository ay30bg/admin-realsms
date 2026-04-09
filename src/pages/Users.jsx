import { useState, useEffect, useCallback } from "react";
import "../styles/table.css";

const Users = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const rowsPerPage = 5;

  const getToken = () => localStorage.getItem("adminToken");

   useEffect(() => {
    document.title = "Users - Admin RealSMS";
  }, []);

  /* ==============================
     FETCH USERS
  ============================== */
  const fetchUsers = useCallback(
    async (page = 1, searchTerm = "") => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/admin/users?search=${searchTerm}&page=${page}&limit=${rowsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        const json = await res.json();

        setData(json.data || []);
        setTotalPages(Math.ceil((json.total || 0) / rowsPerPage));
      } catch (err) {
        console.error("Fetch users error:", err);
      } finally {
        setLoading(false);
      }
    },
    [] // rowsPerPage is constant so safe
  );

  useEffect(() => {
    fetchUsers(currentPage, search);
  }, [currentPage, search, fetchUsers]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  /* ==============================
     EDIT USER (API)
  ============================== */
  const handleEditSave = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admin/users/${editingUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            email: editingUser.email,
            walletBalanceNGN: editingUser.balance,
          }),
        }
      );

      const result = await res.json();

      if (result.success) {
        setEditingUser(null);
        fetchUsers(currentPage, search);
      } else {
        alert(result.message || "Failed to update user");
      }
    } catch (err) {
      console.error("Edit user error:", err);
    }
  };

  /* ==============================
     BAN / UNBAN USER (API)
  ============================== */
  const handleBan = async (userId) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admin/users/${userId}/ban`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const result = await res.json();

      if (result.success) {
        fetchUsers(currentPage, search);
      } else {
        alert(result.message || "Failed to toggle user status");
      }
    } catch (err) {
      console.error("Ban user error:", err);
    }
  };

  /* ==============================
     DELETE USER (API)
  ============================== */
  const handleDelete = async (userId, email) => {
    if (!window.confirm(`Are you sure you want to delete ${email}?`)) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admin/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const result = await res.json();

      if (result.success) {
        fetchUsers(currentPage, search);
      } else {
        alert(result.message || "Failed to delete user");
      }
    } catch (err) {
      console.error("Delete user error:", err);
    }
  };

  /* ==============================
     EXPORT CSV
  ============================== */
  const handleExport = () => {
    const csv = [
  ["Email", "Balance", "Total Deposit", "Date Joined", "Status"],
  ...data.map((u) => [
    u.email,
    `₦${u.balance?.toLocaleString()}`,
    `₦${u.totalDeposits?.toLocaleString() || 0}`,
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

  return (
    <div className="table-page">
      <h1>Users</h1>

      {/* Controls */}
      <div className="table-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by email..."
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
            <th>Email</th>
            <th>Balance</th>
            <th>Total Deposit</th>
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
                <td data-label="Balance">
                  ₦{user.balance?.toLocaleString()}
                </td>
                 <td data-label="Total Deposit">
                ₦{user.totalDeposits?.toLocaleString() || 0}
                 </td>
                <td data-label="Date Joined">
                  {new Date(user.dateJoined).toLocaleDateString()}
                </td>
                <td data-label="Status">
                  <span
                    className={`status-badge ${
                      user.status === "Active" ? "active" : "banned"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td data-label="Actions">
                  <div className="action-buttons">
                    <button
                      className="btn btn-edit"
                      onClick={() => setEditingUser(user)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-ban"
                      onClick={() => handleBan(user._id)}
                    >
                      {user.status === "Active" ? "Ban" : "Unban"}
                    </button>

                    <button
                      className="btn btn-delete"
                      onClick={() =>
                        handleDelete(user._id, user.email)
                      }
                    >
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
        <button
          onClick={() =>
            setCurrentPage((p) => Math.max(1, p - 1))
          }
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="current-page">{currentPage}</span>

        <button
          onClick={() =>
            setCurrentPage((p) =>
              Math.min(totalPages, p + 1)
            )
          }
          disabled={currentPage === totalPages}
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
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  email: e.target.value,
                })
              }
            />

            <label>Balance</label>
            <input
              type="number"
              value={editingUser.balance}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  balance: Number(e.target.value),
                })
              }
            />

            <div className="modal-actions">
              <button
                className="btn btn-save"
                onClick={handleEditSave}
              >
                Save
              </button>

              <button
                className="btn btn-cancel"
                onClick={() => setEditingUser(null)}
              >
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

