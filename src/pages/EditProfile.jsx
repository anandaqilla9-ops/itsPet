import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function EditProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const [form, setForm] = useState({
    name: currentUser.name || "",
    email: currentUser.email || "",
    phone: currentUser.phone || "",
    address: currentUser.address || "",
    avatar: currentUser.avatar || "",
  });

  const [preview, setPreview] = useState(currentUser.avatar || "");
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm({ ...form, avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...currentUser, ...form };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Also update registeredUser if it exists
    const regUser = localStorage.getItem("registeredUser");
    if (regUser) {
      const parsed = JSON.parse(regUser);
      if (parsed.email === currentUser.email) {
        localStorage.setItem("registeredUser", JSON.stringify(updatedUser));
      }
    }

    setSaved(true);
    setTimeout(() => {
      navigate("/profile");
    }, 1200);
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-content">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Kembali
        </button>

        <div className="edit-profile-card">
          <h2>Edit Profil</h2>
          <p className="edit-profile-subtitle">Perbarui informasi profil kamu</p>

          {saved && (
            <div className="edit-success-banner">
              ✅ Perubahan berhasil disimpan! Mengalihkan...
            </div>
          )}

          <form onSubmit={handleSubmit} className="edit-profile-form">
            {/* Photo Upload */}
            <div className="edit-photo-section">
              <div className="edit-photo-preview" onClick={handlePhotoClick}>
                {preview ? (
                  <img src={preview} alt="Preview" />
                ) : (
                  <span className="edit-photo-placeholder">
                    {form.name ? form.name[0].toUpperCase() : "U"}
                  </span>
                )}
                <div className="edit-photo-overlay">📷</div>
              </div>
              <button type="button" className="edit-photo-btn" onClick={handlePhotoClick}>
                Ganti Foto
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: "none" }}
              />
            </div>

            {/* Fields */}
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                required
              />
            </div>

            <div className="form-group">
              <label>Nomor HP</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Masukkan nomor HP"
              />
            </div>

            <div className="form-group">
              <label>Alamat</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Masukkan alamat lengkap"
              />
            </div>

            <button type="submit" className="edit-save-btn">
              💾 Simpan Perubahan
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default EditProfile;
