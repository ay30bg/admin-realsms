// Support.jsx
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../styles/support.css";

const Support = () => {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chat, setChat] = useState([]);
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");

   useEffect(() => {
    document.title = "Login - Admin RealSMS";
  }, []);

  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("adminToken");

  // ================================
  // Fetch all messages for admin
  // ================================
  const fetchMessages = useCallback(async () => {
    if (!token) {
      setError("Admin token missing. Please log in again.");
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/api/support/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;

      if (Array.isArray(data)) setMessages(data);
      else if (Array.isArray(data.messages)) setMessages(data.messages);
      else setMessages([]);
      setError("");
    } catch (err) {
      console.error("Fetch messages error:", err.response?.data || err.message);
      if (err.response?.status === 403) setError("Access denied: Admins only.");
      else if (err.response?.status === 401) setError("Not authorized. Please log in again.");
      else setError("Failed to fetch messages. Try again later.");
      setMessages([]);
    }
  }, [token, API_URL]);

  // ================================
  // Group messages by user
  // ================================
  const groupedUsers = Object.values(
    (Array.isArray(messages) ? messages : []).reduce((acc, msg) => {
      const userId = msg?.user?._id;
      if (!userId) return acc;

      if (!acc[userId]) {
        acc[userId] = {
          userId, // ensure this exists
          email: msg.user.email,
          lastMessage: msg.message,
          unread: msg.sender === "user" && !msg.read,
          time: msg.createdAt,
        };
      } else {
        // Update lastMessage and unread status if newer
        const prevTime = new Date(acc[userId].time).getTime();
        const msgTime = new Date(msg.createdAt).getTime();
        if (msgTime > prevTime) {
          acc[userId].lastMessage = msg.message;
          acc[userId].time = msg.createdAt;
          acc[userId].unread = acc[userId].unread || (msg.sender === "user" && !msg.read);
        }
      }

      return acc;
    }, {})
  );

  // ================================
  // Open chat for selected user
  // ================================
  const openChat = async (user) => {
    if (!user?.userId) {
      console.error("Cannot open chat: userId is missing", user);
      return;
    }

    setSelectedUser(user);

    const userChat = messages
      .filter((msg) => msg?.user?._id === user.userId)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    setChat(userChat);

    // Mark messages as read
    try {
      await axios.put(
        `${API_URL}/api/support/admin/read/${user.userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMessages();
    } catch (err) {
      console.error("Mark messages read error:", err.response?.data || err.message);
    }
  };

  // ================================
  // Send admin reply
  // ================================
  const sendReply = async () => {
    if (!reply.trim() || !selectedUser) return;

    try {
      await axios.post(
        `${API_URL}/api/support/reply`,
        { userId: selectedUser.userId, message: reply },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReply("");
      await fetchMessages();
      openChat(selectedUser);
    } catch (err) {
      console.error("Send reply error:", err.response?.data || err.message);
      setError("Failed to send reply. Try again.");
    }
  };

  // ================================
  // Initial load
  // ================================
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div className="support-container">
      {error && <div className="error-banner">{error}</div>}

      {/* ================= SIDEBAR ================= */}
      <div className={`support-sidebar ${selectedUser ? "mobile-hide" : ""}`}>
        <div className="sidebar-header">
          <h2>Support Inbox</h2>
        </div>

        <div className="message-list">
          {groupedUsers.length === 0 && !error && (
            <div className="no-message">No support conversations</div>
          )}

          {groupedUsers.map((user) => (
            <div
              key={user.userId}
              className={`support-item ${selectedUser?.userId === user.userId ? "active" : ""} ${
                user.unread ? "unread" : ""
              }`}
              onClick={() => openChat(user)}
            >
              <div className="support-item-top">
                <strong>{user.email}</strong>
              </div>
              <p>{user.lastMessage}</p>
              {user.unread && <span className="unread-dot"></span>}
            </div>
          ))}
        </div>
      </div>

      {/* ================= CHAT ================= */}
      <div className={`support-chat ${selectedUser ? "mobile-show" : ""}`}>
        {selectedUser ? (
          <>
            <div className="chat-header">
              <button className="back-btn" onClick={() => setSelectedUser(null)}>
                ←
              </button>
              <div>
                <h3>{selectedUser.email}</h3>
                <p>Customer Support</p>
              </div>
            </div>

            <div className="chat-body">
              {chat.map((msg) => (
                <div
                  key={msg._id}
                  className={`message-bubble ${msg.sender === "admin" ? "admin-message" : "user-message"}`}
                >
                  {msg.message}
                </div>
              ))}
            </div>

            <div className="chat-reply">
              <textarea
                placeholder="Type your reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <button onClick={sendReply}>Send Reply</button>
            </div>
          </>
        ) : (
          <div className="no-message">Select a conversation to view</div>
        )}
      </div>
    </div>
  );
};

export default Support;
