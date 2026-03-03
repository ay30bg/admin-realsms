import { useEffect, useState, useMemo } from "react";
import "../styles/table.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Mock data
  useEffect(() => {
    const mockOrders = [
      {
        id: "ORD-1001",
        user: "user1@email.com",
        service: "WhatsApp",
        country: "Nigeria",
        number: "+2348012345678",
        amount: 1500,
        status: "SUCCESS",
        date: "2026-02-20",
      },
      {
        id: "ORD-1002",
        user: "user2@email.com",
        service: "Telegram",
        country: "Ghana",
        number: "+2348098765432",
        amount: 1200,
        status: "PENDING",
        date: "2026-02-21",
      },
      {
        id: "ORD-1003",
        user: "user3@email.com",
        service: "Facebook",
        country: "Kenya",
        number: "+2348076543210",
        amount: 1800,
        status: "FAILED",
        date: "2026-02-22",
      },
    ];
    setOrders(mockOrders);
  }, []);

  // Filtered data by search
  const filteredOrders = useMemo(
    () =>
      orders.filter(
        (o) =>
          o.user.toLowerCase().includes(search.toLowerCase()) ||
          o.id.toLowerCase().includes(search.toLowerCase())
      ),
    [orders, search]
  );

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Export CSV
  const handleExport = () => {
    const csv = [
      ["Order ID", "User", "Service", "Country", "Number", "Amount", "Status", "Date"],
      ...orders.map((o) => [
        o.id,
        o.user,
        o.service,
        o.country,
        o.number,
        `₦${o.amount.toLocaleString()}`,
        o.status,
        o.date,
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
    <div>
      <h1>Orders</h1>

      {/* Top Controls */}
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

      {/* Responsive Table */}
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
          {paginatedOrders.map((order) => (
            <tr key={order.id}>
              <td data-label="Order ID">{order.id}</td>
              <td data-label="User">{order.user}</td>
              <td data-label="Service">{order.service}</td>
              <td data-label="Country">{order.country}</td>
              <td data-label="Number">{order.number}</td>
              <td data-label="Amount">₦{order.amount.toLocaleString()}</td>
              <td data-label="Status">
                <span
                  className={`status-badge ${
                    order.status === "SUCCESS"
                      ? "active"
                      : order.status === "PENDING"
                      ? "pending"
                      : "failed"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td data-label="Date">{order.date}</td>
            </tr>
          ))}
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
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;