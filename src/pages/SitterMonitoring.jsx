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
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setBookings(dummyBookings.filter(b => b.status !== "pending"));
    setUpdates(dummyMonitoringUpdates);
  }, []);

  const handleAddUpdate = () => {
    if (!selectedBookingId || !caption) {
      alert("Silakan pilih booking dan isi caption!");
      return;
    }

    const newUpdate = {
      id: updates.length + 1,
      bookingId: selectedBookingId,
      timestamp: new Date().toISOString(),
      caption: caption,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e8f5e9' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3EUpdate Foto%3C/text%3E%3C/svg%3E"
    };

    setUpdates([newUpdate, ...updates]);
    setCaption("");
    setSelectedBookingId(null);
    setShowForm(false);
    alert("✅ Update foto berhasil ditambahkan!");
  };

  const getBookingPetName = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    return booking ? booking.petName : "Unknown";
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-content">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Kembali
        </button>

        <h1>📸 Monitoring & Update Hewan</h1>
        <p style={{ color: "#666", marginBottom: "30px" }}>Upload foto dan catatan perkembangan hewan peliharaan.</p>

        {/* Add Update Form */}
        <div className="monitoring-form-section">
          <button 
            onClick={() => setShowForm(!showForm)}
            className="toggle-form-btn"
          >
            {showForm ? "▼ Tutup Form" : "▶ Tambah Update Foto"}
          </button>

          {showForm && (
            <div className="monitoring-form">
              <div className="form-group">
                <label>Pilih Booking</label>
                <select 
                  value={selectedBookingId || ""}
                  onChange={(e) => setSelectedBookingId(parseInt(e.target.value))}
                  className="form-select"
                >
                  <option value="">-- Pilih Hewan --</option>
                  {bookings.map(booking => (
                    <option key={booking.id} value={booking.id}>
                      {booking.petName} ({booking.petType}) - {new Date(booking.date).toLocaleDateString("id-ID")}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Caption</label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Ceritakan kondisi hewan, aktivitas, atau hal menarik lainnya..."
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label>Upload Foto</label>
                <input type="file" accept="image/*" className="form-file" />
              </div>

              <button onClick={handleAddUpdate} className="btn-submit">
                ✅ Kirim Update
              </button>
            </div>
          )}
        </div>

        {/* Updates List */}
        <div className="monitoring-updates-list">
          <h2>📋 Riwayat Update</h2>
          {updates.length > 0 ? (
            updates.map(update => (
              <div key={update.id} className="update-card">
                <img src={update.image} alt="Update" className="update-image" />
                <div className="update-content">
                  <div className="update-header">
                    <h3>🐾 {getBookingPetName(update.bookingId)}</h3>
                    <span className="update-time">
                      {new Date(update.timestamp).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <p className="update-caption">{update.caption}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data-message">
              <p>😔 Belum ada update foto. Mulai upload foto hewan peliharaan!</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SitterMonitoring;