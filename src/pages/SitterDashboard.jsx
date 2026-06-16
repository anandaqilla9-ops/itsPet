import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { dummyBookings, dummyEarnings } from "../data/bookings";

function SitterDashboard() {
  const navigate = useNavigate();
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #f0f6ff 0%, #e8f4fd 40%, #d1f8ef 100%)",
    fontFamily: "Poppins, sans-serif",
  },
  hero: {
    background: "linear-gradient(135deg, #3674B5 0%, #578FCA 50%, #7FB3E0 100%)",
    paddingTop: "100px",
    paddingBottom: "60px",
    paddingLeft: "20px",
    paddingRight: "20px",
    position: "relative",
    overflow: "hidden",
  },
  heroOrb1: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.06)",
    top: "-80px",
    right: "-60px",
    pointerEvents: "none",
  },
  heroOrb2: {
    position: "absolute",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "rgba(161,227,249,0.15)",
    bottom: "20px",
    left: "5%",
    pointerEvents: "none",
  },
  heroInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    position: "relative",
    zIndex: 1,
  },
  heroAvatar: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.25)",
    border: "3px solid rgba(255,255,255,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    color: "#fff",
    fontWeight: "bold",
    flexShrink: 0,
  },
  heroTextBlock: {
    flex: 1,
    minWidth: "200px",
  },
  heroGreet: {
    fontSize: "0.95rem",
    color: "rgba(255,255,255,0.8)",
    marginBottom: "4px",
    letterSpacing: "0.5px",
  },
  heroName: {
    fontSize: "2.2rem",
    fontWeight: "800",
    color: "#fff",
    margin: "0 0 6px 0",
    lineHeight: 1.2,
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.35)",
    color: "#fff",
    borderRadius: "20px",
    padding: "4px 14px",
    fontSize: "0.82rem",
    fontWeight: "600",
    backdropFilter: "blur(6px)",
  },
  heroCta: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  ctaBtn: {
    display: "inline-block",
    padding: "11px 22px",
    borderRadius: "25px",
    fontWeight: "700",
    fontSize: "0.9rem",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  },

  /* Stat Cards */
  statsRow: {
    maxWidth: "1200px",
    margin: "-36px auto 0",
    padding: "0 20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
    position: "relative",
    zIndex: 2,
  },
  statCard: {
    borderRadius: "20px",
    padding: "28px 24px",
    boxShadow: "0 8px 32px rgba(54,116,181,0.12)",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    transition: "transform 0.25s, box-shadow 0.25s",
    cursor: "default",
  },
  statIcon: {
    width: "58px",
    height: "58px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.6rem",
    flexShrink: 0,
  },
  statLabel: {
    fontSize: "0.82rem",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    marginBottom: "6px",
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: "800",
    lineHeight: 1,
    margin: "0 0 4px 0",
  },
  statSub: {
    fontSize: "0.8rem",
    margin: 0,
  },

  /* Bookings Section */
  section: {
    maxWidth: "1200px",
    margin: "40px auto 0",
    padding: "0 20px 60px",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "#1e3a5f",
    margin: 0,
  },
  bookingCard: {
    background: "#fff",
    borderRadius: "18px",
    padding: "22px 24px",
    marginBottom: "14px",
    boxShadow: "0 4px 20px rgba(54,116,181,0.08)",
    border: "1px solid rgba(54,116,181,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  bookingAvatar: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#fff",
    flexShrink: 0,
  },
  bookingInfo: {
    flex: 1,
    minWidth: "160px",
  },
  bookingName: {
    margin: "0 0 4px 0",
    color: "#1e3a5f",
    fontSize: "1rem",
    fontWeight: "700",
  },
  bookingMeta: {
    margin: "0 0 6px 0",
    color: "#5a7fa8",
    fontSize: "0.85rem",
  },
  statusBadge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.78rem",
    fontWeight: "700",
    letterSpacing: "0.3px",
  },
  actionGroup: {
    display: "flex",
    gap: "10px",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  actionRow: {
    display: "flex",
    gap: "8px",
  },
  btnDetail: {
    padding: "9px 16px",
    border: "2px solid #578FCA",
    background: "transparent",
    color: "#3674B5",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "0.85rem",
    fontFamily: "Poppins, sans-serif",
    transition: "background 0.2s, color 0.2s",
  },
  btnTerima: {
    padding: "9px 16px",
    border: "none",
    background: "linear-gradient(135deg, #43c97e, #2ecc71)",
    color: "#fff",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "0.85rem",
    fontFamily: "Poppins, sans-serif",
    boxShadow: "0 4px 12px rgba(46,204,113,0.35)",
    transition: "transform 0.15s",
  },
  btnTolak: {
    padding: "9px 16px",
    border: "none",
    background: "linear-gradient(135deg, #ff6b6b, #e74c3c)",
    color: "#fff",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "0.85rem",
    fontFamily: "Poppins, sans-serif",
    boxShadow: "0 4px 12px rgba(231,76,60,0.3)",
    transition: "transform 0.15s",
  },
  btnChat: {
    padding: "9px 16px",
    border: "none",
    background: "linear-gradient(135deg, #3674B5, #578FCA)",
    color: "#fff",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "0.85rem",
    textDecoration: "none",
    display: "inline-block",
    boxShadow: "0 4px 12px rgba(54,116,181,0.35)",
  },

  /* Modal */
  overlay: {
    position: "fixed",
    top: 0, left: 0, width: "100%", height: "100%",
    background: "rgba(10,30,60,0.55)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    borderRadius: "24px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    overflow: "hidden",
    animation: "slideUp 0.3s ease",
  },
  modalHeader: {
    background: "linear-gradient(135deg, #3674B5, #578FCA)",
    padding: "24px 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    color: "#fff",
    fontWeight: "800",
    fontSize: "1.25rem",
    margin: 0,
  },
  modalClose: {
    background: "rgba(255,255,255,0.2)",
    border: "none",
    color: "#fff",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins, sans-serif",
  },
  modalBody: {
    padding: "24px 28px",
  },
  modalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: "14px",
    marginBottom: "14px",
    borderBottom: "1px solid #f0f4f9",
  },
  modalLabel: {
    color: "#7a9bbf",
    fontSize: "0.88rem",
    fontWeight: "600",
  },
  modalValue: {
    fontWeight: "700",
    color: "#1e3a5f",
    fontSize: "0.9rem",
    textAlign: "right",
    maxWidth: "60%",
  },
  modalNoteBox: {
    background: "linear-gradient(135deg, #f0f6ff, #e8f4fd)",
    border: "1px solid #c8dff5",
    borderRadius: "12px",
    padding: "12px 16px",
    color: "#3674B5",
    fontStyle: "italic",
    fontSize: "0.9rem",
    marginTop: "4px",
  },
  modalFooter: {
    padding: "0 28px 28px",
  },
  btnClose: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #3674B5, #578FCA)",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    fontSize: "1rem",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    boxShadow: "0 6px 20px rgba(54,116,181,0.35)",
  },
};

const STATUS_STYLE = {
  Menunggu:  { background: "#fff3e0", color: "#e65100" },
  Diterima:  { background: "#e3f2fd", color: "#1565c0" },
  Ditolak:   { background: "#fce4ec", color: "#c62828" },
  Selesai:   { background: "#e8f5e9", color: "#2e7d32" },
};

const AVATAR_COLORS = ["#3674B5","#578FCA","#43c97e","#ff6b6b","#FFB300","#9C27B0"];

function avatarColor(name = "") {
  const i = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[i];
}

function SitterDashboard() {
  const currentUserStr = localStorage.getItem("currentUser");
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

  const [bookings, setBookings] = useState([]);
  const [earnings, setEarnings] = useState([]);

  useEffect(() => {
    setBookings(dummyBookings);
    setEarnings(dummyEarnings);
  }, []);

  if (!currentUser) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="main-content" style={{ textAlign: "center" }}>
          <h2>Data pengguna tidak ditemukan. Silakan login kembali.</h2>
          <button onClick={() => navigate("/login")} className="back-home-btn">Login</button>
        </div>
        <Footer />
      </div>
    );
  }

  const pendingBookings = bookings.filter(b => b.status === "pending");
  const acceptedBookings = bookings.filter(b => b.status === "accepted");
  const completedBookings = bookings.filter(b => b.status === "completed");
  const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-content">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Kembali
        </button>

        <div className="sitter-dashboard-container">
          {/* Header Section */}
          <div className="sitter-dashboard-header">
            <div className="sitter-profile-summary">
              <div className="sitter-avatar-large">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} />
                ) : (
                  <span>{currentUser.name ? currentUser.name[0].toUpperCase() : "S"}</span>
                )}
              </div>
              <div className="sitter-profile-info">
                <h1>{currentUser.name}</h1>
                <p>🏠 Pet Sitter Terverifikasi</p>
                <div className="sitter-status-badge">✅ Aktif</div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="sitter-stats-grid">
            <div className="stat-card">
              <h3>⭐ Rating</h3>
              <p className="stat-value">{currentUser.rating || "4.8"}</p>
              <span className="stat-label">dari 5.0</span>
            </div>
            <div className="stat-card">
              <h3>📅 Booking Diterima</h3>
              <p className="stat-value">{acceptedBookings.length}</p>
              <span className="stat-label">Bulan ini</span>
            </div>
            <div className="stat-card">
              <h3>✅ Selesai</h3>
              <p className="stat-value">{completedBookings.length}</p>
              <span className="stat-label">Total selesai</span>
            </div>
            <div className="stat-card">
              <h3>💰 Pendapatan</h3>
              <p className="stat-value">Rp {totalEarnings.toLocaleString("id-ID")}</p>
              <span className="stat-label">Total</span>
            </div>
          </div>

          {/* Info Sections */}
          <div className="sitter-info-section">
            <h2>📋 Detail Sitter</h2>
            <div className="sitter-info-grid">
              <div className="info-item">
                <span className="info-label">Pengalaman</span>
                <span className="info-value">{currentUser.experience || "1 - 3 tahun"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Lokasi</span>
                <span className="info-value">Surabaya</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status Verifikasi</span>
                <span className="info-value" style={{ color: "green"}}>✅ Terverifikasi</span>
              </div>
              <div className="info-item">
                <span className="info-label">Anggota Sejak</span>
                <span className="info-value">Jan 2024</span>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="sitter-info-section">
            <h2>🏄 Keahlian / Layanan</h2>
            <div className="sitter-skills-display">
              {currentUser.skills && currentUser.skills.length > 0 ? (
                currentUser.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))
              ) : (
                <>
                  <span className="skill-tag">🐱 Kucing</span>
                  <span className="skill-tag">🐶 Anjing</span>
                </>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="sitter-info-section">
            <h2>📊 Statistik Cepat</h2>
            <div className="quick-stats-grid">
              <div className="quick-stat">
                <span className="quick-stat-label">Booking Pending</span>
                <span className="quick-stat-value pending">{pendingBookings.length}</span>
              </div>
              <div className="quick-stat">
                <span className="quick-stat-label">Booking Aktif</span>
                <span className="quick-stat-value active">{acceptedBookings.length}</span>
              </div>
              <div className="quick-stat">
                <span className="quick-stat-label">Total Hewan Dirawat</span>
                <span className="quick-stat-value">{bookings.length}</span>
              </div>
              <div className="quick-stat">
                <span className="quick-stat-label">Rating Rata-rata</span>
                <span className="quick-stat-value">{currentUser.rating || "4.8"}⭐</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sitter-action-buttons">
            <button onClick={() => navigate("/sitter-bookings")} className="action-btn primary">
              📬 Kelola Booking
            </button>
            <button onClick={() => navigate("/sitter-monitoring")} className="action-btn primary">
              📸 Update Hewan
            </button>
            <button onClick={() => navigate("/earnings")} className="action-btn primary">
              💰 Lihat Pendapatan
            </button>
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Load from localStorage on mount
  useState(() => {
    const allBookings = JSON.parse(localStorage.getItem("globalBookings") || "[]");
    const myBookings = allBookings.filter(b => b.sitter?.name === currentUser?.name);
    if (myBookings.length > 0) {
      setBookings(myBookings);
    } else {
      setBookings([
        { id: 1, pawrent: { name: "Budi Santoso", address: "Jl. Sudirman No 10" }, petName: "Kitty", petType: "Kucing", date: "2026-06-18", time: "09:00", status: "Menunggu", visits: 1, notes: "Jangan lupa vitamin" },
        { id: 2, pawrent: { name: "Raisha Annette", address: "Jl. Mawar 2" }, petName: "Rocky", petType: "Anjing", date: "2026-06-17", time: "15:00", status: "Selesai", visits: 1, notes: "" }
      ]);
    }
  }, []);

  const handleTerima = (id) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: "Diterima" } : b);
    setBookings(updated);
    updateGlobalBookings(id, "Diterima");
  };

  const handleTolak = (id) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: "Ditolak" } : b);
    setBookings(updated);
    updateGlobalBookings(id, "Ditolak");
  };

  const updateGlobalBookings = (id, newStatus) => {
    const allBookings = JSON.parse(localStorage.getItem("globalBookings") || "[]");
    const updatedAll = allBookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    localStorage.setItem("globalBookings", JSON.stringify(updatedAll));
  };

  const earnings = bookings
    .filter(b => b.status === "Selesai")
    .reduce((acc, b) => acc + (b.totalPrice || 150000), 0);

  const activeCount = bookings.filter(b => b.status === "Diterima" || b.status === "Menunggu").length;

  return (
    <div style={styles.wrapper}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
        .stat-card-hover:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(54,116,181,0.18) !important; }
        .booking-card-hover:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(54,116,181,0.14) !important; }
        .btn-detail-hover:hover { background: #3674B5 !important; color: #fff !important; }
        .btn-terima-hover:hover { transform: scale(1.04); }
        .btn-tolak-hover:hover  { transform: scale(1.04); }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <div style={styles.hero}>
        <div style={styles.heroOrb1} />
        <div style={styles.heroOrb2} />
        <div style={styles.heroInner}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={styles.heroAvatar}>
              {(currentUser?.name || "S")[0].toUpperCase()}
            </div>
            <div style={styles.heroTextBlock}>
              <p style={styles.heroGreet}>Halo, selamat datang kembali 👋</p>
              <h1 style={styles.heroName}>{currentUser?.name || "Pet Sitter"}</h1>
              <span style={styles.heroBadge}>🐾 Pet Sitter Aktif</span>
            </div>
          </div>
          <div style={styles.heroCta}>
            <Link
              to="/sitter-reviews"
              style={{ ...styles.ctaBtn, background: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)" }}
            >
              🌟 Lihat Ulasan
            </Link>
            <Link
              to="/chat"
              style={{ ...styles.ctaBtn, background: "#fff", color: "#3674B5", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
            >
              💬 Chat
            </Link>
          </div>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div style={styles.statsRow}>
        {/* Earnings */}
        <div
          className="stat-card-hover"
          style={{ ...styles.statCard, background: "#fff" }}
        >
          <div style={{ ...styles.statIcon, background: "linear-gradient(135deg, #43c97e22, #43c97e44)" }}>
            💰
          </div>
          <div>
            <p style={{ ...styles.statLabel, color: "#43c97e" }}>Total Penghasilan</p>
            <p style={{ ...styles.statValue, color: "#1e3a5f" }}>
              Rp {earnings > 0 ? earnings.toLocaleString("id-ID") : "1.250.000"}
            </p>
            <p style={{ ...styles.statSub, color: "#7a9bbf" }}>Bulan ini (Juni 2026)</p>
          </div>
        </div>

        {/* Active Bookings */}
        <div
          className="stat-card-hover"
          style={{ ...styles.statCard, background: "#fff" }}
        >
          <div style={{ ...styles.statIcon, background: "linear-gradient(135deg, #578FCA22, #578FCA44)" }}>
            📅
          </div>
          <div>
            <p style={{ ...styles.statLabel, color: "#578FCA" }}>Pesanan Aktif</p>
            <p style={{ ...styles.statValue, color: "#1e3a5f" }}>{activeCount}</p>
            <p style={{ ...styles.statSub, color: "#7a9bbf" }}>Berlangsung & menunggu konfirmasi</p>
          </div>
        </div>

        {/* Rating */}
        <div
          className="stat-card-hover"
          style={{ ...styles.statCard, background: "#fff" }}
        >
          <div style={{ ...styles.statIcon, background: "linear-gradient(135deg, #FFB30022, #FFB30044)" }}>
            🌟
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ ...styles.statLabel, color: "#FFB300" }}>Reputasi Sitter</p>
            <p style={{ ...styles.statValue, color: "#1e3a5f" }}>4.9</p>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <p style={{ ...styles.statSub, color: "#7a9bbf" }}>Dari 24 ulasan</p>
              <Link to="/sitter-reviews" style={{ fontSize: "0.8rem", color: "#3674B5", textDecoration: "none", fontWeight: "700" }}>Lihat →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOOKINGS LIST ── */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>📋 Pesanan Terbaru</h2>
          <span style={{ fontSize: "0.85rem", color: "#7a9bbf", fontWeight: "600" }}>
            {bookings.length} total pesanan
          </span>
        </div>

        {bookings.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: "18px", boxShadow: "0 4px 20px rgba(54,116,181,0.07)" }}>
            <p style={{ fontSize: "3rem", marginBottom: "10px" }}>🐾</p>
            <p style={{ color: "#7a9bbf", fontSize: "1.1rem", fontWeight: "600" }}>Belum ada pesanan masuk</p>
            <p style={{ color: "#b0c8e0", fontSize: "0.9rem", marginTop: "6px" }}>Pesanan dari pawrent akan muncul di sini</p>
          </div>
        )}

        {bookings.map((booking) => {
          const statusStyle = STATUS_STYLE[booking.status] || { background: "#eee", color: "#555" };
          const bgColor = avatarColor(booking.pawrent?.name);
          return (
            <div
              key={booking.id}
              className="booking-card-hover"
              style={styles.bookingCard}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, minWidth: 0 }}>
                <div style={{ ...styles.bookingAvatar, background: bgColor }}>
                  {booking.pawrent?.name ? booking.pawrent.name[0] : "P"}
                </div>
                <div style={styles.bookingInfo}>
                  <h4 style={styles.bookingName}>
                    {booking.pawrent?.name}
                    <span style={{ fontWeight: "500", color: "#578FCA" }}> · {booking.petName} ({booking.petType})</span>
                  </h4>
                  <p style={styles.bookingMeta}>📅 {booking.date} &nbsp;⏰ {booking.time} &nbsp;🔁 {booking.visits}x kunjungan</p>
                  <span style={{ ...styles.statusBadge, ...statusStyle }}>{booking.status}</span>
                </div>
              </div>

              <div style={styles.actionGroup}>
                <button
                  className="btn-detail-hover"
                  onClick={() => setSelectedBooking(booking)}
                  style={styles.btnDetail}
                >
                  Lihat Detail Pesanan
                </button>

                {booking.status === "Menunggu" && (
                  <div style={styles.actionRow}>
                    <button
                      className="btn-terima-hover"
                      onClick={() => handleTerima(booking.id)}
                      style={styles.btnTerima}
                    >
                      ✓ Terima
                    </button>
                    <button
                      className="btn-tolak-hover"
                      onClick={() => handleTolak(booking.id)}
                      style={styles.btnTolak}
                    >
                      ✕ Tolak
                    </button>
                  </div>
                )}
                {booking.status === "Diterima" && (
                  <Link
                    to="/chat"
                    state={{ pawrent: booking.pawrent, bookingContext: booking }}
                    style={styles.btnChat}
                  >
                    💬 Chat Pawrent
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── DETAIL MODAL ── */}
      {selectedBooking && (
        <div style={styles.overlay} onClick={() => setSelectedBooking(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>📋 Detail Pesanan</h2>
              <button style={styles.modalClose} onClick={() => setSelectedBooking(null)}>×</button>
            </div>

            {/* Modal Body */}
            <div style={styles.modalBody}>
              {[
                ["Nama Pawrent",      selectedBooking.pawrent?.name],
                ["Nama Hewan",        selectedBooking.petName],
                ["Jenis Hewan",       selectedBooking.petType],
                ["Alamat",            selectedBooking.pawrent?.address],
                ["Tanggal & Jam",     `${selectedBooking.date} | ${selectedBooking.time}`],
                ["Jumlah Kunjungan",  `${selectedBooking.visits} kali`],
              ].map(([label, value]) => (
                <div key={label} style={styles.modalRow}>
                  <span style={styles.modalLabel}>{label}</span>
                  <span style={styles.modalValue}>{value || "—"}</span>
                </div>
              ))}

              {selectedBooking.notes && (
                <div>
                  <span style={{ ...styles.modalLabel, display: "block", marginBottom: "8px" }}>📝 Catatan Khusus</span>
                  <div style={styles.modalNoteBox}>"{selectedBooking.notes}"</div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div style={styles.modalFooter}>
              <button onClick={() => setSelectedBooking(null)} style={styles.btnClose}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default SitterDashboard;
export default SitterDashboard;
