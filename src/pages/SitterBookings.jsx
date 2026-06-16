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

  useEffect(() => {
    setBookings(dummyBookings);
  }, []);

  const handleAcceptBooking = (id) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: "accepted" } : b
    ));
    alert("✅ Booking diterima!");
  };

  const handleRejectBooking = (id) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: "rejected" } : b
    ));
    alert("❌ Booking ditolak!");
  };

  const handleCompleteBooking = (id) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: "completed", completedAt: new Date().toISOString() } : b
    ));
    alert("✅ Booking selesai!");
  };

  const filteredBookings = filterStatus === "all" 
    ? bookings 
    : bookings.filter(b => b.status === filterStatus);

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-content">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Kembali
        </button>

        <h1>📬 Kelola Booking</h1>
        <p style={{ color: "#666", marginBottom: "30px" }}>Terima atau tolak permintaan booking dari pawrent.</p>

        {/* Filter Tabs */}
        <div className="booking-filter-tabs">
          <button 
            className={`filter-tab ${filterStatus === "all" ? "active" : ""}`}
            onClick={() => setFilterStatus("all")}
          >
            Semua ({bookings.length})
          </button>
          <button 
            className={`filter-tab ${filterStatus === "pending" ? "active" : ""}`}
            onClick={() => setFilterStatus("pending")}
          >
            Pending ({bookings.filter(b => b.status === "pending").length})
          </button>
          <button 
            className={`filter-tab ${filterStatus === "accepted" ? "active" : ""}`}
            onClick={() => setFilterStatus("accepted")}
          >
            Diterima ({bookings.filter(b => b.status === "accepted").length})
          </button>
          <button 
            className={`filter-tab ${filterStatus === "completed" ? "active" : ""}`}
            onClick={() => setFilterStatus("completed")}
          >
            Selesai ({bookings.filter(b => b.status === "completed").length})
          </button>
        </div>

        {/* Bookings List */}
        <div className="sitter-bookings-list">
          {filteredBookings.length > 0 ? (
            filteredBookings.map(booking => (
              <div key={booking.id} className={`booking-card ${booking.status}`}>
                <div className="booking-header" onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}>
                  <div className="booking-header-left">
                    <h3>{booking.petName} {booking.petType}</h3>
                    <span className={`booking-status-badge ${booking.status}`}>
                      {booking.status === "pending" && "⏳ Menunggu"}
                      {booking.status === "accepted" && "✅ Diterima"}
                      {booking.status === "completed" && "✔️ Selesai"}
                      {booking.status === "rejected" && "❌ Ditolak"}
                    </span>
                  </div>
                  <div className="booking-header-right">
                    <span className="booking-date">📅 {new Date(booking.date).toLocaleDateString("id-ID")}</span>
                    <span className="booking-price">Rp {booking.totalPrice.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                {expandedId === booking.id && (
                  <div className="booking-details">
                    <div className="detail-item">
                      <span className="detail-label">Pemilik Hewan</span>
                      <span className="detail-value">{booking.pawrentName}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Nomor HP</span>
                      <span className="detail-value">{booking.pawrentPhone}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Waktu Kunjungan</span>
                      <span className="detail-value">⏰ {booking.time} WIB</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Catatan</span>
                      <span className="detail-value">📝 {booking.notes}</span>
                    </div>

                    {/* Action Buttons */}
                    {booking.status === "pending" && (
                      <div className="booking-actions">
                        <button 
                          onClick={() => handleAcceptBooking(booking.id)}
                          className="action-btn accept"
                        >
                          ✅ Terima Booking
                        </button>
                        <button 
                          onClick={() => handleRejectBooking(booking.id)}
                          className="action-btn reject"
                        >
                          ❌ Tolak Booking
                        </button>
                      </div>
                    )}
                    {booking.status === "accepted" && (
                      <div className="booking-actions">
                        <button 
                          onClick={() => handleCompleteBooking(booking.id)}
                          className="action-btn complete"
                        >
                          ✔️ Tandai Selesai
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-data-message">
              <p>😔 Tidak ada booking {filterStatus !== "all" ? `dengan status "${filterStatus}"` : ""}.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SitterBookings;