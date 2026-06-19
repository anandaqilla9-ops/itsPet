import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STATUS_STYLE = {
  Menunggu: { background: "#fff3e0", color: "#e65100" },
  Diterima: { background: "#e3f2fd", color: "#1565c0" },
  Ditolak:  { background: "#fce4ec", color: "#c62828" },
  Selesai:  { background: "#e8f5e9", color: "#2e7d32" },
};

const DEMO_EMAIL = "pawrent@itspet.com";

const DEMO_BOOKINGS = [
  {
    id: "BK-DEMO-1",
    sitter: { name: "Aurelia Putri", location: "Surabaya Barat", rating: "5.0", image: "" },
    petName: "Milo",
    petType: "Kucing",
    date: "2026-06-18",
    visitTimes: ["09:00 - 12:00", "16:00 - 19:00"],
    visits: 2,
    notes: "Jangan lupa vitamin ya!",
    totalCost: 155000,
    paymentMethod: "QRIS",
    status: "Diterima",
    createdAt: "2026-06-16T09:00:00Z",
  },
  {
    id: "BK-DEMO-2",
    sitter: { name: "Riko Pratama", location: "Surabaya Timur", rating: "4.8", image: "" },
    petName: "Rocky",
    petType: "Anjing",
    date: "2026-06-17",
    visitTimes: ["13:00 - 16:00"],
    visits: 1,
    notes: "",
    totalCost: 75000,
    paymentMethod: "Transfer Bank",
    status: "Selesai",
    createdAt: "2026-06-14T14:00:00Z",
  },
  {
    id: "BK-DEMO-3",
    sitter: { name: "Sari Dewi", location: "Surabaya Selatan", rating: "4.9", image: "" },
    petName: "Milo",
    petType: "Kucing",
    date: "2026-06-25",
    visitTimes: ["09:00 - 12:00"],
    visits: 1,
    notes: "Kucing manja, perlu perhatian ekstra",
    totalCost: 80000,
    paymentMethod: "E-Wallet",
    status: "Menunggu",
    createdAt: "2026-06-18T08:00:00Z",
  },
];

function BookingHistory() {
  const navigate = useNavigate();

  const currentUserStr = localStorage.getItem("currentUser");
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
  const isDemo = currentUser?.isDemo === true;

  // Ambil booking dari globalBookings (milik user ini) + demo jika demo
  const getUserBookings = () => {
    let bookings = [];
    try {
      const all = JSON.parse(localStorage.getItem("globalBookings") || "[]");
      bookings = all.filter(
        (b) =>
          b.pawrentEmail === currentUser?.email ||
          b.pawrent?.email === currentUser?.email
      );
    } catch {
      bookings = [];
    }
    if (isDemo) {
      // Gabungkan demo + booking real (jika ada)
      const demoIds = DEMO_BOOKINGS.map((d) => d.id);
      const realOnly = bookings.filter((b) => !demoIds.includes(b.id));
      bookings = [...DEMO_BOOKINGS, ...realOnly];
    }
    return bookings;
  };

  const [bookings] = useState(getUserBookings);
  const [filter, setFilter] = useState("Semua");

  const statusOptions = ["Semua", "Menunggu", "Diterima", "Selesai", "Ditolak"];

  const filtered =
    filter === "Semua" ? bookings : bookings.filter((b) => b.status === filter);

  const petEmoji = (type = "") => {
    if (type.toLowerCase().includes("kucing")) return "🐱";
    if (type.toLowerCase().includes("anjing")) return "🐶";
    if (type.toLowerCase().includes("kelinci")) return "🐰";
    if (type.toLowerCase().includes("hamster")) return "🐹";
    if (type.toLowerCase().includes("mammal")) return "🐭";
    return "🐾";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #f0f6ff 0%, #e8f4fd 40%, #d1f8ef 100%)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Navbar />

      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #3674B5 0%, #578FCA 55%, #7FB3E0 100%)",
          paddingTop: "100px",
          paddingBottom: "50px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <button onClick={() => navigate(-1)} className="back-btn" style={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.4)", marginBottom: "20px" }}>
            ← Kembali
          </button>
          <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: "800", margin: "0 0 8px 0" }}>
            📋 Riwayat Booking
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", margin: 0, fontSize: "1rem" }}>
            Semua booking hewan peliharaan Anda dalam satu tempat
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "30px 20px 60px" }}>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
          {statusOptions.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: "8px 18px",
                borderRadius: "25px",
                border: "none",
                cursor: "pointer",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "700",
                fontSize: "0.85rem",
                background: filter === s
                  ? "linear-gradient(135deg, #3674B5, #578FCA)"
                  : "#fff",
                color: filter === s ? "#fff" : "#5a7fa8",
                boxShadow: filter === s
                  ? "0 4px 14px rgba(54,116,181,0.35)"
                  : "0 2px 8px rgba(0,0,0,0.07)",
                transition: "all 0.2s",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "#fff",
              borderRadius: "20px",
              boxShadow: "0 4px 20px rgba(54,116,181,0.07)",
            }}
          >
            <p style={{ fontSize: "3.5rem", marginBottom: "12px" }}>🐾</p>
            <p style={{ fontWeight: "700", color: "#1e3a5f", fontSize: "1.15rem", marginBottom: "8px" }}>
              Belum ada riwayat booking
            </p>
            <p style={{ color: "#7a9bbf", fontSize: "0.9rem", marginBottom: "24px" }}>
              {filter === "Semua"
                ? "Mulai booking pet sitter untuk anabul kesayanganmu!"
                : `Belum ada booking dengan status "${filter}"`}
            </p>
            {filter === "Semua" && (
              <button
                onClick={() => navigate("/search")}
                style={{
                  background: "linear-gradient(135deg, #3674B5, #578FCA)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "14px",
                  padding: "12px 28px",
                  fontWeight: "700",
                  cursor: "pointer",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "0.95rem",
                  boxShadow: "0 6px 20px rgba(54,116,181,0.35)",
                }}
              >
                🔍 Cari Pet Sitter
              </button>
            )}
          </div>
        )}

        {/* Booking cards */}
        {filtered.map((booking) => {
          const statusStyle = STATUS_STYLE[booking.status] || { background: "#eee", color: "#555" };
          return (
            <div
              key={booking.id}
              style={{
                background: "#fff",
                borderRadius: "18px",
                padding: "22px 24px",
                marginBottom: "16px",
                boxShadow: "0 4px 20px rgba(54,116,181,0.08)",
                border: "1px solid rgba(54,116,181,0.08)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              {/* Header row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: "52px", height: "52px", borderRadius: "50%",
                      background: "linear-gradient(135deg, #578FCA22, #578FCA44)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.6rem",
                    }}
                  >
                    {petEmoji(booking.petType)}
                  </div>
                  <div>
                    <p style={{ fontWeight: "700", color: "#1e3a5f", fontSize: "1rem", margin: "0 0 3px 0" }}>
                      {booking.petName}
                      <span style={{ fontWeight: "500", color: "#578FCA", marginLeft: "6px" }}>
                        · {booking.petType}
                      </span>
                    </p>
                    <p style={{ color: "#7a9bbf", fontSize: "0.85rem", margin: 0 }}>
                      Sitter: {booking.sitter?.name}
                    </p>
                  </div>
                </div>
                <span
                  style={{
                    ...statusStyle,
                    padding: "5px 14px",
                    borderRadius: "20px",
                    fontWeight: "700",
                    fontSize: "0.8rem",
                  }}
                >
                  {booking.status}
                </span>
              </div>

              {/* Detail row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: "8px",
                  background: "linear-gradient(135deg, #f8fbff, #f0f6ff)",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  marginBottom: "14px",
                }}
              >
                <div>
                  <p style={{ color: "#7a9bbf", fontSize: "0.75rem", fontWeight: "600", margin: "0 0 3px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>Tanggal</p>
                  <p style={{ color: "#1e3a5f", fontWeight: "700", fontSize: "0.9rem", margin: 0 }}>
                    📅 {new Date(booking.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
                <div>
                  <p style={{ color: "#7a9bbf", fontSize: "0.75rem", fontWeight: "600", margin: "0 0 3px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>Kunjungan</p>
                  <p style={{ color: "#1e3a5f", fontWeight: "700", fontSize: "0.9rem", margin: 0 }}>
                    🔁 {booking.visits}x
                  </p>
                </div>
                <div>
                  <p style={{ color: "#7a9bbf", fontSize: "0.75rem", fontWeight: "600", margin: "0 0 3px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total</p>
                  <p style={{ color: "#1e3a5f", fontWeight: "700", fontSize: "0.9rem", margin: 0 }}>
                    💰 Rp {(booking.totalCost || 0).toLocaleString("id-ID")}
                  </p>
                </div>
                <div>
                  <p style={{ color: "#7a9bbf", fontSize: "0.75rem", fontWeight: "600", margin: "0 0 3px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>Pembayaran</p>
                  <p style={{ color: "#1e3a5f", fontWeight: "700", fontSize: "0.9rem", margin: 0 }}>
                    💳 {booking.paymentMethod || "—"}
                  </p>
                </div>
              </div>

              {/* Visit times */}
              {booking.visitTimes && booking.visitTimes.length > 0 && (
                <div style={{ marginBottom: "14px" }}>
                  <p style={{ color: "#5a7fa8", fontSize: "0.82rem", fontWeight: "600", margin: "0 0 6px 0" }}>
                    ⏰ Jadwal waktu:
                  </p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {booking.visitTimes.map((t, i) => (
                      <span
                        key={i}
                        style={{
                          background: "#e3f2fd",
                          color: "#1565c0",
                          borderRadius: "20px",
                          padding: "4px 12px",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                        }}
                      >
                        {i + 1}: {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {booking.notes && (
                <p style={{ color: "#7a9bbf", fontSize: "0.85rem", fontStyle: "italic", margin: 0 }}>
                  📝 "{booking.notes}"
                </p>
              )}
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

export default BookingHistory;
