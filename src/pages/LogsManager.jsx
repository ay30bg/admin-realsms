// import React, { useState } from "react";
// import "../styles/table.css";

// const AdminLogs = () => {
//   const [form, setForm] = useState({
//     platform: "",
//     name: "",
//     price: "",
//     stock: "",
//     type: "",
//     details: "",
//   });

//   const [logs, setLogs] = useState([]);

//   const formatValue = (val) => {
//     return val && val.toString().trim() !== "" ? val : "-";
//   };

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleAddLog = () => {
//     if (
//       !form.platform ||
//       !form.name ||
//       !form.price ||
//       !form.details ||
//       !form.type
//     ) {
//       alert("Fill all required fields");
//       return;
//     }

//     const newLog = {
//       id: Date.now(),
//       ...form,
//       createdAt: new Date(),
//     };

//     setLogs([newLog, ...logs]);

//     setForm({
//       platform: "",
//       name: "",
//       price: "",
//       stock: "",
//       type: "",
//       details: "",
//     });
//   };

//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   return (
//     <div className="table-page">
//       <h1>Logs Manager</h1>

//       {/* FORM CONTROLS */}
//       <div className="logs-table-controls">
//         <select name="platform" value={form.platform} onChange={handleChange}>
//           <option value="">Platform</option>
//           <option value="Instagram">Instagram</option>
//           <option value="Facebook">Facebook</option>
//           <option value="Twitter">Twitter (X)</option>
//           <option value="TikTok">TikTok</option>
//         </select>

//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           value={form.name}
//           onChange={handleChange}
//         />

//         <input
//           type="number"
//           name="price"
//           placeholder="Price (₦)"
//           value={form.price}
//           onChange={handleChange}
//         />

//         <input
//           type="number"
//           name="stock"
//           placeholder="Stock"
//           value={form.stock}
//           onChange={handleChange}
//         />

//         {/* ✅ TYPE DROPDOWN */}
//         <select name="type" value={form.type} onChange={handleChange}>
//           <option value="">Type</option>
//           <option value="Aged">Aged</option>
//           <option value="PVA">PVA</option>
//           <option value="Verified">Verified</option>
//         </select>

//         <input
//           type="text"
//           name="details"
//           placeholder="username:xxx | password:xxx"
//           value={form.details}
//           onChange={handleChange}
//         />

//         <button className="logs-btn" onClick={handleAddLog}>
//           Upload
//         </button>
//       </div>

//       {/* TABLE */}
//       <table className="admin-table">
//         <thead>
//           <tr>
//             <th>Platform</th>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Stock</th>
//             <th>Type</th>
//             <th>Details</th>
//             <th>Date</th>
//           </tr>
//         </thead>

//         <tbody>
//           {logs.length === 0 ? (
//             <tr>
//               <td colSpan="7" style={{ textAlign: "center" }}>
//                 No logs uploaded
//               </td>
//             </tr>
//           ) : (
//             logs.map((log) => (
//               <tr key={log.id}>
//                 <td data-label="Platform">{formatValue(log.platform)}</td>

//                 <td data-label="Name">{formatValue(log.name)}</td>

//                 <td data-label="Price">
//                   ₦{Number(log.price).toLocaleString()}
//                 </td>

//                 <td data-label="Stock">{formatValue(log.stock)}</td>

//                 {/* ✅ COLORED TYPE BADGE */}
//                 <td data-label="Type">
//                   <span
//                     className={`status-badge ${log.type?.toLowerCase()}`}
//                   >
//                     {formatValue(log.type)}
//                   </span>
//                 </td>

//                 <td data-label="Details">
//                   <div className="details-cell">
//                     <span className="truncate">
//                       {formatValue(log.details)}
//                     </span>
//                     <button
//                       className="copy-btn"
//                       onClick={() => handleCopy(log.details)}
//                     >
//                       Copy
//                     </button>
//                   </div>
//                 </td>

//                 <td data-label="Date">
//                   {new Date(log.createdAt).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminLogs;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/table.css";

const API = process.env.REACT_APP_API_URL;

const AdminLogs = () => {
  const [form, setForm] = useState({
    platform: "",
    name: "",
    price: "",
    stock: "",
    type: "",
    details: "",
  });

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Static Page Title
  useEffect(() => {
    document.title = "Logs Manager - Admin RealSMS";
  }, []);

  // ✅ Fetch logs
  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/log`);
      setLogs(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (val) => {
    return val && val.toString().trim() !== "" ? val : "-";
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Add log
  const handleAddLog = async () => {
    if (
      !form.platform ||
      !form.name ||
      !form.price ||
      !form.details ||
      !form.type
    ) {
      alert("Fill all required fields");
      return;
    }

    try {
      const res = await axios.post(`${API}/logs`, form);

      setLogs((prev) => [res.data, ...prev]);

      setForm({
        platform: "",
        name: "",
        price: "",
        stock: "",
        type: "",
        details: "",
      });
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload log");
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="table-page">
      <h1>Logs Manager</h1>

      {/* FORM */}
      <div className="logs-table-controls">
        <select name="platform" value={form.platform} onChange={handleChange}>
          <option value="">Platform</option>
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
          <option value="Twitter">Twitter (X)</option>
          <option value="TikTok">TikTok</option>
        </select>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price (₦)"
          value={form.price}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />

        <select name="type" value={form.type} onChange={handleChange}>
          <option value="">Type</option>
          <option value="Aged">Aged</option>
          <option value="PVA">PVA</option>
          <option value="Verified">Verified</option>
        </select>

        <input
          type="text"
          name="details"
          placeholder="username:xxx | password:xxx"
          value={form.details}
          onChange={handleChange}
        />

        <button className="logs-btn" onClick={handleAddLog}>
          Upload
        </button>
      </div>

      {/* TABLE */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Platform</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Type</th>
            <th>Details</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Loading...
              </td>
            </tr>
          ) : logs.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No logs uploaded
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr key={log._id}>
                <td>{formatValue(log.platform)}</td>
                <td>{formatValue(log.name)}</td>
                <td>₦{Number(log.price).toLocaleString()}</td>
                <td>{formatValue(log.stock)}</td>

                <td>
                  <span
                    className={`status-badge ${log.type?.toLowerCase()}`}
                  >
                    {formatValue(log.type)}
                  </span>
                </td>

                <td>
                  <div className="details-cell">
                    <span className="truncate">
                      {formatValue(log.details)}
                    </span>
                    <button
                      className="copy-btn"
                      onClick={() => handleCopy(log.details)}
                    >
                      Copy
                    </button>
                  </div>
                </td>

                <td>
                  {new Date(log.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLogs;
