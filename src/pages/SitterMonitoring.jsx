import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { dummyBookings, dummyMonitoringUpdates } from "../data/bookings";

function SitterMonitoring() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [caption, setCaption] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [filterBookingId, setFilterBookingId] = useState("all");

  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "null");
    } catch {
      return null;
    }
  })();

  const loadData = () => {
    const isDemo = currentUser?.isDemo === true;
    try {
      const allBookings = JSON.parse(localStorage.getItem("globalBookings") || "[]");
      // filter only bookings for this sitter that are active (Diterima or Selesai)
      const mineBookings = allBookings.filter(
        (b) =>
          (b.sitter?.name === currentUser?.name || b.sitter?.email === currentUser?.email) &&
          (b.status === "Diterima" || b.status === "Selesai")
      );

      const localUpdates = JSON.parse(localStorage.getItem("globalMonitoringUpdates") || "[]");
      const mineUpdates = localUpdates.filter((u) =>
        mineBookings.some((b) => String(b.id) === String(u.bookingId))
      );

      if (mineBookings.length > 0 || mineUpdates.length > 0) {
        setBookings(mineBookings);
        setUpdates(mineUpdates);
      } else if (isDemo) {
        // Map dummy statuses
        const mappedDummy = dummyBookings.map((b) => {
          let s = b.status;
          if (s === "pending") s = "Menunggu";
          if (s === "accepted") s = "Diterima";
          if (s === "rejected") s = "Ditolak";
          if (s === "completed") s = "Selesai";
          return { ...b, status: s };
        });
        const activeDummy = mappedDummy.filter(
          (b) => b.status === "Diterima" || b.status === "Selesai"
        );
        setBookings(activeDummy);
        setUpdates(dummyMonitoringUpdates);
      } else {
        setBookings([]);
        setUpdates([]);
      }
    } catch {
      if (isDemo) {
        setBookings(dummyBookings.filter((b) => b.status === "accepted" || b.status === "completed"));
        setUpdates(dummyMonitoringUpdates);
      } else {
        setBookings([]);
        setUpdates([]);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddUpdate = () => {
    if (!selectedBookingId || !caption) {
      alert("Silakan pilih booking dan isi caption!");
      return;
    }

    const newUpdate = {
      id: "UP-" + Date.now(),
      bookingId: selectedBookingId,
      timestamp: new Date().toISOString(),
      caption: caption,
      image: imageSrc || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e8f5e9' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3EUpdate Foto%3C/text%3E%3C/svg%3E"
    };

    const updated = [newUpdate, ...updates];
    setUpdates(updated);

    try {
      const allUpdates = JSON.parse(localStorage.getItem("globalMonitoringUpdates") || "[]");
      localStorage.setItem("globalMonitoringUpdates", JSON.stringify([newUpdate, ...allUpdates]));
    } catch (e) {
      console.error("Failed to save monitoring update:", e);
    }

    setCaption("");
    setImageSrc("");
    setSelectedBookingId(null);
    setShowForm(false);
    alert("✅ Update foto berhasil ditambahkan!");
  };

  const getBookingPetName = (bookingId) => {
    const booking = bookings.find((b) => String(b.id) === String(bookingId));
    return booking ? `${booking.petName} (${booking.petType})` : "Anabul";
  };

  const filteredUpdates =
    filterBookingId === "all"
      ? updates
      : updates.filter((u) => String(u.bookingId) === String(filterBookingId));

  return (
    <div className="page-wrapper" style={{ background: "linear-gradient(160deg, #f0f6ff 0%, #e8f4fd 40%, #d1f8ef 100%)", minHeight: "100vh" }}>
      <Navbar />

      <div className="main-content sitter-monitoring-page" style={{ paddingTop: "100px", paddingBottom: "60px", maxWidth: "900px", margin: "0 auto", paddingLeft: "20px", paddingRight: "20px" }}>
        <button onClick={() => navigate(-1)} className="back-btn" style={{ marginBottom: "20px" }}>
          ← Kembali
        </button>

        <h1 style={{ color: "#1e3a5f", fontWeight: "800", fontSize: "2.2rem", marginBottom: "8px" }}>📸 Monitoring & Update Hewan</h1>
        <p style={{ color: "#5a7fa8", marginBottom: "35px", fontSize: "1rem" }}>
          Kirim update harian dan foto real-time untuk pawrent yang memesan jasa Anda.
        </p>

        {/* Add Update Form Section */}
        <div className="monitoring-form-section" style={{ marginBottom: "40px" }}>
          <button
            onClick={() => setShowForm(!showForm)}
            className="toggle-form-btn"
            style={{
              background: "linear-gradient(135deg, #3674B5, #578FCA)",
              border: "none", color: "#fff", padding: "12px 24px",
              borderRadius: "15px", cursor: "pointer", fontWeight: "700",
              fontSize: "0.95rem", width: "100%", textAlign: "left",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              boxShadow: "0 4px 15px rgba(54,116,181,0.2)"
            }}
          >
            <span>{showForm ? "▼ Tutup Form" : "▶ Tambah Update Foto Baru"}</span>
            <span>📝</span>
          </button>

          {showForm && (
            <div
              className="monitoring-form"
              style={{
                background: "#fff", borderRadius: "18px", padding: "24px",
                marginTop: "15px", border: "1px solid rgba(54,116,181,0.1)",
                boxShadow: "0 8px 32px rgba(54,116,181,0.08)",
                display: "flex", flexDirection: "column", gap: "15px"
              }}
            >
              <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontWeight: "700", color: "#1e3a5f", fontSize: "0.88rem" }}>Pilih Booking Hewan</label>
                <select
                  value={selectedBookingId || ""}
                  onChange={(e) => setSelectedBookingId(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #ddd", fontSize: "0.92rem", color: "#333", outline: "none", background: "#fff" }}
                >
                  <option value="">-- Pilih Hewan --</option>
                  {bookings.map((booking) => (
                    <option key={booking.id} value={booking.id}>
                      🐾 {booking.petName} ({booking.petType}) - {new Date(booking.date).toLocaleDateString("id-ID")}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontWeight: "700", color: "#1e3a5f", fontSize: "0.88rem" }}>Caption Laporan</label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Ceritakan aktivitas, porsi makan, atau kondisi kesehatan hewan saat ini..."
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #ddd", fontSize: "0.92rem", minHeight: "100px", fontFamily: "inherit", resize: "vertical", outline: "none" }}
                />
              </div>

              <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontWeight: "700", color: "#1e3a5f", fontSize: "0.88rem" }}>Unggah Foto Hewan</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ padding: "10px 0" }}
                />
                {imageSrc && (
                  <div style={{ marginTop: "10px" }}>
                    <p style={{ fontSize: "0.8rem", color: "#5a7fa8", marginBottom: "5px" }}>Pratinjau Foto:</p>
                    <img src={imageSrc} alt="Preview" style={{ maxWidth: "150px", borderRadius: "8px", border: "1px solid #ddd" }} />
                  </div>
                )}
              </div>

              <button
                onClick={handleAddUpdate}
                style={{
                  background: "linear-gradient(135deg, #43c97e, #2ecc71)",
                  border: "none", color: "#fff", padding: "12px 24px",
                  borderRadius: "12px", cursor: "pointer", fontWeight: "700",
                  fontSize: "0.95rem", boxShadow: "0 4px 12px rgba(46,204,113,0.3)",
                  alignSelf: "flex-start", marginTop: "5px"
                }}
              >
                ✅ Kirim Update Laporan
              </button>
            </div>
          )}
        </div>

        {/* Updates List */}
        <div className="monitoring-updates-section">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ color: "#1e3a5f", fontWeight: "800", fontSize: "1.4rem", margin: 0 }}>📋 Riwayat Laporan Update</h2>
          </div>

          {/* Filtering buttons per animal */}
          {bookings.length > 0 && (
            <div className="sitter-monitoring-filter" style={{ display: "flex", gap: "8px", marginBottom: "25px", flexWrap: "wrap" }}>
              <button
                onClick={() => setFilterBookingId("all")}
                style={{
                  padding: "8px 16px", borderRadius: "20px", border: "none",
                  background: filterBookingId === "all" ? "#3674B5" : "#fff",
                  color: filterBookingId === "all" ? "#fff" : "#5a7fa8",
                  cursor: "pointer", fontWeight: "700", fontSize: "0.85rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "all 0.2s"
                }}
              >
                Semua Hewan
              </button>
              {bookings.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setFilterBookingId(b.id)}
                  style={{
                    padding: "8px 16px", borderRadius: "20px", border: "none",
                    background: filterBookingId === b.id ? "#3674B5" : "#fff",
                    color: filterBookingId === b.id ? "#fff" : "#5a7fa8",
                    cursor: "pointer", fontWeight: "700", fontSize: "0.85rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "all 0.2s"
                  }}
                >
                  🐾 {b.petName}
                </button>
              ))}
            </div>
          )}

          <div className="monitoring-updates-list" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {filteredUpdates.length > 0 ? (
              filteredUpdates.map((update) => (
                <div
                  key={update.id}
                  className="update-card"
                  style={{
                    background: "#fff", borderRadius: "18px", overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(54,116,181,0.05)",
                    border: "1px solid rgba(54,116,181,0.08)",
                    display: "flex", flexDirection: "column"
                  }}
                >
                  <img
                    src={update.image}
                    alt="Update"
                    style={{ width: "100%", maxHeight: "350px", objectFit: "cover", borderBottom: "1px solid #f1f5f9" }}
                  />
                  <div className="update-content" style={{ padding: "20px" }}>
                    <div
                      className="update-header"
                      style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center", marginBottom: "12px",
                        flexWrap: "wrap", gap: "10px"
                      }}
                    >
                      <h3 style={{ color: "#1e3a5f", margin: 0, fontSize: "1.1rem", fontWeight: "700" }}>
                        🐾 {getBookingPetName(update.bookingId)}
                      </h3>
                      <span className="update-time" style={{ color: "#7a9bbf", fontSize: "0.85rem", fontWeight: "500" }}>
                        📅 {new Date(update.timestamp).toLocaleString("id-ID", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="update-caption" style={{ color: "#5a7fa8", margin: 0, lineHeight: "1.6", fontSize: "0.95rem" }}>
                      {update.caption}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="no-data-message"
                style={{
                  textAlign: "center", padding: "60px 20px", background: "#fff",
                  borderRadius: "18px", boxShadow: "0 4px 20px rgba(54,116,181,0.04)",
                  color: "#7a9bbf"
                }}
              >
                <p style={{ fontSize: "3rem", marginBottom: "10px" }}>📸</p>
                <p style={{ fontWeight: "600" }}>Belum ada laporan update foto untuk hewan peliharaan.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SitterMonitoring;