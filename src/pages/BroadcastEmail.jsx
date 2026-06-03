// import React, { useState } from "react";
// import "../styles/broadcast-email.css";

// const BroadcastEmail = () => {
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const emailData = {
//       subject,
//       message,
//       sentAt: new Date().toISOString(),
//     };

//     console.log("Broadcast Email:", emailData);

//     alert("Broadcast email prepared successfully!");

//     setSubject("");
//     setMessage("");
//   };

//   return (
//     <div className="broadcast-page">
//       <div className="broadcast-card">
//         <div className="broadcast-header">
//           <h2>Broadcast Email</h2>
//           <p>
//             Send announcements, updates, and promotions to all users.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="broadcast-form">
//           <div className="form-group">
//             <label>Subject</label>
//             <input
//               type="text"
//               placeholder="Enter email subject..."
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Message</label>
//             <textarea
//               rows="10"
//               placeholder="Write your message here..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               required
//             />
//           </div>

//           <div className="preview-box">
//             <h4>Email Preview</h4>

//             <div className="preview-subject">
//               {subject || "Email Subject"}
//             </div>

//             <div className="preview-message">
//               {message || "Your email message will appear here..."}
//             </div>
//           </div>

//           <button type="submit" className="send-btn">
//             Send Broadcast
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BroadcastEmail;

import React, { useState } from "react";
import "../styles/broadcast-email.css";

const BroadcastEmail = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject.trim() || !message.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/broadcast/email-broadcast`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

            // Remove this if you're using cookies instead of JWT
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            subject,
            message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send broadcast email"
        );
      }

      alert(
        data.message ||
          "Broadcast email sent successfully"
      );

      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);

      alert(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="broadcast-page">
      <div className="broadcast-card">
        <div className="broadcast-header">
          <h2>Broadcast Email</h2>

          <p>
            Send announcements, updates, promotions,
            and important information to all users.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="broadcast-form"
        >
          <div className="form-group">
            <label htmlFor="subject">
              Email Subject
            </label>

            <input
              id="subject"
              type="text"
              placeholder="Enter email subject..."
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">
              Email Message
            </label>

            <textarea
              id="message"
              rows="10"
              placeholder="Write your email content here..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              disabled={loading}
              required
            />
          </div>

          <div className="preview-box">
            <h4>Email Preview</h4>

            <div className="preview-subject">
              {subject || "Email Subject"}
            </div>

            <div className="preview-message">
              {message ||
                "Your email message will appear here..."}
            </div>
          </div>

          <button
            type="submit"
            className="send-btn"
            disabled={loading}
          >
            {loading
              ? "Sending Broadcast..."
              : "Send Broadcast"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BroadcastEmail;
