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

import React, { useState, useEffect } from "react";
import "../styles/support.css";

const Support = () => {

  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");

  const token = localStorage.getItem("adminToken");

  // Fetch all support messages
  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/support/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Group by user
  const conversations = Object.values(
    messages.reduce((acc, msg) => {
      const userId = msg.user._id;

      if (!acc[userId]) {
        acc[userId] = {
          user: msg.user,
          messages: [],
        };
      }

      acc[userId].messages.push(msg);
      return acc;
    }, {})
  );

  const handleReply = async () => {
    if (!reply.trim()) return alert("Reply cannot be empty");

    try {
      const res = await fetch("/api/support/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: selected.user._id,
          message: reply,
        }),
      });

      const data = await res.json();

      setSelected((prev) => ({
        ...prev,
        messages: [...prev.messages, data],
      }));

      setReply("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="support-container">

      {/* Sidebar */}
      <div className={`support-sidebar ${selected ? "mobile-hide" : ""}`}>
        <div className="sidebar-header">
          <h2>Support Inbox</h2>
        </div>

        <div className="message-list">
          {conversations.map((conv) => {
            const lastMsg = conv.messages[conv.messages.length - 1];

            return (
              <div
                key={conv.user._id}
                className={`support-item ${
                  selected?.user._id === conv.user._id ? "active" : ""
                }`}
                onClick={() => setSelected(conv)}
              >
                <div className="support-item-top">
                  <strong>{conv.user.email}</strong>
                  <span>
                    {new Date(lastMsg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <p>{lastMsg.message}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat */}
      <div className={`support-chat ${selected ? "mobile-show" : ""}`}>
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
                <h3>{selected.user.email}</h3>
                <p>Customer Support</p>
              </div>
            </div>

            <div className="chat-body">
              {selected.messages.map((msg) => (
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
