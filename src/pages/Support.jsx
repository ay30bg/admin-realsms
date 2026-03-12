// import React, { useState } from "react";
// import "../styles/support.css";

// const dummyMessages = [
//   {
//     id: 1,
//     user: "user1@email.com",
//     subject: "Payment not reflecting",
//     message: "I paid but my wallet was not credited.",
//     status: "UNREAD",
//     time: "2 mins ago",
//   },
//   {
//     id: 2,
//     user: "user2@email.com",
//     subject: "Order delay",
//     message: "My SMS order is still pending.",
//     status: "READ",
//     time: "1 hour ago",
//   },
// ];

// const Support = () => {
//   const [selected, setSelected] = useState(null);
//   const [reply, setReply] = useState("");

//   const handleSelect = (msg) => {
//     setSelected(msg);
//   };

//   const handleReply = () => {
//     if (!reply.trim()) return alert("Reply cannot be empty");
//     alert("Reply sent successfully!");
//     setReply("");
//   };

//   return (
//     <div className="support-container">
//       {/* Sidebar */}
//       <div
//         className={`support-sidebar ${
//           selected ? "mobile-hide" : ""
//         }`}
//       >
//         <div className="sidebar-header">
//           <h2>Support Inbox</h2>
//         </div>

//         <div className="message-list">
//           {dummyMessages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`support-item ${
//                 selected?.id === msg.id ? "active" : ""
//               } ${msg.status === "UNREAD" ? "unread" : ""}`}
//               onClick={() => handleSelect(msg)}
//             >
//               <div className="support-item-top">
//                 <strong>{msg.user}</strong>
//                 <span>{msg.time}</span>
//               </div>
//               <p>{msg.subject}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat */}
//       <div
//         className={`support-chat ${
//           selected ? "mobile-show" : ""
//         }`}
//       >
//         {selected ? (
//           <>
//             <div className="chat-header">
//               <button
//                 className="back-btn"
//                 onClick={() => setSelected(null)}
//               >
//                 ←
//               </button>

//               <div>
//                 <h3>{selected.subject}</h3>
//                 <p>{selected.user}</p>
//               </div>
//             </div>

//             <div className="chat-body">
//               <div className="message-bubble user-message">
//                 {selected.message}
//               </div>
//             </div>

//             <div className="chat-reply">
//               <textarea
//                 placeholder="Type your reply..."
//                 value={reply}
//                 onChange={(e) => setReply(e.target.value)}
//               />
//               <button onClick={handleReply}>Send Reply</button>
//             </div>
//           </>
//         ) : (
//           <div className="no-message">
//             Select a conversation to view
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


// export default Support;

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../styles/support.css";

const Support = () => {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chat, setChat] = useState([]);
  const [reply, setReply] = useState("");

  const token = localStorage.getItem("adminToken");

  /* ================================
      FETCH ADMIN MESSAGES
  =================================*/
  const fetchMessages = useCallback(async () => {
    try {
      const res = await axios.get("/api/support/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;

      // Ensure messages is always an array
      if (Array.isArray(data)) {
        setMessages(data);
      } else if (Array.isArray(data.messages)) {
        setMessages(data.messages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Fetch messages error:", error);
      setMessages([]);
    }
  }, [token]);

  /* ================================
      GROUP CONVERSATIONS
  =================================*/
  const groupedUsers = Object.values(
    (Array.isArray(messages) ? messages : []).reduce((acc, msg) => {
      const userId = msg?.user?._id;

      if (!userId) return acc;

      if (!acc[userId]) {
        acc[userId] = {
          userId,
          email: msg.user.email,
          lastMessage: msg.message,
          unread: msg.sender === "user" && !msg.read,
          time: msg.createdAt,
        };
      }

      return acc;
    }, {})
  );

  /* ================================
      OPEN CHAT
  =================================*/
  const openChat = async (user) => {
    setSelectedUser(user);

    const userChat = messages
      .filter((msg) => msg?.user?._id === user.userId)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    setChat(userChat);

    try {
      await axios.put(
        `/api/support/admin/read/${user.userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchMessages();
    } catch (error) {
      console.error("Mark read error:", error);
    }
  };

  /* ================================
      SEND REPLY
  =================================*/
  const sendReply = async () => {
    if (!reply.trim()) return;

    try {
      await axios.post(
        "/api/support/reply",
        {
          userId: selectedUser.userId,
          message: reply,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setReply("");

      await fetchMessages();
      openChat(selectedUser);
    } catch (error) {
      console.error("Reply error:", error);
    }
  };

  /* ================================
      INITIAL LOAD
  =================================*/
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div className="support-container">
      {/* ================= SIDEBAR ================= */}
      <div
        className={`support-sidebar ${
          selectedUser ? "mobile-hide" : ""
        }`}
      >
        <div className="sidebar-header">
          <h2>Support Inbox</h2>
        </div>

        <div className="message-list">
          {groupedUsers.length === 0 && (
            <div className="no-message">
              No support conversations
            </div>
          )}

          {groupedUsers.map((user) => (
            <div
              key={user.userId}
              className={`support-item ${
                selectedUser?.userId === user.userId
                  ? "active"
                  : ""
              } ${user.unread ? "unread" : ""}`}
              onClick={() => openChat(user)}
            >
              <div className="support-item-top">
                <strong>{user.email}</strong>
              </div>

              <p>{user.lastMessage}</p>

              {user.unread && (
                <span className="unread-dot"></span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ================= CHAT ================= */}
      <div
        className={`support-chat ${
          selectedUser ? "mobile-show" : ""
        }`}
      >
        {selectedUser ? (
          <>
            {/* HEADER */}
            <div className="chat-header">
              <button
                className="back-btn"
                onClick={() => setSelectedUser(null)}
              >
                ←
              </button>

              <div>
                <h3>{selectedUser.email}</h3>
                <p>Customer Support</p>
              </div>
            </div>

            {/* CHAT BODY */}
            <div className="chat-body">
              {chat.map((msg) => (
                <div
                  key={msg._id}
                  className={`message-bubble ${
                    msg.sender === "admin"
                      ? "admin-message"
                      : "user-message"
                  }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>

            {/* REPLY BOX */}
            <div className="chat-reply">
              <textarea
                placeholder="Type your reply..."
                value={reply}
                onChange={(e) =>
                  setReply(e.target.value)
                }
              />

              <button onClick={sendReply}>
                Send Reply
              </button>
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


