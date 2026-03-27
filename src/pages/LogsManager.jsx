// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/table.css";

// // platform icons
// import instagramIcon from "../assets/instagram.png";
// import facebookIcon from "../assets/facebook.png";
// import twitterIcon from "../assets/twitter.png";
// import tiktokIcon from "../assets/tiktok.png";

// const API = process.env.REACT_APP_API_URL;

// const platformIcons = {
//   Instagram: instagramIcon,
//   Facebook: facebookIcon,
//   Twitter: twitterIcon,
//   TikTok: tiktokIcon,
// };

// const AdminLogs = () => {
//   const [form, setForm] = useState({
//     platform: "",
//     name: "",
//     price: "",
//     stock: 0,
//     type: "",
//     details: [], // array for uploaded file temporarily
//   });

//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showDetails, setShowDetails] = useState({});
//   const logsPerPage = 10;

//   useEffect(() => {
//     document.title = "Logs Manager - Admin RealSMS";
//     fetchLogs();
//   }, []);

//   const fetchLogs = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${API}/api/log`);
//       setLogs(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatValue = (val) => (val && val.toString().trim() !== "" ? val : "-");

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle file upload for details
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const content = event.target.result;
//       const detailsArray = content
//         .split(/\r?\n/)
//         .filter((line) => line.trim() !== "");
//       setForm((prev) => ({
//         ...prev,
//         details: detailsArray,
//         stock: detailsArray.length,
//       }));
//     };
//     reader.readAsText(file);
//   };

//   // Add log (details sent as string to avoid backend 500)
//   const handleAddLog = async () => {
//     if (!form.platform || !form.name || !form.price || !form.type || form.details.length === 0) {
//       return alert("Fill all required fields and upload a details file");
//     }

//     try {
//       const res = await axios.post(`${API}/api/log`, {
//         ...form,
//         details: form.details.join("\n"), // convert array to string
//         stock: form.details.length,
//       });
//       setLogs((prev) => [res.data, ...prev]);

//       setForm({
//         platform: "",
//         name: "",
//         price: "",
//         stock: 0,
//         type: "",
//         details: [],
//       });
//     } catch (err) {
//       console.error("Upload failed:", err.response?.data || err);
//       alert("Upload failed: " + (err.response?.data?.message || err.message));
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this log?")) return;

//     try {
//       await axios.delete(`${API}/api/log/${id}`);
//       setLogs((prev) => prev.filter((log) => log._id !== id));
//     } catch {
//       alert("Delete failed");
//     }
//   };

//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//     alert("Copied!");
//   };

//   const toggleDetails = (id) => {
//     setShowDetails((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   // SEARCH FILTER
//   const filteredLogs = logs.filter(
//     (log) =>
//       log.name.toLowerCase().includes(search.toLowerCase()) ||
//       log.platform.toLowerCase().includes(search.toLowerCase())
//   );

//   // PAGINATION
//   const indexOfLast = currentPage * logsPerPage;
//   const indexOfFirst = indexOfLast - logsPerPage;
//   const currentLogs = filteredLogs.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

//   return (
//     <div className="table-page">
//       <h1>Logs Manager</h1>

//       {/* SEARCH */}
//       <input
//         type="text"
//         placeholder="Search logs..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="search-input"
//       />

//       {/* FORM */}
//       <div className="logs-table-controls">
//         <select name="platform" value={form.platform} onChange={handleChange}>
//           <option value="">Platform</option>
//           <option value="Instagram">Instagram</option>
//           <option value="Facebook">Facebook</option>
//           <option value="Twitter">Twitter</option>
//           <option value="TikTok">TikTok</option>
//         </select>

//         <input
//           name="name"
//           placeholder="Product Name"
//           value={form.name}
//           onChange={handleChange}
//         />

//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={form.price}
//           onChange={handleChange}
//         />

//         <select name="type" value={form.type} onChange={handleChange}>
//           <option value="">Type</option>
//           <option value="Aged">Aged</option>
//           <option value="PVA">PVA</option>
//           <option value="Verified">Verified</option>
//         </select>

//         <input type="file" accept=".txt,.csv" onChange={handleFileUpload} />
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
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="8" style={{ textAlign: "center" }}>
//                 Loading...
//               </td>
//             </tr>
//           ) : currentLogs.length === 0 ? (
//             <tr>
//               <td colSpan="8" style={{ textAlign: "center" }}>
//                 No logs found
//               </td>
//             </tr>
//           ) : (
//             currentLogs.map((log) => (
//               <tr key={log._id}>
//                 <td data-label="Platform">
//                   <img
//                     src={platformIcons[log.platform]}
//                     alt=""
//                     style={{ width: 20, marginRight: 5 }}
//                   />
//                   {log.platform}
//                 </td>

//                 <td data-label="Name">{log.name}</td>
//                 <td data-label="Price">₦{Number(log.price).toLocaleString()}</td>
//                 <td data-label="Stock">{formatValue(log.stock)}</td>

//                 <td data-label="Type">
//                   <span className={`status-badge ${log.type?.toLowerCase()}`}>
//                     {log.type}
//                   </span>
//                 </td>

//                 <td data-label="Details">
//                   <div className="details-cell">
//                     <span>
//                       {showDetails[log._id] ? log.details : "••••••••••••"}
//                     </span>
//                     <div className="button-group">
//                       <button onClick={() => toggleDetails(log._id)}>
//                         {showDetails[log._id] ? "Hide" : "Show"}
//                       </button>
//                       <button onClick={() => handleCopy(log.details)}>
//                         Copy
//                       </button>
//                     </div>
//                   </div>
//                 </td>

//                 <td data-label="Date">
//                   {new Date(log.createdAt).toLocaleDateString()}
//                 </td>
//                 <td data-label="Action">
//                   <button
//                     className="btn btn-delete"
//                     onClick={() => handleDelete(log._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* PAGINATION */}
//       <div className="pagination">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((p) => p - 1)}
//         >
//           Prev
//         </button>
//         <span>
//           {currentPage} / {totalPages || 1}
//         </span>
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((p) => p + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminLogs;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/table.css";

// platform icons
import instagramIcon from "../assets/instagram.png";
import facebookIcon from "../assets/facebook.png";
import twitterIcon from "../assets/twitter.png";
import tiktokIcon from "../assets/tiktok.png";

const API = process.env.REACT_APP_API_URL;

const platformIcons = {
  Instagram: instagramIcon,
  Facebook: facebookIcon,
  Twitter: twitterIcon,
  TikTok: tiktokIcon,
};

const AdminLogs = () => {
  const [form, setForm] = useState({
    platform: "",
    name: "",
    price: "",
    stock: 0,
    type: "",
    details: [],
  });

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetails, setShowDetails] = useState({});
  const [editingLog, setEditingLog] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const logsPerPage = 10;

  useEffect(() => {
    document.title = "Logs Manager - Admin RealSMS";
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/log`);
      setLogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (val) => (val && val.toString().trim() !== "" ? val : "-");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const detailsArray = content
        .split(/\r?\n/)
        .filter((line) => line.trim() !== "");
      setForm((prev) => ({
        ...prev,
        details: detailsArray,
        stock: detailsArray.length,
      }));
    };
    reader.readAsText(file);
  };

  const handleAddLog = async () => {
    if (!form.platform || !form.name || !form.price || !form.type || form.details.length === 0) {
      return alert("Fill all required fields and upload a details file");
    }

    try {
      const res = await axios.post(`${API}/api/log`, {
        ...form,
        details: form.details.join("\n"),
        stock: form.details.length,
      });
      setLogs((prev) => [res.data, ...prev]);

      setForm({
        platform: "",
        name: "",
        price: "",
        stock: 0,
        type: "",
        details: [],
      });
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err);
      alert("Upload failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this log?")) return;

    try {
      await axios.delete(`${API}/api/log/${id}`);
      setLogs((prev) => prev.filter((log) => log._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  const toggleDetails = (id) => {
    setShowDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // ---------------- EDIT ----------------
  const handleEdit = (log) => {
    setEditingLog(log);
    setForm({
      platform: log.platform,
      name: log.name,
      price: log.price,
      stock: log.stock,
      type: log.type,
      details: log.details ? log.details.split("\n") : [],
    });
    setShowEditModal(true);
  };

  const handleUpdateLog = async () => {
    if (!editingLog) return;

    try {
      const res = await axios.put(`${API}/api/log/${editingLog._id}`, {
        ...form,
        details: form.details.join("\n"),
      });

      setLogs((prev) =>
        prev.map((log) => (log._id === editingLog._id ? res.data : log))
      );

      setShowEditModal(false);
      setEditingLog(null);
      setForm({
        platform: "",
        name: "",
        price: "",
        stock: 0,
        type: "",
        details: [],
      });
    } catch (err) {
      alert("Update failed");
    }
  };

  // SEARCH FILTER
  const filteredLogs = logs.filter(
    (log) =>
      log.name.toLowerCase().includes(search.toLowerCase()) ||
      log.platform.toLowerCase().includes(search.toLowerCase())
  );

  // PAGINATION
  const indexOfLast = currentPage * logsPerPage;
  const indexOfFirst = indexOfLast - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  return (
    <div className="table-page">
      <h1>Logs Manager</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search logs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* FORM */}
      <div className="logs-table-controls">
        <select name="platform" value={form.platform} onChange={handleChange}>
          <option value="">Platform</option>
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
          <option value="Twitter">Twitter</option>
          <option value="TikTok">TikTok</option>
        </select>

        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <select name="type" value={form.type} onChange={handleChange}>
          <option value="">Type</option>
          <option value="Aged">Aged</option>
          <option value="PVA">PVA</option>
          <option value="Verified">Verified</option>
        </select>

        <input type="file" accept=".txt,.csv" onChange={handleFileUpload} />
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
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                Loading...
              </td>
            </tr>
          ) : currentLogs.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No logs found
              </td>
            </tr>
          ) : (
            currentLogs.map((log) => (
              <tr key={log._id}>
                <td data-label="Platform">
                  <img
                    src={platformIcons[log.platform]}
                    alt=""
                    style={{ width: 20, marginRight: 5 }}
                  />
                  {log.platform}
                </td>

                <td data-label="Name">{log.name}</td>
                <td data-label="Price">₦{Number(log.price).toLocaleString()}</td>
                <td data-label="Stock">{formatValue(log.stock)}</td>

                <td data-label="Type">
                  <span className={`status-badge ${log.type?.toLowerCase()}`}>
                    {log.type}
                  </span>
                </td>

                <td data-label="Details">
                  <div className="details-cell">
                    <span>
                      {showDetails[log._id] ? log.details : "••••••••••••"}
                    </span>
                    <div className="button-group">
                      <button onClick={() => toggleDetails(log._id)}>
                        {showDetails[log._id] ? "Hide" : "Show"}
                      </button>
                      <button onClick={() => handleCopy(log.details)}>
                        Copy
                      </button>
                    </div>
                  </div>
                </td>

                <td data-label="Date">
                  {new Date(log.createdAt).toLocaleDateString()}
                </td>
                <td data-label="Action">
                  <button className="btn btn-edit" onClick={() => handleEdit(log)}>
                    Edit
                  </button>
                  <button className="btn btn-delete" onClick={() => handleDelete(log._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>
        <span>
          {currentPage} / {totalPages || 1}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Log</h2>

            <select name="platform" value={form.platform} onChange={handleChange}>
              <option value="">Platform</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="Twitter">Twitter</option>
              <option value="TikTok">TikTok</option>
            </select>

            <input
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
            />

            <select name="type" value={form.type} onChange={handleChange}>
              <option value="">Type</option>
              <option value="Aged">Aged</option>
              <option value="PVA">PVA</option>
              <option value="Verified">Verified</option>
            </select>

            <input type="file" accept=".txt,.csv" onChange={handleFileUpload} />

            <div className="modal-actions">
              <button className="btn" onClick={handleUpdateLog}>
                Update
              </button>
              <button
                className="btn btn-cancel"
                onClick={() => setShowEditModal(false)}
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

export default AdminLogs;
