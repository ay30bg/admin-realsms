import { useState, useEffect } from "react";
import "../styles/table.css";

const LogsOrders = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 8;

  useEffect(() => {
    document.title = "Logs Orders - Admin RealSMS";

    // ✅ MOCK DATA (replace later with API)
    setLogs([
      {
        _id: "1",
        platform: "Instagram",
        product: "Followers",
        price: 500,
        quantity: 2,
        details: "Fast delivery",
        createdAt: "2026-04-01",
      },
      {
        _id: "2",
        platform: "Facebook",
        product: "Likes",
        price: 300,
        quantity: 1,
        details: "Real users",
        createdAt: "2026-04-02",
      },
      {
        _id: "3",
        platform: "TikTok",
        product: "Views",
        price: 200,
        quantity: 5,
        details: "Instant start",
        createdAt: "2026-04-03",
      },
    ]);
  }, []);

  /* ==============================
     FORMAT EMPTY VALUES
  ============================= */
  const formatValue = (val) => {
    return val && val.toString().trim() !== "" ? val : "-";
  };

  /* ==============================
     FILTERED DATA
  ============================= */
  const filteredLogs = logs.filter(
    (log) =>
      log.platform.toLowerCase().includes(search.toLowerCase()) ||
      log.product.toLowerCase().includes(search.toLowerCase())
  );

  /* ==============================
     PAGINATION
  ============================= */
  const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);

  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  /* ==============================
     EXPORT CSV
  ============================= */
  const handleExport = () => {
    const csv = [
      ["Date", "Platform", "Product", "Price", "Quantity", "Details"],
      ...filteredLogs.map((log) => [
        log.createdAt,
        log.platform,
        log.product,
        `₦${log.price}`,
        log.quantity,
        log.details,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "log-orders.csv";
    link.click();
  };

  return (
    <div className="table-page">
      <h1>Logs Orders</h1>

      {/* Controls */}
      <div className="table-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search platform or product..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
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
            <th>Date</th>
            <th>Platform</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          {paginatedLogs.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No log orders found
              </td>
            </tr>
          ) : (
            paginatedLogs.map((log) => (
              <tr key={log._id}>
                <td data-label="Date">
                  {formatValue(log.createdAt)}
                </td>

                <td data-label="Platform">
                  {formatValue(log.platform)}
                </td>

                <td data-label="Product">
                  {formatValue(log.product)}
                </td>

                <td data-label="Price">
                  ₦{log.price?.toLocaleString() || "0"}
                </td>

                <td data-label="Quantity">
                  {formatValue(log.quantity)}
                </td>

                <td data-label="Details">
                  {formatValue(log.details)}
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

export default LogsOrders;
