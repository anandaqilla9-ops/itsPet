import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const navigate = useNavigate();
  const currentUserString = localStorage.getItem("currentUser");
  const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: "", new: "", confirm: "" });
  const [passwordMsg, setPasswordMsg] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordMsg("❌ Password baru tidak cocok!");
      return;
    }
    if (passwordForm.new.length < 6) {
      setPasswordMsg("❌ Password minimal 6 karakter!");
      return;
    }
    setPasswordMsg("✅ Password berhasil diubah!");
    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswordMsg("");
      setPasswordForm({ current: "", new: "", confirm: "" });
    }, 1500);
  };

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

  const isSitter = currentUser.role?.toLowerCase() === "sitter";

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-content">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Kembali
        </button>

        <div className="profile-card-container">
          <div className="profile-avatar-large">
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.name} />
            ) : (
              <span>{currentUser.name ? currentUser.name[0].toUpperCase() : "P"}</span>
            )}
          </div>

          <h1>{currentUser.name}</h1>
          <span className="profile-role-badge">
            {isSitter ? "🏠 Pet Sitter" : "🐾 Pawrent"}
          </span>

          <div className="profile-details-list">
            <div className="profile-detail-item">
              <span className="profile-detail-label">Email</span>
              <span className="profile-detail-value">{currentUser.email}</span>
            </div>
            
            <div className="profile-detail-item">
              <span className="profile-detail-label">Username</span>
              <span className="profile-detail-value">{currentUser.username || currentUser.email?.split("@")[0] || "-"}</span>
            </div>

            <div className="profile-detail-item">
              <span className="profile-detail-label">Nomor HP</span>
              <span className="profile-detail-value">{currentUser.phone || "-"}</span>
            </div>

            {currentUser.address && (
              <div className="profile-detail-item">
                <span className="profile-detail-label">Alamat</span>
                <span className="profile-detail-value">{currentUser.address}</span>
              </div>
            )}
          </div>

          {/* PAWRENT-SPECIFIC INFO */}
          {!isSitter && (
            <div className="profile-stats-section">
              <h3>📊 Statistik</h3>
              <div className="profile-stats-grid">
                <div className="profile-stat-card">
                  <span className="profile-stat-number">3</span>
                  <span className="profile-stat-label">Total Booking</span>
                </div>
                <div className="profile-stat-card">
                  <span className="profile-stat-number">2</span>
                  <span className="profile-stat-label">Hewan Dititipkan</span>
                </div>
              </div>
              <div className="profile-pets-section">
                <h4>🐾 Hewan yang Pernah Dititipkan</h4>
                <div className="profile-pets-list">
                  <div className="profile-pet-item">
                    <span className="profile-pet-emoji">🐱</span>
                    <div>
                      <strong>Milo</strong>
                      <p>Kucing Persia • 2 kali dititipkan</p>
                    </div>
                  </div>
                  <div className="profile-pet-item">
                    <span className="profile-pet-emoji">🐶</span>
                    <div>
                      <strong>Rocky</strong>
                      <p>Golden Retriever • 1 kali dititipkan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SITTER-SPECIFIC INFO */}
          {isSitter && (
            <div className="profile-sitter-info-section">
              <h3>Detail Pet Sitter</h3>
              
              <div className="profile-stats-grid">
                <div className="profile-stat-card">
                  <span className="profile-stat-number">⭐ {currentUser.rating || "4.8"}</span>
                  <span className="profile-stat-label">Rating</span>
                </div>
                <div className="profile-stat-card">
                  <span className="profile-stat-number">12</span>
                  <span className="profile-stat-label">Booking Diterima</span>
                </div>
              </div>

              <div className="profile-detail-item">
                <span className="profile-detail-label">Pengalaman</span>
                <span className="profile-detail-value">{currentUser.experience || "1 - 3 tahun"}</span>
              </div>

              <div className="profile-detail-item" style={{ flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                <span className="profile-detail-label">Layanan / Keahlian</span>
                <div className="sitter-skills" style={{ marginTop: "5px" }}>
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

              {currentUser.description && (
                <div className="profile-detail-item" style={{ flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                  <span className="profile-detail-label">Tentang Saya / Motivasi</span>
                  <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.6", margin: "5px 0 0" }}>
                    {currentUser.description}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="profile-actions">
            <button onClick={() => navigate("/edit-profile")} className="profile-action-btn edit">
              ✏️ Edit Profil
            </button>
            <button onClick={() => setShowPasswordModal(true)} className="profile-action-btn password">
              🔒 Ubah Password
            </button>
            <button onClick={handleLogout} className="profile-action-btn logout">
              🚪 Keluar Akun
            </button>
          </div>
        </div>
      </div>

      {/* PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>🔒 Ubah Password</h2>
            <p style={{ color: "#666", marginBottom: "20px" }}>Masukkan password lama dan password baru</p>

            {passwordMsg && (
              <div className={`edit-success-banner ${passwordMsg.includes("❌") ? "error" : ""}`}>
                {passwordMsg}
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="edit-profile-form">
              <div className="form-group">
                <label>Password Saat Ini</label>
                <input
                  type="password"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  placeholder="Masukkan password saat ini"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password Baru</label>
                <input
                  type="password"
                  value={passwordForm.new}
                  onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                  placeholder="Masukkan password baru"
                  required
                />
              </div>
              <div className="form-group">
                <label>Konfirmasi Password Baru</label>
                <input
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                  placeholder="Ulangi password baru"
                  required
                />
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                <button type="submit" className="edit-save-btn" style={{ flex: 1 }}>
                  Simpan
                </button>
                <button
                  type="button"
                  className="profile-action-btn password"
                  style={{ flex: 1 }}
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordMsg("");
                  }}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Profile;
