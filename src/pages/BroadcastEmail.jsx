import React, { useState } from "react";
import "../styles/broadcast-email.css";

const BroadcastEmail = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailData = {
      subject,
      message,
      sentAt: new Date().toISOString(),
    };

    console.log("Broadcast Email:", emailData);

    alert("Broadcast email prepared successfully!");

    setSubject("");
    setMessage("");
  };

  return (
    <div className="broadcast-page">
      <div className="broadcast-card">
        <div className="broadcast-header">
          <h2>📧 Broadcast Email</h2>
          <p>
            Send announcements, updates, and promotions to all users.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="broadcast-form">
          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              placeholder="Enter email subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              rows="10"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div className="preview-box">
            <h4>Email Preview</h4>

            <div className="preview-subject">
              {subject || "Email Subject"}
            </div>

            <div className="preview-message">
              {message || "Your email message will appear here..."}
            </div>
          </div>

          <button type="submit" className="send-btn">
            Send Broadcast
          </button>
        </form>
      </div>
    </div>
  );
};

export default BroadcastEmail;
