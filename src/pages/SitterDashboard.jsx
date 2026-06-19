import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ─── Design tokens ────────────────────────────── */
const S = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #f0f6ff 0%, #e8f4fd 40%, #d1f8ef 100%)",
    fontFamily: "Poppins, sans-serif",
  },
  hero: {
    background: "linear-gradient(135deg, #3674B5 0%, #578FCA 55%, #7FB3E0 100%)",
    paddingTop: "100px",
    paddingBottom: "60px",
    paddingLeft: "20px",
    paddingRight: "20px",
    position: "relative",
    overflow: "hidden",
  },
  heroOrb1: {
    position: "absolute", width: "350px", height: "350px",
    borderRadius: "50%", background: "rgba(255,255,255,0.06)",
    top: "-80px", right: "-60px", pointerEvents: "none",
  },
  heroOrb2: {
    position: "absolute", width: "200px", height: "200px",
    borderRadius: "50%", background: "rgba(161,227,249,0.15)",
    bottom: "20px", left: "5%", pointerEvents: "none",
  },
  heroInner: {
    maxWidth: "1200px", margin: "0 auto",
    display: "flex", justifyContent: "space-between",
    alignItems: "center", flexWrap: "wrap", gap: "20px",
    position: "relative", zIndex: 1,
  },
  heroAvatar: {
    width: "72px", height: "72px", borderRadius: "50%",
    background: "rgba(255,255,255,0.25)",
    border: "3px solid rgba(255,255,255,0.6)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "2rem", color: "#fff", fontWeight: "bold", flexShrink: 0,
  },
  heroGreet: { fontSize: "0.95rem", color: "rgba(255,255,255,0.8)", marginBottom: "4px", letterSpacing: "0.5px" },
  heroName:  { fontSize: "2.2rem", fontWeight: "800", color: "#fff", margin: "0 0 6px 0", lineHeight: 1.2 },
  heroBadge: {
    display: "inline-flex", alignItems: "center", gap: "6px",
    background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)",
    color: "#fff", borderRadius: "20px", padding: "4px 14px",
    fontSize: "0.82rem", fontWeight: "600", backdropFilter: "blur(6px)",
  },
  heroCta: { display: "flex", gap: "12px", flexWrap: "wrap" },
  ctaBtn: {
    display: "inline-block", padding: "11px 22px", borderRadius: "25px",
    fontWeight: "700", fontSize: "0.9rem", textDecoration: "none",
    border: "none", cursor: "pointer",
  },

  /* Stat cards */
  statsRow: {
    maxWidth: "1200px", margin: "-36px auto 0", padding: "0 20px",
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px", position: "relative", zIndex: 2,
  },
  statCard: {
    borderRadius: "20px", padding: "28px 24px",
    boxShadow: "0 8px 32px rgba(54,116,181,0.12)",
    display: "flex", alignItems: "center", gap: "20px",
    transition: "transform 0.25s, box-shadow 0.25s", cursor: "default",
  },
  statIcon: {
    width: "58px", height: "58px", borderRadius: "16px",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "1.6rem", flexShrink: 0,
  },
  statLabel: { fontSize: "0.82rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "6px" },
  statValue: { fontSize: "2rem", fontWeight: "800", lineHeight: 1, margin: "0 0 4px 0" },
  statSub:   { fontSize: "0.8rem", margin: 0 },

  /* Bookings section */
  section:       { maxWidth: "1200px", margin: "40px auto 0", padding: "0 20px 60px" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  sectionTitle:  { fontSize: "1.5rem", fontWeight: "800", color: "#1e3a5f", margin: 0 },
  bookingCard: {
    background: "#fff", borderRadius: "18px", padding: "22px 24px", marginBottom: "14px",
    boxShadow: "0 4px 20px rgba(54,116,181,0.08)", border: "1px solid rgba(54,116,181,0.1)",
    display: "flex", justifyContent: "space-between", alignItems: "center",
    gap: "16px", flexWrap: "wrap", transition: "transform 0.2s, box-shadow 0.2s",
  },
  bookingAvatar: {
    width: "52px", height: "52px", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "1.3rem", fontWeight: "bold", color: "#fff", flexShrink: 0,
  },
  bookingInfo: { flex: 1, minWidth: "160px" },
  bookingName: { margin: "0 0 4px 0", color: "#1e3a5f", fontSize: "1rem", fontWeight: "700" },
  bookingMeta: { margin: "0 0 6px 0", color: "#5a7fa8", fontSize: "0.85rem" },
  statusBadge: { display: "inline-block", padding: "4px 12px", borderRadius: "20px", fontSize: "0.78rem", fontWeight: "700", letterSpacing: "0.3px" },
  actionGroup: { display: "flex", gap: "10px", flexDirection: "column", alignItems: "flex-end" },
  actionRow:   { display: "flex", gap: "8px" },

  btnDetail: {
    padding: "9px 16px", border: "2px solid #578FCA", background: "transparent",
    color: "#3674B5", borderRadius: "12px", cursor: "pointer",
    fontWeight: "700", fontSize: "0.85rem", fontFamily: "Poppins, sans-serif",
    transition: "background 0.2s, color 0.2s",
  },
  btnTerima: {
    padding: "9px 16px", border: "none",
    background: "linear-gradient(135deg, #43c97e, #2ecc71)",
    color: "#fff", borderRadius: "12px", cursor: "pointer",
    fontWeight: "700", fontSize: "0.85rem", fontFamily: "Poppins, sans-serif",
    boxShadow: "0 4px 12px rgba(46,204,113,0.35)", transition: "transform 0.15s",
  },
  btnTolak: {
    padding: "9px 16px", border: "none",
    background: "linear-gradient(135deg, #ff6b6b, #e74c3c)",
    color: "#fff", borderRadius: "12px", cursor: "pointer",
    fontWeight: "700", fontSize: "0.85rem", fontFamily: "Poppins, sans-serif",
    boxShadow: "0 4px 12px rgba(231,76,60,0.3)", transition: "transform 0.15s",
  },
  btnChat: {
    padding: "9px 16px", border: "none",
    background: "linear-gradient(135deg, #3674B5, #578FCA)",
    color: "#fff", borderRadius: "12px", cursor: "pointer",
    fontWeight: "700", fontSize: "0.85rem",
    textDecoration: "none", display: "inline-block",
    boxShadow: "0 4px 12px rgba(54,116,181,0.35)",
  },

  /* Modal */
  overlay: {
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    background: "rgba(10,30,60,0.55)", backdropFilter: "blur(6px)",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
  },
  modal: {
    background: "#fff", borderRadius: "24px", width: "90%", maxWidth: "500px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)", overflow: "hidden",
    animation: "slideUp 0.3s ease",
  },
  modalHeader: {
    background: "linear-gradient(135deg, #3674B5, #578FCA)",
    padding: "24px 28px", display: "flex",
    justifyContent: "space-between", alignItems: "center",
  },
  modalTitle: { color: "#fff", fontWeight: "800", fontSize: "1.25rem", margin: 0 },
  modalClose: {
    background: "rgba(255,255,255,0.2)", border: "none", color: "#fff",
    width: "34px", height: "34px", borderRadius: "50%", cursor: "pointer",
    fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "Poppins, sans-serif",
  },
  modalBody:    { padding: "24px 28px" },
  modalRow:     { display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "14px", marginBottom: "14px", borderBottom: "1px solid #f0f4f9" },
  modalLabel:   { color: "#7a9bbf", fontSize: "0.88rem", fontWeight: "600" },
  modalValue:   { fontWeight: "700", color: "#1e3a5f", fontSize: "0.9rem", textAlign: "right", maxWidth: "60%" },
  modalNoteBox: {
    background: "linear-gradient(135deg, #f0f6ff, #e8f4fd)",
    border: "1px solid #c8dff5", borderRadius: "12px",
    padding: "12px 16px", color: "#3674B5", fontStyle: "italic", fontSize: "0.9rem", marginTop: "4px",
  },
  modalFooter: { padding: "0 28px 28px" },
  btnClose: {
    width: "100%", padding: "14px",
    background: "linear-gradient(135deg, #3674B5, #578FCA)",
    color: "#fff", border: "none", borderRadius: "14px",
    fontSize: "1rem", fontWeight: "700", cursor: "pointer",
    fontFamily: "Poppins, sans-serif", boxShadow: "0 6px 20px rgba(54,116,181,0.35)",
  },
};

const STATUS_STYLE = {
  Menunggu: { background: "#fff3e0", color: "#e65100" },
  Diterima: { background: "#e3f2fd", color: "#1565c0" },
  Ditolak:  { background: "#fce4ec", color: "#c62828" },
  Selesai:  { background: "#e8f5e9", color: "#2e7d32" },
};

const AVATAR_COLORS = ["#3674B5", "#578FCA", "#43c97e", "#ff6b6b", "#FFB300", "#9C27B0"];

function avatarColor(name = "") {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

/* ─── Component ─────────────────────────────────── */
function SitterDashboard() {
  const currentUser = (() => {
    try { return JSON.parse(localStorage.getItem("currentUser")) || null; }
    catch { return null; }
  })();

  const [bookings, setBookings] = useState(() => {
    const isDemo = currentUser?.isDemo === true;
    try {
      const all = JSON.parse(localStorage.getItem("globalBookings") || "[]");
      const mine = all.filter(b => b.sitter?.name === currentUser?.name || b.sitter?.email === currentUser?.email);
      if (mine.length > 0) return mine;
      if (!isDemo) return [];
    } catch {
      if (!isDemo) return [];
    }
    return [
      { id: 1, pawrent: { name: "Budi Santoso", address: "Jl. Sudirman No 10" }, petName: "Kitty", petType: "Kucing", date: "2026-06-18", time: "09:00", status: "Menunggu", visits: 1, notes: "Jangan lupa vitamin", totalPrice: 50000 },
      { id: 2, pawrent: { name: "Raisha Annette", address: "Jl. Mawar 2" },      petName: "Rocky", petType: "Anjing",  date: "2026-06-17", time: "15:00", status: "Selesai",  visits: 2, notes: "", totalPrice: 100000 },
    ];
  });

  const [selectedBooking, setSelectedBooking] = useState(null);

  /* ── Handlers ── */
  const updateStatus = (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    try {
      const all = JSON.parse(localStorage.getItem("globalBookings") || "[]");
      localStorage.setItem("globalBookings", JSON.stringify(all.map(b => b.id === id ? { ...b, status: newStatus } : b)));
    } catch { /* ignore */ }
  };

  /* ── Derived values ── */
  const earnings    = bookings.filter(b => b.status === "Selesai").reduce((acc, b) => acc + (b.totalPrice || 150000), 0);
  const activeCount = bookings.filter(b => b.status === "Diterima" || b.status === "Menunggu").length;

  /* ── Render ── */
  return (
    <div style={S.wrapper}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .sd-stat-card:hover    { transform: translateY(-4px) !important; box-shadow: 0 16px 40px rgba(54,116,181,0.18) !important; }
        .sd-booking-card:hover { transform: translateY(-2px) !important; box-shadow: 0 10px 30px rgba(54,116,181,0.14) !important; }
        .sd-btn-detail:hover   { background: #3674B5 !important; color: #fff !important; }
        .sd-btn-terima:hover   { transform: scale(1.04) !important; }
        .sd-btn-tolak:hover    { transform: scale(1.04) !important; }
      `}</style>

      <Navbar />

      {/* ── Hero ── */}
      <div style={S.hero}>
        <div style={S.heroOrb1} />
        <div style={S.heroOrb2} />
        <div style={S.heroInner}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={S.heroAvatar}>
              {(currentUser?.name || "S")[0].toUpperCase()}
            </div>
            <div>
              <p style={S.heroGreet}>Halo, selamat datang kembali 👋</p>
              <h1 style={S.heroName}>{currentUser?.name || "Pet Sitter"}</h1>
              <span style={S.heroBadge}>🐾 Pet Sitter Aktif</span>
            </div>
          </div>
          <div style={S.heroCta}>
            <Link to="/sitter-reviews" style={{ ...S.ctaBtn, background: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)" }}>
              🌟 Lihat Ulasan
            </Link>
            <Link to="/chat" style={{ ...S.ctaBtn, background: "#fff", color: "#3674B5", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
              💬 Chat
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div style={S.statsRow}>
        {/* Earnings */}
        <div className="sd-stat-card" style={{ ...S.statCard, background: "#fff" }}>
          <div style={{ ...S.statIcon, background: "linear-gradient(135deg, #43c97e22, #43c97e44)" }}>💰</div>
          <div>
            <p style={{ ...S.statLabel, color: "#43c97e" }}>Total Penghasilan</p>
            <p style={{ ...S.statValue, color: "#1e3a5f" }}>
              Rp {earnings > 0 ? earnings.toLocaleString("id-ID") : "1.250.000"}
            </p>
            <p style={{ ...S.statSub, color: "#7a9bbf" }}>Bulan ini (Juni 2026)</p>
          </div>
        </div>

        {/* Active bookings */}
        <div className="sd-stat-card" style={{ ...S.statCard, background: "#fff" }}>
          <div style={{ ...S.statIcon, background: "linear-gradient(135deg, #578FCA22, #578FCA44)" }}>📅</div>
          <div>
            <p style={{ ...S.statLabel, color: "#578FCA" }}>Pesanan Aktif</p>
            <p style={{ ...S.statValue, color: "#1e3a5f" }}>{activeCount}</p>
            <p style={{ ...S.statSub, color: "#7a9bbf" }}>Berlangsung &amp; menunggu konfirmasi</p>
          </div>
        </div>

        {/* Rating */}
        <div className="sd-stat-card" style={{ ...S.statCard, background: "#fff" }}>
          <div style={{ ...S.statIcon, background: "linear-gradient(135deg, #FFB30022, #FFB30044)" }}>🌟</div>
          <div style={{ flex: 1 }}>
            <p style={{ ...S.statLabel, color: "#FFB300" }}>Reputasi Sitter</p>
            <p style={{ ...S.statValue, color: "#1e3a5f" }}>4.9</p>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <p style={{ ...S.statSub, color: "#7a9bbf" }}>Dari 24 ulasan</p>
              <Link to="/sitter-reviews" style={{ fontSize: "0.8rem", color: "#3674B5", textDecoration: "none", fontWeight: "700" }}>Lihat →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Booking List ── */}
      <div style={S.section}>
        <div style={S.sectionHeader}>
          <h2 style={S.sectionTitle}>📋 Pesanan Terbaru</h2>
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

        {bookings.map(booking => {
          const statusStyle = STATUS_STYLE[booking.status] || { background: "#eee", color: "#555" };
          return (
            <div key={booking.id} className="sd-booking-card" style={S.bookingCard}>
              {/* Left: info */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, minWidth: 0 }}>
                <div style={{ ...S.bookingAvatar, background: avatarColor(booking.pawrent?.name || "") }}>
                  {(booking.pawrent?.name || "P")[0]}
                </div>
                <div style={S.bookingInfo}>
                  <h4 style={S.bookingName}>
                    {booking.pawrent?.name}
                    <span style={{ fontWeight: "500", color: "#578FCA" }}> · {booking.petName} ({booking.petType})</span>
                  </h4>
                  <p style={S.bookingMeta}>📅 {booking.date} &nbsp;⏰ {booking.time} &nbsp;🔁 {booking.visits}x kunjungan</p>
                  <span style={{ ...S.statusBadge, ...statusStyle }}>{booking.status}</span>
                </div>
              </div>

              {/* Right: actions */}
              <div style={S.actionGroup}>
                <button className="sd-btn-detail" onClick={() => setSelectedBooking(booking)} style={S.btnDetail}>
                  Lihat Detail Pesanan
                </button>

                {booking.status === "Menunggu" && (
                  <div style={S.actionRow}>
                    <button className="sd-btn-terima" onClick={() => updateStatus(booking.id, "Diterima")} style={S.btnTerima}>✓ Terima</button>
                    <button className="sd-btn-tolak"  onClick={() => updateStatus(booking.id, "Ditolak")}  style={S.btnTolak}>✕ Tolak</button>
                  </div>
                )}

                {booking.status === "Diterima" && (
                  <Link to="/chat" state={{ pawrent: booking.pawrent, bookingContext: booking }} style={S.btnChat}>
                    💬 Chat Pawrent
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Detail Modal ── */}
      {selectedBooking && (
        <div style={S.overlay} onClick={() => setSelectedBooking(null)}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <div style={S.modalHeader}>
              <h2 style={S.modalTitle}>📋 Detail Pesanan</h2>
              <button style={S.modalClose} onClick={() => setSelectedBooking(null)}>×</button>
            </div>

            <div style={S.modalBody}>
              {[
                ["Nama Pawrent",     selectedBooking.pawrent?.name],
                ["Nama Hewan",       selectedBooking.petName],
                ["Jenis Hewan",      selectedBooking.petType],
                ["Alamat",           selectedBooking.pawrent?.address],
                ["Tanggal & Jam",    `${selectedBooking.date} | ${selectedBooking.time}`],
                ["Jumlah Kunjungan", `${selectedBooking.visits} kali`],
              ].map(([label, value]) => (
                <div key={label} style={S.modalRow}>
                  <span style={S.modalLabel}>{label}</span>
                  <span style={S.modalValue}>{value || "—"}</span>
                </div>
              ))}

              {selectedBooking.notes && (
                <div>
                  <span style={{ ...S.modalLabel, display: "block", marginBottom: "8px" }}>📝 Catatan Khusus</span>
                  <div style={S.modalNoteBox}>"{selectedBooking.notes}"</div>
                </div>
              )}
            </div>

            <div style={S.modalFooter}>
              <button onClick={() => setSelectedBooking(null)} style={S.btnClose}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default SitterDashboard;
