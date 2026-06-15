import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function SignupPawrent() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [locationPermission, setLocationPermission] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }
    setError("");

    const userData = {
      name: fullName,
      username,
      email,
      phone,
      address,
      password,
      role: "pawrent",
      avatar
    };

    localStorage.setItem("registeredUser", JSON.stringify(userData));
    alert("Pendaftaran Pawrent berhasil! Silakan masuk.");
    navigate("/login");
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-content signup-page">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Kembali
        </button>

        <div className="signup-card">
          <h1>Daftar Pawrent</h1>
          <p>Buat akun untuk menemukan pet sitter terbaik.</p>

          {error && <p className="booking-error" style={{ marginBottom: "15px" }}>{error}</p>}

          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Nomor HP"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Alamat"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Konfirmasi Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <label className="upload-label">
              Upload Foto Profil
              <input type="file" accept="image/*" onChange={handleFileChange} required />
            </label>

            <label className="location-permission">
              <input 
                type="checkbox" 
                checked={locationPermission}
                onChange={(e) => setLocationPermission(e.target.checked)}
                required 
              />
              Izinkan akses lokasi untuk mencari sitter terdekat
            </label>

            <button type="submit">
              Daftar
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SignupPawrent;