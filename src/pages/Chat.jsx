import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const dummyConversations = [
  {
    id: 1,
    name: "Karina",
    avatar: "🐱",
    lastMsg: "Kucing kamu sudah makan siang ya!",
    time: "12:30",
    messages: [
      { id: 1, from: "sitter", text: "Halo! Saya sudah sampai di rumah kamu.", time: "09:00" },
      { id: 2, from: "me", text: "Terima kasih, Karina! Tolong jaga Milo ya 🐱", time: "09:02" },
      { id: 3, from: "sitter", text: "Siap! Milo sekarang lagi main bola wol 😄", time: "09:15" },
      { id: 4, from: "sitter", text: "Update: Milo sudah makan pagi, porsinya habis!", time: "10:00" },
      { id: 5, from: "me", text: "Alhamdulillah, biasanya susah makannya 😅", time: "10:05" },
      { id: 6, from: "sitter", text: "Kucing kamu sudah makan siang ya!", time: "12:30" },
    ],
  },
  {
    id: 2,
    name: "Nashwa Zahira",
    avatar: "🐶",
    lastMsg: "Rocky habis jalan-jalan pagi!",
    time: "08:45",
    messages: [
      { id: 1, from: "sitter", text: "Pagi! Rocky sudah bangun dan excited banget 🐕", time: "07:00" },
      { id: 2, from: "me", text: "Haha iya dia memang paling semangat pagi-pagi!", time: "07:10" },
      { id: 3, from: "sitter", text: "Rocky habis jalan-jalan pagi!", time: "08:45" },
    ],
  },
  {
    id: 3,
    name: "Aurelia Putri",
    avatar: "🐰",
    lastMsg: "Elora tidur siang dengan tenang 💤",
    time: "15:00",
    messages: [
      { id: 1, from: "sitter", text: "Elora sehat dan aktif hari ini!", time: "09:00" },
      { id: 2, from: "me", text: "Syukurlah! Jangan lupa vitamin-nya ya 💊", time: "09:30" },
      { id: 3, from: "sitter", text: "Sudah diberikan! Elora minum sendiri kok 😊", time: "09:35" },
      { id: 4, from: "sitter", text: "Elora tidur siang dengan tenang 💤", time: "15:00" },
    ],
  },
];

function Chat() {
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState(dummyConversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState(dummyConversations);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const msg = {
      id: Date.now(),
      from: "me",
      text: newMessage.trim(),
      time: timeStr,
    };

    const updatedConversations = conversations.map((c) =>
      c.id === activeChat.id
        ? { ...c, messages: [...c.messages, msg], lastMsg: msg.text, time: msg.time }
        : c
    );

    setConversations(updatedConversations);
    setActiveChat(updatedConversations.find((c) => c.id === activeChat.id));
    setNewMessage("");
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-content">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Kembali
        </button>

        <div className="chat-container">
          {/* Sidebar */}
          <div className="chat-sidebar">
            <div className="chat-sidebar-header">
              <h3>💬 Pesan</h3>
            </div>
            <div className="chat-list">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`chat-list-item ${activeChat.id === conv.id ? "active" : ""}`}
                  onClick={() => setActiveChat(conv)}
                >
                  <div className="chat-list-avatar">{conv.avatar}</div>
                  <div className="chat-list-info">
                    <h4>{conv.name}</h4>
                    <p>{conv.lastMsg}</p>
                  </div>
                  <span className="chat-list-time">{conv.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="chat-main">
            <div className="chat-main-header">
              <span className="chat-main-avatar">{activeChat.avatar}</span>
              <div>
                <h3>{activeChat.name}</h3>
                <span className="chat-online-status">● Online</span>
              </div>
            </div>

            <div className="chat-messages">
              {activeChat.messages.map((msg) => (
                <div key={msg.id} className={`chat-bubble ${msg.from === "me" ? "me" : "other"}`}>
                  <p>{msg.text}</p>
                  <span className="chat-bubble-time">{msg.time}</span>
                </div>
              ))}
            </div>

            <form className="chat-input-area" onSubmit={handleSend}>
              <input
                type="text"
                placeholder="Tulis pesan..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit">Kirim</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Chat;
