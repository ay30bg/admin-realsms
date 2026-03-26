// import React, { useState } from "react";
// import "../styles/logs-manager.css";

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
//     };

//     setLogs([newLog, ...logs]);

//     // Reset form
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
//     <div className="admin-logs">
//       <h2>Logs Manager</h2>

//       {/* FORM */}
//       <div className="log-form">
//         <select
//           name="platform"
//           value={form.platform}
//           onChange={handleChange}
//         >
//           <option value="">Select Platform</option>
//           <option value="Instagram">Instagram</option>
//           <option value="Facebook">Facebook</option>
//           <option value="Twitter">Twitter (X)</option>
//           <option value="TikTok">TikTok</option>
//         </select>

//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name (e.g Instagram Aged)"
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
//           placeholder="Stock Quantity"
//           value={form.stock}
//           onChange={handleChange}
//         />

//         <input
//           type="text"
//           name="type"
//           placeholder="Type (Aged / PVA / Verified)"
//           value={form.type}
//           onChange={handleChange}
//         />

//         <textarea
//           name="details"
//           placeholder="Account details (user:xxx | pass:xxx)"
//           value={form.details}
//           onChange={handleChange}
//         />

//         <button onClick={handleAddLog}>
//           Upload Log
//         </button>
//       </div>

//       {/* PREVIEW LIST */}
//       <div className="logs-preview">
//         <h3>Uploaded Logs</h3>

//         {logs.length === 0 ? (
//           <p>No logs uploaded yet</p>
//         ) : (
//           logs.map((log) => (
//             <div key={log.id} className="log-card">
//               <p><strong>{log.name}</strong></p>
//               <p>{log.platform}</p>
//               <p>₦{log.price}</p>
//               <p>Stock: {log.stock}</p>
//               <p className="details">{log.details}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminLogs;

import React, { useState } from "react";
import "../styles/logs-manager.css";

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

  return (
    <div className="admin-logs">
      <div className="log-card">
        <h2>Logs Manager</h2>


        {/* FORM */}
        <div className="log-form">
          <select
            name="platform"
            value={form.platform}
            onChange={handleChange}
          >
            <option value="">Select Platform</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="Twitter">Twitter (X)</option>
            <option value="TikTok">TikTok</option>
          </select>

          <input
            type="text"
            name="name"
            placeholder="Product Name (e.g Instagram Aged)"
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
            placeholder="Stock Quantity"
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

          <textarea
            name="details"
            placeholder="Account details (user:xxx | pass:xxx)"
            value={form.details}
            onChange={handleChange}
          />

          <button onClick={handleAddLog}>
            Upload Log
          </button>
        </div>

        {/* PREVIEW LIST */}
        <div className="logs-preview">
          <h3>Uploaded Logs</h3>

          {logs.length === 0 ? (
            <p>No logs uploaded yet</p>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="log-card">
                <p><strong>{log.name}</strong></p>
                <p>{log.platform}</p>
                <p>₦{log.price}</p>
                <p>Stock: {log.stock}</p>
                <p className="details">{log.details}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogs;

