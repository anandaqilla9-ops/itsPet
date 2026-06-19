import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { dummyEarnings } from "../data/bookings";

function Earnings() {
  const navigate = useNavigate();
  const [earnings, setEarnings] = useState([]);

  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "null");
    } catch {
      return null;
    }
  })();

  const loadEarnings = () => {
    const isDemo = currentUser?.isDemo === true;
    try {
      const allBookings = JSON.parse(localStorage.getItem("globalBookings") || "[]");
      const mineBookings = allBookings.filter(
        (b) =>
          b.sitter?.name === currentUser?.name ||
          b.sitter?.email === currentUser?.email
      );

      if (mineBookings.length > 0) {
        // Map active or completed bookings to earnings records
        const mapped = mineBookings
          .filter((b) => b.status === "Diterima" || b.status === "Selesai")
          .map((b) => ({
            id: b.id,
            date: b.date,
            petName: b.petName,
            pawrentName: b.pawrentName || b.pawrent?.name || "Pawrent",
            amount: b.totalCost || b.totalPrice || 50000,
            status: b.status === "Selesai" ? "completed" : "pending",
            paymentMethod: b.paymentMethod || "QRIS",
          }));
        setEarnings(mapped);
      } else if (isDemo) {
        setEarnings(dummyEarnings);
      } else {
        setEarnings([]);
      }
    } catch {
      setEarnings(isDemo ? dummyEarnings : []);
    }
  };

  useEffect(() => {
    loadEarnings();
  }, []);

  const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);
  const completedEarnings = earnings
    .filter((e) => e.status === "completed")
    .reduce((sum, e) => sum + e.amount, 0);
  const pendingEarnings = earnings
    .filter((e) => e.status === "pending")
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="page-wrapper" style={{ background: "linear-gradient(160deg, #f0f6ff 0%, #e8f4fd 40%, #d1f8ef 100%)", minHeight: "100vh" }}>
      <Navbar />

      <div className="main-content sitter-earnings-page" style={{ paddingTop: "100px", paddingBottom: "60px", maxWidth: "1000px", margin: "0 auto", paddingLeft: "20px", paddingRight: "20px" }}>
        <button onClick={() => navigate(-1)} className="back-btn" style={{ marginBottom: "20px" }}>
          ← Kembali
        </button>

        <h1 style={{ color: "#1e3a5f", fontWeight: "800", fontSize: "2.2rem", marginBottom: "8px" }}>💰 Pendapatan Anda</h1>
        <p style={{ color: "#5a7fa8", marginBottom: "35px", fontSize: "1rem" }}>
          Pantau semua transaksi masuk dan saldo pendapatan dari setiap booking.
        </p>

        {/* Earnings Summary Grid */}
        <div
          className="earnings-summary-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            className="earnings-card total"
            style={{
              background: "linear-gradient(135deg, #3674B5, #578FCA)",
              color: "#fff",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 8px 24px rgba(54,116,181,0.2)",
            }}
          >
            <h3 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px 0", color: "rgba(255,255,255,0.8)" }}>💵 Total Pendapatan</h3>
            <p className="earnings-amount" style={{ fontSize: "1.8rem", fontWeight: "800", margin: "0 0 4px 0" }}>
              Rp {totalEarnings.toLocaleString("id-ID")}
            </p>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)" }}>Semua waktu</span>
          </div>

          <div
            className="earnings-card completed"
            style={{
              background: "#fff",
              color: "#333",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 4px 20px rgba(54,116,181,0.06)",
              border: "1px solid rgba(54,116,181,0.08)",
            }}
          >
            <h3 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px 0", color: "#7a9bbf" }}>✅ Saldo Cair</h3>
            <p className="earnings-amount" style={{ fontSize: "1.8rem", fontWeight: "800", margin: "0 0 4px 0", color: "#2e7d32" }}>
              Rp {completedEarnings.toLocaleString("id-ID")}
            </p>
            <span style={{ fontSize: "0.78rem", color: "#7a9bbf" }}>Selesai di-sitter</span>
          </div>

          <div
            className="earnings-card pending"
            style={{
              background: "#fff",
              color: "#333",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 4px 20px rgba(54,116,181,0.06)",
              border: "1px solid rgba(54,116,181,0.08)",
            }}
          >
            <h3 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px 0", color: "#7a9bbf" }}>⏳ Menunggu Cair</h3>
            <p className="earnings-amount" style={{ fontSize: "1.8rem", fontWeight: "800", margin: "0 0 4px 0", color: "#e65100" }}>
              Rp {pendingEarnings.toLocaleString("id-ID")}
            </p>
            <span style={{ fontSize: "0.78rem", color: "#7a9bbf" }}>Sedang berjalan</span>
          </div>

          <div
            className="earnings-card stats"
            style={{
              background: "#fff",
              color: "#333",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 4px 20px rgba(54,116,181,0.06)",
              border: "1px solid rgba(54,116,181,0.08)",
            }}
          >
            <h3 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px 0", color: "#7a9bbf" }}>📊 Total Transaksi</h3>
            <p className="earnings-amount" style={{ fontSize: "1.8rem", fontWeight: "800", margin: "0 0 4px 0", color: "#1e3a5f" }}>
              {earnings.length}
            </p>
            <span style={{ fontSize: "0.78rem", color: "#7a9bbf" }}>Transaksi selesai / aktif</span>
          </div>
        </div>

        {/* Earnings Table Section */}
        <div
          className="earnings-table-section"
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "28px",
            boxShadow: "0 4px 20px rgba(54,116,181,0.06)",
            border: "1px solid rgba(54,116,181,0.08)",
            marginBottom: "40px",
          }}
        >
          <h2 style={{ color: "#1e3a5f", fontWeight: "800", fontSize: "1.35rem", marginBottom: "20px" }}>📋 Daftar Transaksi Masuk</h2>
          {earnings.length > 0 ? (
            <div className="earnings-table" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {earnings.map((earning) => (
                <div
                  key={earning.id}
                  className={`earning-row ${earning.status}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 20px",
                    borderRadius: "14px",
                    border: "1px solid #f1f5f9",
                    background: earning.status === "completed" ? "#fafdfb" : "#fffcf7",
                    flexWrap: "wrap",
                    gap: "15px",
                  }}
                >
                  <div className="earning-col pet" style={{ flex: "1.5", minWidth: "160px" }}>
                    <h4 style={{ margin: "0 0 4px 0", color: "#1e3a5f", fontSize: "1.05rem", fontWeight: "700" }}>🐾 {earning.petName}</h4>
                    <p style={{ margin: 0, color: "#7a9bbf", fontSize: "0.85rem" }}>Pawrent: {earning.pawrentName}</p>
                  </div>
                  <div className="earning-col date" style={{ flex: "1", color: "#5a7fa8", fontSize: "0.9rem" }}>
                    📅 {new Date(earning.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                  <div className="earning-col method" style={{ flex: "1", color: "#5a7fa8", fontSize: "0.9rem" }}>
                    💳 {earning.paymentMethod}
                  </div>
                  <div className="earning-col amount" style={{ flex: "1.2", textAlign: "right" }}>
                    <strong style={{ color: "#3674B5", fontSize: "1.1rem" }}>Rp {earning.amount.toLocaleString("id-ID")}</strong>
                  </div>
                  <div className="earning-col status" style={{ flex: "1", textAlign: "right" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "0.78rem",
                        fontWeight: "700",
                        background: earning.status === "completed" ? "#e8f5e9" : "#fff3e0",
                        color: earning.status === "completed" ? "#2e7d32" : "#e65100",
                      }}
                    >
                      {earning.status === "completed" ? "✅ Selesai" : "⏳ Pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data-message" style={{ textAlign: "center", padding: "40px 20px", color: "#7a9bbf" }}>
              <p style={{ fontSize: "3rem", marginBottom: "10px" }}>💸</p>
              <p style={{ fontWeight: "600" }}>Belum ada catatan transaksi pendapatan.</p>
            </div>
          )}
        </div>

        {/* Bank Info Section */}
        <div
          className="bank-info-section"
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "28px",
            boxShadow: "0 4px 20px rgba(54,116,181,0.06)",
            border: "1px solid rgba(54,116,181,0.08)",
          }}
        >
          <h2 style={{ color: "#1e3a5f", fontWeight: "800", fontSize: "1.35rem", marginBottom: "20px" }}>🏦 Informasi Rekening Pencairan</h2>
          <div
            className="bank-info-card"
            style={{
              background: "#f8fafc",
              borderRadius: "14px",
              padding: "20px 24px",
              border: "1px solid #e2e8f0",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div className="info-row" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.92rem" }}>
              <span className="info-label" style={{ color: "#7a9bbf", fontWeight: "500" }}>Nama Bank</span>
              <span className="info-value" style={{ color: "#1e3a5f", fontWeight: "700" }}>BNI (Rekening terdaftar)</span>
            </div>
            <div className="info-row" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.92rem" }}>
              <span className="info-label" style={{ color: "#7a9bbf", fontWeight: "500" }}>Nomor Rekening</span>
              <span className="info-value" style={{ color: "#1e3a5f", fontWeight: "700" }}>••••••••••1234</span>
            </div>
            <div className="info-row" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.92rem" }}>
              <span className="info-label" style={{ color: "#7a9bbf", fontWeight: "500" }}>Nama Pemegang</span>
              <span className="info-value" style={{ color: "#1e3a5f", fontWeight: "700" }}>{currentUser?.name || "Pet Sitter"}</span>
            </div>
            <button
              className="btn-edit-bank"
              onClick={() => alert("Fitur edit rekening akan segera tersedia!")}
              style={{
                background: "transparent",
                border: "2px solid #3674B5",
                color: "#3674B5",
                padding: "8px 16px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "0.85rem",
                alignSelf: "flex-start",
                marginTop: "10px",
                transition: "all 0.2s",
              }}
            >
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