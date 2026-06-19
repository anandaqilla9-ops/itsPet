import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DEMO_ACCOUNTS = {
  "pawrent@itspet.com": {
    name: "Budi Santoso",
    email: "pawrent@itspet.com",
    username: "budis",
    phone: "08123456789",
    address: "Jl. Mawar No. 12, Surabaya",
    role: "pawrent",
    isDemo: true,
    isNew: false,
  },
  "sitter@itspet.com": {
    name: "Aurelia Putri",
    email: "sitter@itspet.com",
    username: "aureliap",
    phone: "08987654321",
    address: "Jl. Dahlia No. 45, Surabaya",
    role: "sitter",
    experience: "4 tahun",
    rating: "5.0",
    skills: ["🐱 Kucing", "🐶 Anjing", "✂️ Grooming", "💊 Pemberian Obat"],
    description:
      "Pet care profesional. Memiliki sertifikat grooming hewan dan berpengalaman menangani anabul yang sedang sakit atau memerlukan perhatian khusus.",
    isDemo: true,
    isNew: false,
  },
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Baca success message dari signup
  const successMsg = location.state?.successMsg || "";

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Silakan isi email dan password.");
      return;
    }
    setError("");

    const lowerEmail = email.toLowerCase();

    // 1. Cek akun demo
    if (DEMO_ACCOUNTS[lowerEmail]) {
      const userData = DEMO_ACCOUNTS[lowerEmail];
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(userData));
      if (userData.role?.toLowerCase() === "sitter") {
        navigate("/sitter-dashboard");
      } else {
        navigate("/");
      }
      return;
    }

    // 2. Cek akun yang sudah terdaftar (bisa ada banyak, simpan sebagai array)
    let registeredUsers = [];
    try {
      const raw = localStorage.getItem("registeredUsers");
      registeredUsers = raw ? JSON.parse(raw) : [];
    } catch {
      registeredUsers = [];
    }

    // Support format lama (single object)
    if (!Array.isArray(registeredUsers)) {
      try {
        const old = localStorage.getItem("registeredUser");
        if (old) {
          registeredUsers = [JSON.parse(old)];
        }
      } catch {
        registeredUsers = [];
      }
    }

    const found = registeredUsers.find(
      (u) => u.email.toLowerCase() === lowerEmail
    );

    if (found) {
      // Cek password jika ada
      if (found.password && found.password !== password) {
        setError("Email atau password salah.");
        return;
      }
      if (found.role === "sitter" && found.pendingVerification) {
        setError("Pendaftaran Anda sedang diproses. Silakan tunggu 1x24 jam untuk jadwal interview yang akan dikirimkan melalui email.");
        return;
      }
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(found));
      if (found.role?.toLowerCase() === "sitter") {
        navigate("/sitter-dashboard");
      } else {
        navigate("/");
      }
      return;
    }

    setError("Akun tidak ditemukan. Silakan daftar terlebih dahulu.");
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-content login-page">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Kembali
        </button>

        <div className="login-card">
          <h1>it'sPet</h1>
          <h2>Masuk ke Akun</h2>
          <p>Selamat datang kembali!</p>

          {successMsg && (
            <p
              className="booking-success-inline"
              style={{
                background: "#e8f5e9",
                color: "#2e7d32",
                border: "1px solid #a5d6a7",
                borderRadius: "10px",
                padding: "12px 16px",
                marginTop: "15px",
                fontSize: "0.92rem",
                lineHeight: "1.5",
              }}
            >
              ✅ {successMsg}
            </p>
          )}

          {error && (
            <p className="booking-error" style={{ marginTop: "15px" }}>
              {error}
            </p>
          )}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-submit-btn">
              Masuk
            </button>
          </form>

          <p className="signup-link">
            Belum punya akun?{" "}
            <Link to="/role" className="signup-text-link">
              Daftar Sekarang
            </Link>
          </p>
          <div
            style={{
              marginTop: "20px",
              fontSize: "12px",
              color: "#666",
              textAlign: "left",
              background: "#f8fafc",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
              Akun Demo:
            </p>
            <p>
              🐾 Pawrent: <code>pawrent@itspet.com</code> / (password apapun)
            </p>
            <p>
              🏠 Sitter: <code>sitter@itspet.com</code> / (password apapun)
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
