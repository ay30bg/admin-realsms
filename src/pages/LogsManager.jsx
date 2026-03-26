// // import React, { useState } from "react";
// // import "../styles/logs-manager.css";

// // const AdminLogs = () => {
// //   const [form, setForm] = useState({
// //     platform: "",
// //     name: "",
// //     price: "",
// //     stock: "",
// //     type: "",
// //     details: "",
// //   });

// //   const [logs, setLogs] = useState([]);

// //   const handleChange = (e) => {
// //     setForm({
// //       ...form,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleAddLog = () => {
// //     if (!form.platform || !form.name || !form.price || !form.details) {
// //       alert("Fill all required fields");
// //       return;
// //     }

// //     const newLog = {
// //       id: Date.now(),
// //       ...form,
// //     };

// //     setLogs([newLog, ...logs]);

// //     // Reset form
// //     setForm({
// //       platform: "",
// //       name: "",
// //       price: "",
// //       stock: "",
// //       type: "",
// //       details: "",
// //     });
// //   };

// //   return (
// //     <div className="admin-logs">
// //       <div className="log-card">
// //         <h2>Logs Manager</h2>


// //         {/* FORM */}
// //         <div className="log-form">
// //           <select
// //             name="platform"
// //             value={form.platform}
// //             onChange={handleChange}
// //           >
// //             <option value="">Select Platform</option>
// //             <option value="Instagram">Instagram</option>
// //             <option value="Facebook">Facebook</option>
// //             <option value="Twitter">Twitter (X)</option>
// //             <option value="TikTok">TikTok</option>
// //           </select>

// //           <input
// //             type="text"
// //             name="name"
// //             placeholder="Product Name (e.g Instagram Aged)"
// //             value={form.name}
// //             onChange={handleChange}
// //           />

// //           <input
// //             type="number"
// //             name="price"
// //             placeholder="Price (₦)"
// //             value={form.price}
// //             onChange={handleChange}
// //           />

// //           <input
// //             type="number"
// //             name="stock"
// //             placeholder="Stock Quantity"
// //             value={form.stock}
// //             onChange={handleChange}
// //           />

// //           <input
// //             type="text"
// //             name="type"
// //             placeholder="Type (Aged / PVA / Verified)"
// //             value={form.type}
// //             onChange={handleChange}
// //           />

// //           <textarea
// //             name="details"
// //             placeholder="Account details (user:xxx | pass:xxx)"
// //             value={form.details}
// //             onChange={handleChange}
// //           />

// //           <button onClick={handleAddLog}>
// //             Upload Log
// //           </button>
// //         </div>

// //         {/* PREVIEW LIST */}
// //         <div className="logs-preview">
// //           <h3>Uploaded Logs</h3>

// //           {logs.length === 0 ? (
// //             <p>No logs uploaded yet</p>
// //           ) : (
// //             logs.map((log) => (
// //               <div key={log.id} className="log-card">
// //                 <p><strong>{log.name}</strong></p>
// //                 <p>{log.platform}</p>
// //                 <p>₦{log.price}</p>
// //                 <p>Stock: {log.stock}</p>
// //                 <p className="details">{log.details}</p>
// //               </div>
// //             ))
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminLogs;

// import React, { useState } from "react";
// import "../styles/table.css"; // ✅ reuse same table styles

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
//     if (!form.platform || !form.name || !form.price || !form.details) {
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

//   return (
//     <div className="table-page">
//       <h1>Logs Manager</h1>

//       {/* FORM CONTROLS */}
//       <div className="table-controls" style={{ flexWrap: "wrap", gap: "10px" }}>
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
//           placeholder="Price"
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

//         <input
//           type="text"
//           name="type"
//           placeholder="Type"
//           value={form.type}
//           onChange={handleChange}
//         />

//         <button className="btn btn-export" onClick={handleAddLog}>
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

//                 <td data-label="Type">
//                   <span className="status-badge">
//                     {formatValue(log.type)}
//                   </span>
//                 </td>

//                 <td data-label="Details" style={{ maxWidth: "200px" }}>
//                   <div className="truncate">
//                     {formatValue(log.details)}
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

import React, { useState } from "react";
import "../styles/table.css";

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

  const formatValue = (val) => {
    return val && val.toString().trim() !== "" ? val : "-";
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddLog = () => {
    if (!form.platform || !form.name || !form.price || !form.details) {
      alert("Fill all required fields");
      return;
    }

    const newLog = {
      id: Date.now(),
      ...form,
      createdAt: new Date(),
    };

    setLogs([newLog, ...logs]);

    // Reset form
    setForm({
      platform: "",
      name: "",
      price: "",
      stock: "",
      type: "",
      details: "",
    });
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="table-page">
      <h1>Logs Manager</h1>

      {/* FORM CONTROLS */}
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

        <input
          type="text"
          name="type"
          placeholder="Type (Aged / PVA / Verified)"
          value={form.type}
          onChange={handleChange}
        />

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
          {logs.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No logs uploaded
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr key={log.id}>
                <td data-label="Platform">{formatValue(log.platform)}</td>

                <td data-label="Name">{formatValue(log.name)}</td>

                <td data-label="Price">
                  ₦{Number(log.price).toLocaleString()}
                </td>

                <td data-label="Stock">{formatValue(log.stock)}</td>

                <td data-label="Type">
                  <span className="status-badge">
                    {formatValue(log.type)}
                  </span>
                </td>

                <td data-label="Details">
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

                <td data-label="Date">
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
