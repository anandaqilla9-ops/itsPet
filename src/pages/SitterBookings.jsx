import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { dummyBookings } from "../data/bookings";

function SitterBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "null");
    } catch {
      return null;
    }
  })();

  const loadBookings = () => {
    const isDemo = currentUser?.isDemo === true;
    try {
      const all = JSON.parse(localStorage.getItem("globalBookings") || "[]");
      const mine = all.filter(
        (b) =>
          b.sitter?.name === currentUser?.name ||
          b.sitter?.email === currentUser?.email
      );

      if (mine.length > 0) {
        setBookings(mine);
      } else if (isDemo) {
        // Map dummy bookings status to Indonesian
        const mappedDummy = dummyBookings.map((b) => {
          let s = b.status;
          if (s === "pending") s = "Menunggu";
          if (s === "accepted") s = "Diterima";
          if (s === "rejected") s = "Ditolak";
          if (s === "completed") s = "Selesai";
          return { ...b, status: s };
        });
        setBookings(mappedDummy);
      } else {
        setBookings([]);
      }
    } catch {
      setBookings(isDemo ? dummyBookings : []);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const updateBookingStatus = (id, newStatus) => {
    // 1. Update state
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );

    // 2. Update localStorage
    try {
      const all = JSON.parse(localStorage.getItem("globalBookings") || "[]");
      const updated = all.map((b) =>
        String(b.id) === String(id) ? { ...b, status: newStatus } : b
      );
      localStorage.setItem("globalBookings", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to update booking status in localStorage:", e);
    }
  };

  const handleAcceptBooking = (id) => {
    updateBookingStatus(id, "Diterima");
    alert("✅ Booking berhasil diterima!");
  };

  const handleRejectBooking = (id) => {
    updateBookingStatus(id, "Ditolak");
    alert("❌ Booking berhasil ditolak!");
  };

  const handleCompleteBooking = (id) => {
    updateBookingStatus(id, "Selesai");
    alert("✅ Booking telah selesai!");
  };

  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

  return (
    <div className="page-wrapper" style={{ background: "linear-gradient(160deg, #f0f6ff 0%, #e8f4fd 40%, #d1f8ef 100%)", minHeight: "100vh" }}>
      <Navbar />

      <div className="main-content sitter-bookings-page" style={{ paddingTop: "100px", paddingBottom: "60px", maxWidth: "1000px", margin: "0 auto", paddingLeft: "20px", paddingRight: "20px" }}>
        <button onClick={() => navigate(-1)} className="back-btn" style={{ marginBottom: "20px" }}>
          ← Kembali
        </button>

        <h1 style={{ color: "#1e3a5f", fontWeight: "800", fontSize: "2.2rem", marginBottom: "8px" }}>📬 Kelola Booking</h1>
        <p style={{ color: "#5a7fa8", marginBottom: "35px", fontSize: "1rem" }}>
          Terima, tolak, atau selesaikan permintaan booking dari pawrent.
        </p>

        {/* Filter Tabs */}
        <div className="booking-filter-tabs" style={{ display: "flex", gap: "10px", marginBottom: "30px", flexWrap: "wrap" }}>
          {[
            { id: "all", label: "Semua", count: bookings.length },
            { id: "Menunggu", label: "Pending", count: bookings.filter((b) => b.status === "Menunggu").length },
            { id: "Diterima", label: "Diterima", count: bookings.filter((b) => b.status === "Diterima").length },
            { id: "Selesai", label: "Selesai", count: bookings.filter((b) => b.status === "Selesai").length },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`filter-tab ${filterStatus === tab.id ? "active" : ""}`}
              onClick={() => setFilterStatus(tab.id)}
              style={{
                padding: "10px 20px",
                borderRadius: "25px",
                border: "none",
                fontWeight: "700",
                fontSize: "0.88rem",
                cursor: "pointer",
                transition: "all 0.25s",
                background: filterStatus === tab.id ? "#3674B5" : "#fff",
                color: filterStatus === tab.id ? "#fff" : "#5a7fa8",
                boxShadow: filterStatus === tab.id ? "0 4px 12px rgba(54,116,181,0.25)" : "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="sitter-bookings-list" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => {
              const isPending = booking.status === "Menunggu" || booking.status === "pending";
              const isAccepted = booking.status === "Diterima" || booking.status === "accepted";
              const isCompleted = booking.status === "Selesai" || booking.status === "completed";
              const isRejected = booking.status === "Ditolak" || booking.status === "rejected";

              let statusBg = "#f1f5f9";
              let statusColor = "#64748b";
              let statusText = booking.status;
              if (isPending) {
                statusBg = "#fff3e0";
                statusColor = "#e65100";
                statusText = "⏳ Menunggu";
              } else if (isAccepted) {
                statusBg = "#e3f2fd";
                statusColor = "#1565c0";
                statusText = "✅ Diterima";
              } else if (isCompleted) {
                statusBg = "#e8f5e9";
                statusColor = "#2e7d32";
                statusText = "✔️ Selesai";
              } else if (isRejected) {
                statusBg = "#fce4ec";
                statusColor = "#c62828";
                statusText = "❌ Ditolak";
              }

              return (
                <div
                  key={booking.id}
                  className="booking-card"
                  style={{
                    background: "#fff",
                    borderRadius: "18px",
                    padding: "24px",
                    boxShadow: "0 4px 20px rgba(54,116,181,0.06)",
                    border: "1px solid rgba(54,116,181,0.08)",
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    className="booking-header"
                    onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      flexWrap: "wrap",
                      gap: "15px",
                    }}
                  >
                    <div className="booking-header-left" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          background: "#3674B5",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontSize: "1.4rem",
                        }}
                      >
                        {booking.petType?.toLowerCase().includes("kucing") ? "🐱" : booking.petType?.toLowerCase().includes("anjing") ? "🐶" : "🐾"}
                      </div>
                      <div>
                        <h3 style={{ color: "#1e3a5f", margin: "0 0 4px 0", fontSize: "1.15rem", fontWeight: "700" }}>
                          {booking.petName} <span style={{ color: "#7a9bbf", fontSize: "0.9rem", fontWeight: "500" }}>({booking.petType})</span>
                        </h3>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "0.78rem",
                            fontWeight: "700",
                            background: statusBg,
                            color: statusColor,
                          }}
                        >
                          {statusText}
                        </span>
                      </div>
                    </div>
                    <div className="booking-header-right" style={{ textAlign: "right" }}>
                      <span style={{ display: "block", color: "#5a7fa8", fontSize: "0.88rem", marginBottom: "4px" }}>
                        📅 {new Date(booking.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                      <span style={{ fontWeight: "800", color: "#3674B5", fontSize: "1.1rem" }}>
                        Rp {(booking.totalCost || booking.totalPrice || 0).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  {expandedId === booking.id && (
                    <div className="booking-details" style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #f1f5f9", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
                      <div className="detail-item">
                        <span style={{ display: "block", fontSize: "0.8rem", color: "#7a9bbf", fontWeight: "600", textTransform: "uppercase", marginBottom: "3px" }}>Pemilik Hewan</span>
                        <span style={{ color: "#1e3a5f", fontWeight: "700" }}>{booking.pawrentName || booking.pawrent?.name}</span>
                      </div>
                      <div className="detail-item">
                        <span style={{ display: "block", fontSize: "0.8rem", color: "#7a9bbf", fontWeight: "600", textTransform: "uppercase", marginBottom: "3px" }}>Nomor HP</span>
                        <span style={{ color: "#1e3a5f", fontWeight: "700" }}>{booking.pawrentPhone || booking.pawrent?.phone}</span>
                      </div>
                      <div className="detail-item">
                        <span style={{ display: "block", fontSize: "0.8rem", color: "#7a9bbf", fontWeight: "600", textTransform: "uppercase", marginBottom: "3px" }}>Waktu Kunjungan</span>
                        <span style={{ color: "#1e3a5f", fontWeight: "700" }}>⏰ {booking.time}</span>
                      </div>
                      {booking.notes && (
                        <div className="detail-item" style={{ gridColumn: "1 / -1" }}>
                          <span style={{ display: "block", fontSize: "0.8rem", color: "#7a9bbf", fontWeight: "600", textTransform: "uppercase", marginBottom: "3px" }}>Catatan khusus</span>
                          <span style={{ color: "#5a7fa8", fontStyle: "italic", fontSize: "0.92rem" }}>"{booking.notes}"</span>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="booking-actions" style={{ gridColumn: "1 / -1", display: "flex", gap: "10px", marginTop: "10px" }}>
                        {isPending && (
                          <>
                            <button
                              onClick={() => handleAcceptBooking(booking.id)}
                              style={{
                                background: "linear-gradient(135deg, #43c97e, #2ecc71)",
                                border: "none", color: "#fff", padding: "10px 20px",
                                borderRadius: "12px", cursor: "pointer", fontWeight: "700",
                                boxShadow: "0 4px 12px rgba(46,204,113,0.3)"
                              }}
                            >
                              ✓ Terima Booking
                            </button>
                            <button
                              onClick={() => handleRejectBooking(booking.id)}
                              style={{
                                background: "linear-gradient(135deg, #ff6b6b, #e74c3c)",
                                border: "none", color: "#fff", padding: "10px 20px",
                                borderRadius: "12px", cursor: "pointer", fontWeight: "700",
                                boxShadow: "0 4px 12px rgba(231,76,60,0.25)"
                              }}
                            >
                              ✕ Tolak Booking
                            </button>
                          </>
                        )}
                        {isAccepted && (
                          <button
                            onClick={() => handleCompleteBooking(booking.id)}
                            style={{
                              background: "linear-gradient(135deg, #3674B5, #578FCA)",
                              border: "none", color: "#fff", padding: "10px 20px",
                              borderRadius: "12px", cursor: "pointer", fontWeight: "700",
                              boxShadow: "0 4px 12px rgba(54,116,181,0.3)"
                            }}
                          >
                            ✓ Tandai Selesai
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div
              className="no-data-message"
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: "#fff",
                borderRadius: "18px",
                boxShadow: "0 4px 20px rgba(54,116,181,0.04)",
                color: "#7a9bbf",
              }}
            >
              <p style={{ fontSize: "3rem", marginBottom: "10px" }}>📅</p>
              <p style={{ fontWeight: "600" }}>Tidak ada booking {filterStatus !== "all" ? `dengan status "${filterStatus}"` : ""}.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SitterBookings;