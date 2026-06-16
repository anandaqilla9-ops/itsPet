import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

const dummySitterConversations = [
  {
    id: 1,
    name: "Nathania Rani",
    avatar: "👩🏻",
    lastMsg: "Terima kasih banyak!",
    time: "12:35",
    messages: [
      { id: 1, from: "me", text: "Halo! Saya sudah sampai di rumah kamu.", time: "09:00" },
      { id: 2, from: "pawrent", text: "Terima kasih! Tolong jaga Molly ya 🐰", time: "09:02" },
      { id: 3, from: "me", text: "Siap! Molly sekarang lagi main di tamannya 😄", time: "09:15" },
      { id: 4, from: "me", text: "Update: Molly sudah makan pagi, porsinya habis!", time: "10:00" },
      { id: 5, from: "pawrent", text: "Alhamdulillah, makasih ya update-nya 😅", time: "10:05" },
      { id: 6, from: "me", text: "Molly juga sudah saya bersihkan kandangnya ya!", time: "12:30" },
      { id: 7, from: "pawrent", text: "Terima kasih banyak!", time: "12:35" },
    ],
  },
  {
    id: 2,
    name: "Aditya Rasyiid",
    avatar: "👨🏻",
    lastMsg: "Keren, terima kasih!",
    time: "15:05",
    messages: [
      { id: 1, from: "me", text: "Elora sehat dan aktif hari ini!", time: "09:00" },
      { id: 2, from: "pawrent", text: "Syukurlah! Jangan lupa vitamin-nya ya 💊", time: "09:30" },
      { id: 3, from: "me", text: "Sudah diberikan! Elora minum sendiri kok 😊", time: "09:35" },
      { id: 4, from: "me", text: "Elora tidur siang dengan tenang 💤", time: "15:00" },
      { id: 5, from: "pawrent", text: "Keren, terima kasih!", time: "15:05" },
    ],
  },
];

function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentUserStr = localStorage.getItem("currentUser");
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
  const isSitter = currentUser?.role === "sitter";

  // Use a global key for all conversations
  const storageKey = "globalConversations";

  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : []; // start empty if none
  });

  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Determine what conversations to show based on role
  const myConversations = conversations.filter(c => 
    isSitter ? c.sitter?.name === currentUser?.name : c.pawrent?.name === currentUser?.name
  );

  // Default active chat
  useEffect(() => {
    if (myConversations.length > 0 && !activeChat) {
      setActiveChat(myConversations[0]);
    }
  }, [myConversations, activeChat]);

  // Handle incoming sitter or pawrent from Navigation
  useEffect(() => {
    const targetSitter = location.state?.sitter;
    const targetPawrent = location.state?.pawrent;
    const bookingContext = location.state?.bookingContext;

    if (targetSitter && !isSitter) {
      // Pawrent initiating chat with Sitter
      const existingConv = conversations.find(c => c.sitter?.name === targetSitter.name && c.pawrent?.name === currentUser.name);
      
      if (existingConv) {
        setActiveChat(existingConv);
      } else {
        const newConv = {
          id: Date.now(),
          sitter: targetSitter,
          pawrent: currentUser,
          lastMsg: "Halo! Saya ingin menggunakan jasa Anda.",
          time: "Baru saja",
          messages: [
            { id: 1, from: currentUser.name, text: "Halo! Saya tertarik menggunakan jasa Anda.", time: "Baru saja" }
          ]
        };
        const updated = [newConv, ...conversations];
        setConversations(updated);
        setActiveChat(newConv);
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
    } else if (targetPawrent && isSitter) {
      // Sitter initiating chat with Pawrent
      const existingConv = conversations.find(c => c.pawrent?.name === targetPawrent.name && c.sitter?.name === currentUser.name);
      
      if (existingConv) {
        // optionally update context if needed, but here we just select it
        if (bookingContext) {
          existingConv.bookingContext = bookingContext; // attach recent booking context
        }
        setActiveChat(existingConv);
      } else {
        const newConv = {
          id: Date.now(),
          sitter: currentUser,
          pawrent: targetPawrent,
          bookingContext,
          lastMsg: "Halo, pesanan Anda sudah saya terima.",
          time: "Baru saja",
          messages: [
            { id: 1, from: currentUser.name, text: "Halo, pesanan Anda sudah saya terima. Ada detail khusus?", time: "Baru saja" }
          ]
        };
        const updated = [newConv, ...conversations];
        setConversations(updated);
        setActiveChat(newConv);
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
    }
  }, [location.state, currentUser, isSitter]);

  // Persist conversations when they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(conversations));
    }
  }, [conversations]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    addMessageToChat(newMessage.trim());
    setNewMessage("");
  };

  const addMessageToChat = (text, type = "text") => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const msg = {
      id: Date.now(),
      from: currentUser.name,
      text: text,
      time: timeStr,
      type: type
    };

    const updatedConversations = conversations.map((c) =>
      c.id === activeChat.id
        ? { ...c, messages: [...c.messages, msg], lastMsg: type === "media" ? "📷 Foto/Video terkirim" : msg.text, time: msg.time }
        : c
    );

    setConversations(updatedConversations);
    setActiveChat(updatedConversations.find((c) => c.id === activeChat.id));
  };

  const handleMediaUpload = () => {
    // Simulate media upload
    const confirmUpload = window.confirm("Akses Kamera/Galeri: Pilih foto atau video untuk dikirim?");
    if (confirmUpload) {
      addMessageToChat("🖼️ [Foto/Video Attachment]", "media");
    }
  };

  const handleVoiceCall = () => {
    alert(`Memulai Voice Call dengan ${activeChat.name}... 📞`);
  };

  const handleVideoCall = () => {
    alert(`Memulai Video Call dengan ${activeChat.name}... 📹`);
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
              {myConversations.length === 0 ? (
                <p style={{ padding: '20px', color: '#888', textAlign: 'center' }}>Belum ada pesan.</p>
              ) : (
                myConversations.map((conv) => {
                  const targetUser = isSitter ? conv.pawrent : conv.sitter;
                  return (
                    <div
                      key={conv.id}
                      className={`chat-list-item ${activeChat?.id === conv.id ? "active" : ""}`}
                      onClick={() => setActiveChat(conv)}
                    >
                      <div className="chat-list-avatar">{targetUser?.avatar || "👤"}</div>
                      <div className="chat-list-info">
                        <h4>{targetUser?.name}</h4>
                        <p>{conv.lastMsg}</p>
                      </div>
                      <span className="chat-list-time">{conv.time}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="chat-main">
            {activeChat ? (
              <>
                <div className="chat-main-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="chat-main-avatar">{(isSitter ? activeChat.pawrent?.avatar : activeChat.sitter?.avatar) || "👤"}</span>
                    <div>
                      <h3>{(isSitter ? activeChat.pawrent?.name : activeChat.sitter?.name) || "Pengguna"}</h3>
                      {activeChat.bookingContext && (
                        <span style={{ fontSize: '0.8rem', color: '#666', background: '#f1f1f1', padding: '2px 6px', borderRadius: '4px' }}>
                          📅 {activeChat.bookingContext.date} - {activeChat.bookingContext.petName} ({activeChat.bookingContext.petType})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="chat-call-actions" style={{ display: 'flex', gap: '15px', marginRight: '10px' }}>
                    <button onClick={handleVoiceCall} title="Voice Call" style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>📞</button>
                    <button onClick={handleVideoCall} title="Video Call" style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>📹</button>
                  </div>
                </div>

                <div className="chat-messages">
                  {activeChat.messages.map((msg) => (
                    <div key={msg.id} className={`chat-bubble ${msg.from === currentUser.name ? "me" : "other"}`}>
                      <p>{msg.text}</p>
                      <span className="chat-bubble-time">{msg.time}</span>
                    </div>
                  ))}
                </div>

                <form className="chat-input-area" onSubmit={handleSend} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button 
                    type="button" 
                    onClick={handleMediaUpload}
                    title="Kirim Foto/Video"
                    style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', padding: '0 5px' }}
                  >
                    📎
                  </button>
                  <input
                    type="text"
                    placeholder="Tulis pesan..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button type="submit">Kirim</button>
                </form>
              </>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#888' }}>
                <p>Pilih percakapan untuk memulai chat.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Chat;
