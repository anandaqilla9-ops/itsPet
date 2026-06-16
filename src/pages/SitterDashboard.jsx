import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { dummyBookings, dummyEarnings } from "../data/bookings";

function SitterDashboard() {
  const navigate = useNavigate();
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
            <h2>🎯 Keahlian / Layanan</h2>
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
              📥 Kelola Booking
            </button>
            <button onClick={() => navigate("/sitter-monitoring")} className="action-btn primary">
              📸 Update Hewan
            </button>
            <button onClick={() => navigate("/earnings")} className="action-btn primary">
              💰 Lihat Pendapatan
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SitterDashboard;