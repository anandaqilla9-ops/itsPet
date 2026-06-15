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
    setError("");

    const expText = 
      experience === "<1" ? "Kurang dari 1 tahun" :
      experience === "1-3" ? "1 - 3 tahun" :
      experience === ">3" ? "Lebih dari 3 tahun" : "1 - 3 tahun";

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
      rating: "5.0" // dummy rating for newly registered sitters
    };

    localStorage.setItem("registeredUser", JSON.stringify(userData));
    alert("Pendaftaran Pet Sitter berhasil! Data Anda akan diverifikasi dalam 24 jam. Anda sekarang dapat masuk.");
    navigate("/login");
  };

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

            <select value={experience} onChange={(e) => setExperience(e.target.value)} required>
              <option value="">Pengalaman Merawat Hewan</option>
              <option value="<1">Kurang dari 1 tahun</option>
              <option value="1-3">1 - 3 tahun</option>
              <option value=">3">Lebih dari 3 tahun</option>
            </select>

            <div className="skills-section">
              <h4>Keahlian / Hewan yang Dapat Ditangani:</h4>
              <div className="skills">
                <label>
                  <input 
                    type="checkbox" 
                    checked={skills.includes("🐱 Kucing")}
                    onChange={(e) => handleSkillChange("🐱 Kucing", e.target.checked)}
                  />
                  🐱 Kucing
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    checked={skills.includes("🐶 Anjing")}
                    onChange={(e) => handleSkillChange("🐶 Anjing", e.target.checked)}
                  />
                  🐶 Anjing
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    checked={skills.includes("✂️ Grooming")}
                    onChange={(e) => handleSkillChange("✂️ Grooming", e.target.checked)}
                  />
                  ✂️ Grooming
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    checked={skills.includes("💊 Pemberian Obat")}
                    onChange={(e) => handleSkillChange("💊 Pemberian Obat", e.target.checked)}
                  />
                  💊 Pemberian Obat
                </label>
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
              <input type="file" accept="image/*" onChange={handleSelfieChange} required />
            </label>

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

            <button type="submit">
              Daftar Jadi Pet Sitter
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SignupSitter;