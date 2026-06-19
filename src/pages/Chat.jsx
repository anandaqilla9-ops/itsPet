import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ─── Dummy data for demo accounts ─── */
const dummyPawrentConversations = [
  {
    id: 1,
    sitterName: "Karina",
    sitterAvatar: "🐱",
    pawrentName: null, // filled at init
    pawrentAvatar: "👤",
    lastMsg: "Kucing kamu sudah makan siang ya!",
    time: "12:30",
    messages: [
      { id: 1, from: "other", text: "Halo! Saya sudah sampai di rumah kamu.", time: "09:00" },
      { id: 2, from: "me", text: "Terima kasih, Karina! Tolong jaga Milo ya 🐱", time: "09:02" },
      { id: 3, from: "other", text: "Siap! Milo sekarang lagi main bola wol 😄", time: "09:15" },
      { id: 4, from: "other", text: "Update: Milo sudah makan pagi, porsinya habis!", time: "10:00" },
      { id: 5, from: "me", text: "Alhamdulillah, biasanya susah makannya 😅", time: "10:05" },
      { id: 6, from: "other", text: "Kucing kamu sudah makan siang ya!", time: "12:30" },
    ],
  },
  {
    id: 2,
    sitterName: "Nashwa Zahira",
    sitterAvatar: "🐶",
    pawrentName: null,
    pawrentAvatar: "👤",
    lastMsg: "Rocky habis jalan-jalan pagi!",
    time: "08:45",
    messages: [
      { id: 1, from: "other", text: "Pagi! Rocky sudah bangun dan excited banget 🐕", time: "07:00" },
      { id: 2, from: "me", text: "Haha iya dia memang paling semangat pagi-pagi!", time: "07:10" },
      { id: 3, from: "other", text: "Rocky habis jalan-jalan pagi!", time: "08:45" },
    ],
  },
  {
    id: 3,
    sitterName: "Aurelia Putri",
    sitterAvatar: "🐰",
    pawrentName: null,
    pawrentAvatar: "👤",
    lastMsg: "Elora tidur siang dengan tenang 💤",
    time: "15:00",
    messages: [
      { id: 1, from: "other", text: "Elora sehat dan aktif hari ini!", time: "09:00" },
      { id: 2, from: "me", text: "Syukurlah! Jangan lupa vitamin-nya ya 💊", time: "09:30" },
      { id: 3, from: "other", text: "Sudah diberikan! Elora minum sendiri kok 😊", time: "09:35" },
      { id: 4, from: "other", text: "Elora tidur siang dengan tenang 💤", time: "15:00" },
    ],
  },
];

const dummySitterConversations = [
  {
    id: 101,
    sitterName: null, // filled at init
    sitterAvatar: "👤",
    pawrentName: "Nathania Rani",
    pawrentAvatar: "👩🏻",
    lastMsg: "Terima kasih banyak!",
    time: "12:35",
    messages: [
      { id: 1, from: "me", text: "Halo! Saya sudah sampai di rumah kamu.", time: "09:00" },
      { id: 2, from: "other", text: "Terima kasih! Tolong jaga Molly ya 🐰", time: "09:02" },
      { id: 3, from: "me", text: "Siap! Molly sekarang lagi main di tamannya 😄", time: "09:15" },
      { id: 4, from: "me", text: "Update: Molly sudah makan pagi, porsinya habis!", time: "10:00" },
      { id: 5, from: "other", text: "Alhamdulillah, makasih ya update-nya 😅", time: "10:05" },
      { id: 6, from: "me", text: "Molly juga sudah saya bersihkan kandangnya ya!", time: "12:30" },
      { id: 7, from: "other", text: "Terima kasih banyak!", time: "12:35" },
    ],
  },
  {
    id: 102,
    sitterName: null,
    sitterAvatar: "👤",
    pawrentName: "Aditya Rasyiid",
    pawrentAvatar: "👨🏻",
    lastMsg: "Keren, terima kasih!",
    time: "15:05",
    messages: [
      { id: 1, from: "me", text: "Elora sehat dan aktif hari ini!", time: "09:00" },
      { id: 2, from: "other", text: "Syukurlah! Jangan lupa vitamin-nya ya 💊", time: "09:30" },
      { id: 3, from: "me", text: "Sudah diberikan! Elora minum sendiri kok 😊", time: "09:35" },
      { id: 4, from: "me", text: "Elora tidur siang dengan tenang 💤", time: "15:00" },
      { id: 5, from: "other", text: "Keren, terima kasih!", time: "15:05" },
    ],
  },
];

/* ─── Auto-reply pool for demo simulation ─── */
const autoReplies = [
  "Baik, terima kasih infonya! 😊",
  "Oke siap, akan saya perhatikan 👍",
  "Noted! Ada lagi yang perlu disampaikan?",
  "Terima kasih sudah update ya!",
  "Sip, saya akan kabari lagi nanti 🐾",
  "Baik, akan saya pastikan semuanya aman 😄",
];

function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);

  const currentUserStr = localStorage.getItem("currentUser");
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
  const isSitter = currentUser?.role === "sitter";
  const isDemo = currentUser?.isDemo === true;

  const storageKey = `chatConversations_${currentUser?.email || "guest"}`;

  /* ─── State ─── */
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) return JSON.parse(saved);

    // Seed with dummy data for demo users
    if (isDemo) {
      if (isSitter) {
        return dummySitterConversations.map(c => ({
          ...c,
          sitterName: currentUser.name,
          sitterAvatar: currentUser.name?.[0]?.toUpperCase() || "S",
        }));
      } else {
        return dummyPawrentConversations.map(c => ({
          ...c,
          pawrentName: currentUser.name,
          pawrentAvatar: currentUser.name?.[0]?.toUpperCase() || "P",
        }));
      }
    }
    return [];
  });

  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  /* ─── Helpers ─── */
  const getOtherName = (conv) => isSitter ? conv.pawrentName : conv.sitterName;
  const getOtherAvatar = (conv) => isSitter ? conv.pawrentAvatar : conv.sitterAvatar;

  const getTimeStr = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  };

  /* ─── Persist conversations ─── */
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(conversations));
    }
  }, [conversations, storageKey]);

  /* ─── Auto-scroll to bottom ─── */
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChat?.messages]);

  /* ─── Handle incoming navigation state (sitter or pawrent) ─── */
  useEffect(() => {
    const targetSitter = location.state?.sitter;
    const targetPawrent = location.state?.pawrent;
    const bookingContext = location.state?.bookingContext;

    if (targetSitter && !isSitter) {
      // Pawrent starting chat with a sitter
      const existing = conversations.find(c => c.sitterName === targetSitter.name);

      if (existing) {
        setActiveChat(existing);
        setShowSidebar(false);
      } else {
        const newConv = {
          id: Date.now(),
          sitterName: targetSitter.name,
          sitterAvatar: targetSitter.name?.[0]?.toUpperCase() || "🐾",
          pawrentName: currentUser.name,
          pawrentAvatar: currentUser.name?.[0]?.toUpperCase() || "P",
          lastMsg: "Halo! Saya tertarik menggunakan jasa Anda 😊",
          time: getTimeStr(),
          messages: [
            { id: 1, from: "me", text: "Halo! Saya tertarik menggunakan jasa Anda 😊", time: getTimeStr() }
          ]
        };
        const updated = [newConv, ...conversations];
        setConversations(updated);
        setActiveChat(newConv);
        setShowSidebar(false);
      }
    } else if (targetPawrent && isSitter) {
      // Sitter starting chat with a pawrent
      const existing = conversations.find(c => c.pawrentName === targetPawrent.name);

      if (existing) {
        if (bookingContext) {
          const updated = conversations.map(c =>
            c.id === existing.id ? { ...c, bookingContext } : c
          );
          setConversations(updated);
          setActiveChat({ ...existing, bookingContext });
        } else {
          setActiveChat(existing);
        }
        setShowSidebar(false);
      } else {
        const greeting = bookingContext
          ? `Halo ${targetPawrent.name}! Pesanan untuk ${bookingContext.petName} sudah saya terima. Ada detail khusus yang perlu saya perhatikan?`
          : `Halo ${targetPawrent.name}! Ada yang bisa saya bantu?`;
        
        const newConv = {
          id: Date.now(),
          sitterName: currentUser.name,
          sitterAvatar: currentUser.name?.[0]?.toUpperCase() || "S",
          pawrentName: targetPawrent.name,
          pawrentAvatar: targetPawrent.name?.[0]?.toUpperCase() || "P",
          bookingContext,
          lastMsg: greeting,
          time: getTimeStr(),
          messages: [
            { id: 1, from: "me", text: greeting, time: getTimeStr() }
          ]
        };
        const updated = [newConv, ...conversations];
        setConversations(updated);
        setActiveChat(newConv);
        setShowSidebar(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  /* ─── Default active chat ─── */
  useEffect(() => {
    if (conversations.length > 0 && !activeChat) {
      setActiveChat(conversations[0]);
    }
  }, [conversations, activeChat]);

  /* ─── Send message ─── */
  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;
    addMessageToChat(newMessage.trim());
    setNewMessage("");
  };

  const addMessageToChat = (text, type = "text") => {
    const timeStr = getTimeStr();
    const msg = {
      id: Date.now(),
      from: "me",
      text,
      time: timeStr,
      type,
    };

    const updatedConversations = conversations.map(c =>
      c.id === activeChat.id
        ? {
            ...c,
            messages: [...c.messages, msg],
            lastMsg: type === "media" ? "📷 Foto/Video terkirim" : text,
            time: timeStr,
          }
        : c
    );

    setConversations(updatedConversations);
    setActiveChat(updatedConversations.find(c => c.id === activeChat.id));

    // Simulate auto-reply for demo accounts
    if (isDemo) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
        const replyTime = getTimeStr();
        const replyMsg = {
          id: Date.now() + 1,
          from: "other",
          text: reply,
          time: replyTime,
        };

        setConversations(prev => {
          const updated = prev.map(c =>
            c.id === activeChat.id
              ? { ...c, messages: [...c.messages, replyMsg], lastMsg: reply, time: replyTime }
              : c
          );
          setActiveChat(updated.find(c => c.id === activeChat.id));
          return updated;
        });
      }, 1500 + Math.random() * 1500);
    }
  };

  const handleMediaUpload = () => {
    const confirmUpload = window.confirm("Akses Kamera/Galeri: Pilih foto atau video untuk dikirim?");
    if (confirmUpload) {
      addMessageToChat("🖼️ [Foto/Video Attachment]", "media");
    }
  };

  const handleVoiceCall = () => {
    const otherName = activeChat ? getOtherName(activeChat) : "Pengguna";
    alert(`Memulai Voice Call dengan ${otherName}... 📞`);
  };

  const handleVideoCall = () => {
    const otherName = activeChat ? getOtherName(activeChat) : "Pengguna";
    alert(`Memulai Video Call dengan ${otherName}... 📹`);
  };

  const selectChat = (conv) => {
    setActiveChat(conv);
    setShowSidebar(false);
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-content">
        <div className="chat-page-header">
          <button onClick={() => navigate(-1)} className="back-btn">
            ← Kembali
          </button>
          {/* Mobile: toggle sidebar */}
          <button 
            className="chat-mobile-toggle"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? "💬 Chat" : "📋 Daftar Chat"}
          </button>
        </div>

        <div className="chat-container">
          {/* ── Sidebar ── */}
          <div className={`chat-sidebar ${showSidebar ? "show" : "hide-mobile"}`}>
            <div className="chat-sidebar-header">
              <h3>💬 Pesan</h3>
              <span className="chat-count">{conversations.length} percakapan</span>
            </div>
            <div className="chat-list">
              {conversations.length === 0 ? (
                <div className="chat-empty-sidebar">
                  <span className="chat-empty-icon">💬</span>
                  <p>Belum ada pesan</p>
                  <span>Mulai chat dari halaman {isSitter ? "pesanan" : "pencarian sitter"}</span>
                </div>
              ) : (
                conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`chat-list-item ${activeChat?.id === conv.id ? "active" : ""}`}
                    onClick={() => selectChat(conv)}
                  >
                    <div className="chat-list-avatar">{getOtherAvatar(conv)}</div>
                    <div className="chat-list-info">
                      <h4>{getOtherName(conv)}</h4>
                      <p>{conv.lastMsg}</p>
                    </div>
                    <span className="chat-list-time">{conv.time}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ── Main Chat Area ── */}
          <div className={`chat-main ${!showSidebar ? "show" : "hide-mobile"}`}>
            {activeChat ? (
              <>
                <div className="chat-main-header">
                  <div className="chat-header-left">
                    <span className="chat-main-avatar">{getOtherAvatar(activeChat)}</span>
                    <div>
                      <h3>{getOtherName(activeChat)}</h3>
                      <span className="chat-online-status">
                        {isTyping ? "Sedang mengetik..." : "● Online"}
                      </span>
                      {activeChat.bookingContext && (
                        <span className="chat-booking-badge">
                          📅 {activeChat.bookingContext.date} — {activeChat.bookingContext.petName} ({activeChat.bookingContext.petType})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="chat-call-actions">
                    <button onClick={handleVoiceCall} title="Voice Call" className="chat-call-btn">📞</button>
                    <button onClick={handleVideoCall} title="Video Call" className="chat-call-btn">📹</button>
                  </div>
                </div>

                <div className="chat-messages" ref={chatMessagesRef}>
                  {/* Date separator */}
                  <div className="chat-date-separator">
                    <span>Hari ini</span>
                  </div>

                  {activeChat.messages.map((msg) => (
                    <div key={msg.id} className={`chat-bubble ${msg.from === "me" ? "me" : "other"}`}>
                      <p>{msg.text}</p>
                      <span className="chat-bubble-time">
                        {msg.time} {msg.from === "me" && "✓✓"}
                      </span>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="chat-bubble other chat-typing">
                      <div className="typing-dots">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form className="chat-input-area" onSubmit={handleSend}>
                  <button
                    type="button"
                    onClick={handleMediaUpload}
                    title="Kirim Foto/Video"
                    className="chat-attach-btn"
                  >
                    📎
                  </button>
                  <input
                    type="text"
                    placeholder="Tulis pesan..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button type="submit" className="chat-send-btn">
                    <span className="send-icon">➤</span>
                    <span className="send-text">Kirim</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="chat-empty-state">
                <div className="chat-empty-illustration">
                  <span>💬</span>
                </div>
                <h3>Pilih percakapan</h3>
                <p>Pilih chat dari daftar di samping atau mulai percakapan baru dari halaman {isSitter ? "pesanan" : "pencarian sitter"}.</p>
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
