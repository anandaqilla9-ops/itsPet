import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function SignupSitter() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSkillChange = (skill, checked) => {
    if (checked) {
      setSkills([...skills, skill]);
    } else {
      setSkills(skills.filter((s) => s !== skill));
    }
  };

  const handleSelfieChange = (e) => {
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
    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }
    setError("");

    const expText =
      experience === "<1"
        ? "Kurang dari 1 tahun"
        : experience === "1-3"
        ? "1 - 3 tahun"
        : experience === ">3"
        ? "Lebih dari 3 tahun"
        : "1 - 3 tahun";

    const userData = {
      name: fullName,
      email,
      phone,
      experience: expText,
      skills: skills.length > 0 ? skills : ["🐱 Kucing", "🐶 Anjing"],
      description,
      password,
      role: "sitter",
      avatar,
      rating: "5.0",
      verificationStatus: "Menunggu Interview",
      priceText: "Rp 50.000 / kunjungan",
      price: 50000,
      availableSlots: ["09:00 - 12:00", "13:00 - 16:00"],
      isNew: true,
      isDemo: false,
      pendingVerification: true,
    };

    // Simpan ke array registeredUsers
    let registeredUsers = [];
    try {
      const raw = localStorage.getItem("registeredUsers");
      registeredUsers = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(registeredUsers)) registeredUsers = [];
    } catch {
      registeredUsers = [];
    }

    const exists = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) {
      setError("Email ini sudah terdaftar.");
      return;
    }

    registeredUsers.push(userData);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    localStorage.setItem("registeredUser", JSON.stringify(userData));

    setSubmitted(true);
  };

  // ── Halaman sukses setelah submit ──
  if (submitted) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="main-content signup-page">
          <div
            className="signup-card"
            style={{
              textAlign: "center",
              padding: "50px 40px",
              maxWidth: "520px",
            }}
          >
            <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🎉</div>
            <h1 style={{ color: "#3674B5", marginBottom: "12px" }}>
              Pendaftaran Berhasil!
            </h1>
            <p
              style={{
                color: "#555",
                lineHeight: "1.7",
                fontSize: "1rem",
                marginBottom: "24px",
              }}
            >
              Terima kasih,{" "}
              <strong style={{ color: "#1e3a5f" }}>{fullName}</strong>! 🐾
              <br />
              Data kamu sudah kami terima dan sedang dalam proses review.
            </p>

            <div
              style={{
                background: "linear-gradient(135deg, #e8f4fd, #f0f6ff)",
                border: "1px solid #c8dff5",
                borderRadius: "16px",
                padding: "20px 24px",
                marginBottom: "24px",
                textAlign: "left",
              }}
            >
              <p
                style={{
                  fontWeight: "700",
                  color: "#3674B5",
                  marginBottom: "10px",
                  fontSize: "0.95rem",
                }}
              >
                📋 Langkah Selanjutnya:
              </p>
              <ol
                style={{
                  paddingLeft: "20px",
                  color: "#5a7fa8",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                }}
              >
                <li>
                  Tim kami akan menghubungi kamu via email{" "}
                  <strong style={{ color: "#1e3a5f" }}>{email}</strong>
                </li>
                <li>
                  Waktu proses:{" "}
                  <strong style={{ color: "#3674B5" }}>1 × 24 jam</strong>{" "}
                  (hari kerja)
                </li>
                <li>
                  Kamu akan diundang untuk{" "}
                  <strong>interview singkat via video call</strong>
                </li>
                <li>
                  Setelah interview, akun sitter kamu akan aktif dan bisa
                  menerima booking
                </li>
              </ol>
            </div>

            <div
              style={{
                background: "#fff9e6",
                border: "1px solid #ffe08a",
                borderRadius: "12px",
                padding: "12px 16px",
                marginBottom: "28px",
                fontSize: "0.85rem",
                color: "#7a5700",
              }}
            >
              📧 Pastikan cek{" "}
              <strong>inbox dan folder spam/junk</strong> email kamu ya!
            </div>

            <button
              onClick={() => navigate("/login")}
              className="login-submit-btn"
              style={{ width: "100%" }}
            >
              Masuk ke Akun
            </button>
            <button
              onClick={() => navigate("/")}
              className="back-btn"
              style={{ marginTop: "12px", display: "block", width: "100%" }}
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-content signup-page">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Kembali
        </button>

        <div className="signup-card sitter-card-form">
          <h1>Daftar Sebagai Pet Sitter</h1>
          <p>Bergabung dan mulai menghasilkan dari passion merawat hewan.</p>

          {error && (
            <p className="booking-error" style={{ marginBottom: "15px" }}>
              {error}
            </p>
          )}

          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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

            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            >
              <option value="">Pengalaman Merawat Hewan</option>
              <option value="<1">Kurang dari 1 tahun</option>
              <option value="1-3">1 - 3 tahun</option>
              <option value=">3">Lebih dari 3 tahun</option>
            </select>

            <div className="skills-section">
              <h4>Keahlian / Hewan yang Dapat Ditangani:</h4>
              <div className="skills">
                {[
                  "🐱 Kucing",
                  "🐶 Anjing",
                  "🐭 Small Mammals",
                  "✂️ Grooming",
                  "💊 Pemberian Obat",
                ].map((skill) => (
                  <label key={skill}>
                    <input
                      type="checkbox"
                      checked={skills.includes(skill)}
                      onChange={(e) => handleSkillChange(skill, e.target.checked)}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>

            <textarea
              placeholder="Ceritakan motivasi dan pengalamanmu..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <label className="upload-label">
              Upload KTP
              <input type="file" required />
            </label>

            <label className="upload-label">
              Upload Selfie (Akan digunakan sebagai foto profil)
              <input
                type="file"
                accept="image/*"
                onChange={handleSelfieChange}
                required
              />
            </label>

            <input
              type="password"
              placeholder="Password (min. 6 karakter)"
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

            <button type="submit">Daftar Jadi Pet Sitter</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SignupSitter;