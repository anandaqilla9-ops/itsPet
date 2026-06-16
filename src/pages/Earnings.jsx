import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { dummyEarnings } from "../data/bookings";

function Earnings() {
  const navigate = useNavigate();
  const [earnings, setEarnings] = useState([]);

  useEffect(() => {
    setEarnings(dummyEarnings);
  }, []);

  const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);
  const completedEarnings = earnings.filter(e => e.status === "completed").reduce((sum, e) => sum + e.amount, 0);
  const pendingEarnings = earnings.filter(e => e.status === "pending").reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-content">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Kembali
        </button>

        <h1>💰 Pendapatan</h1>
        <p style={{ color: "#666", marginBottom: "40px" }}>Kelola dan pantau pendapatan dari setiap booking.</p>

        {/* Earnings Summary Cards */}
        <div className="earnings-summary-grid">
          <div className="earnings-card total">
            <h3>💵 Total Pendapatan</h3>
            <p className="earnings-amount">Rp {totalEarnings.toLocaleString("id-ID")}</p>
            <span className="earnings-label">Semua waktu</span>
          </div>
          <div className="earnings-card completed">
            <h3>✅ Selesai</h3>
            <p className="earnings-amount">Rp {completedEarnings.toLocaleString("id-ID")}</p>
            <span className="earnings-label">Sudah diterima</span>
          </div>
          <div className="earnings-card pending">
            <h3>⏳ Pending</h3>
            <p className="earnings-amount">Rp {pendingEarnings.toLocaleString("id-ID")}</p>
            <span className="earnings-label">Menunggu pembayaran</span>
          </div>
          <div className="earnings-card stats">
            <h3>📊 Statistik</h3>
            <p className="earnings-amount">{earnings.length}</p>
            <span className="earnings-label">Total transaksi</span>
          </div>
        </div>

        {/* Earnings Table */}
        <div className="earnings-table-section">
          <h2>📋 Daftar Transaksi</h2>
          {earnings.length > 0 ? (
            <div className="earnings-table">
              {earnings.map(earning => (
                <div key={earning.id} className={`earning-row ${earning.status}`}>
                  <div className="earning-col pet">
                    <h4>{earning.petName}</h4>
                    <p>{earning.pawrentName}</p>
                  </div>
                  <div className="earning-col date">
                    📅 {new Date(earning.date).toLocaleDateString("id-ID")}
                  </div>
                  <div className="earning-col method">
                    💳 {earning.paymentMethod}
                  </div>
                  <div className="earning-col amount">
                    <strong>Rp {earning.amount.toLocaleString("id-ID")}</strong>
                  </div>
                  <div className="earning-col status">
                    <span className={`status-badge ${earning.status}`}>
                      {earning.status === "completed" && "✅ Selesai"}
                      {earning.status === "pending" && "⏳ Pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data-message">
              <p>😿 Belum ada transaksi pendapatan.</p>
            </div>
          )}
        </div>

        {/* Bank Info Section */}
        <div className="bank-info-section">
          <h2>🏦 Informasi Rekening</h2>
          <div className="bank-info-card">
            <div className="info-row">
              <span className="info-label">Nama Bank</span>
              <span className="info-value">BNI (Rekening terdaftar)</span>
            </div>
            <div className="info-row">
              <span className="info-label">Nomor Rekening</span>
              <span className="info-value">••••••••1234</span>
            </div>
            <div className="info-row">
              <span className="info-label">Nama Pemegang</span>
              <span className="info-value">(Sesuai identitas terverifikasi)</span>
            </div>
            <button className="btn-edit-bank" onClick={() => alert("Fitur edit rekening akan segera tersedia")}>
              ✏️ Ubah Rekening
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Earnings;