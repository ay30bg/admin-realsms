import React, { useState } from "react";
import "../styles/support.css";

const dummyMessages = [
  {
    id: 1,
    user: "user1@email.com",
    subject: "Payment not reflecting",
    message: "I paid but my wallet was not credited.",
    status: "UNREAD",
    time: "2 mins ago",
  },
  {
    id: 2,
    user: "user2@email.com",
    subject: "Order delay",
    message: "My SMS order is still pending.",
    status: "READ",
    time: "1 hour ago",
  },
];

const Support = () => {
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");

  const handleSelect = (msg) => {
    setSelected(msg);
  };

  const handleReply = () => {
    if (!reply.trim()) return alert("Reply cannot be empty");
    alert("Reply sent successfully!");
    setReply("");
  };

  return (
    <div className="support-container">
      {/* Sidebar */}
      <div
        className={`support-sidebar ${
          selected ? "mobile-hide" : ""
        }`}
      >
        <div className="sidebar-header">
          <h2>Support Inbox</h2>
        </div>

        <div className="message-list">
          {dummyMessages.map((msg) => (
            <div
              key={msg.id}
              className={`support-item ${
                selected?.id === msg.id ? "active" : ""
              } ${msg.status === "UNREAD" ? "unread" : ""}`}
              onClick={() => handleSelect(msg)}
            >
              <div className="support-item-top">
                <strong>{msg.user}</strong>
                <span>{msg.time}</span>
              </div>
              <p>{msg.subject}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div
        className={`support-chat ${
          selected ? "mobile-show" : ""
        }`}
      >
        {selected ? (
          <>
            <div className="chat-header">
              <button
                className="back-btn"
                onClick={() => setSelected(null)}
              >
                ←
              </button>

              <div>
                <h3>{selected.subject}</h3>
                <p>{selected.user}</p>
              </div>
            </div>

            <div className="chat-body">
              <div className="message-bubble user-message">
                {selected.message}
              </div>
            </div>

            <div className="chat-reply">
              <textarea
                placeholder="Type your reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <button onClick={handleReply}>Send Reply</button>
            </div>
          </>
        ) : (
          <div className="no-message">
            Select a conversation to view
          </div>
        )}
      </div>
    </div>
  );
};


export default Support;
