import React, { useState } from "react";
import axios from "axios";
import "../styles/broadcast-email.css";

const API = process.env.REACT_APP_API_URL;

const BroadcastEmail = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const adminToken = localStorage.getItem("adminToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject.trim() || !message.trim()) {
      return alert("Please fill in all fields");
    }

    try {
      setLoading(true);
      setResult(null);

      const res = await axios.post(
        `${API}/api/broadcast/email-broadcast`,
        { subject, message },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      setResult(res.data);
      alert(res.data.message);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to send broadcast email"
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
            {/* <br />
            System sends <b>50 emails per day</b> (oldest → newest)
            until completion. */}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="broadcast-form">

          <div className="form-group">
            <label htmlFor="subject">Email Subject</label>
            <input
              id="subject"
              type="text"
              placeholder="Enter email subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Email Message</label>
            <textarea
              id="message"
              rows="10"
              placeholder="Write your email content here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          {/* PREVIEW (restored like your original UI) */}
          <div className="preview-box">
            <h4>Email Preview</h4>

            <div className="preview-subject">
              {subject || "Email Subject"}
            </div>

            <div className="preview-message">
              {message || "Your email message will appear here..."}
            </div>
          </div>

          <button type="submit" className="send-btn" disabled={loading}>
            {loading ? "Sending Broadcast..." : "Send Broadcast"}
          </button>
        </form>

        {/* RESULT STATUS */}
        {result && (
          <div className="result-box">
            <p>{result.message}</p>
            {result.completed && (
              <strong>All emails have been sent 🎉</strong>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BroadcastEmail;
