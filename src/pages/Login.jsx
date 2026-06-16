import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const from = location.state?.from || { pathname: "/" };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Silakan isi email dan password.");
      return;
    }

    const registeredUserStr = localStorage.getItem("registeredUser");
    let userData = null;

    if (registeredUserStr) {
      const regUser = JSON.parse(registeredUserStr);
      if (regUser.email.toLowerCase() === email.toLowerCase()) {
        userData = regUser;
      }
    }

    if (!userData) {
      const lowerEmail = email.toLowerCase();
      if (lowerEmail === "pawrent@itspet.com") {
        userData = {
          name: "Budi Santoso",
          email: "pawrent@itspet.com",
          username: "budis",
          phone: "08123456789",
          address: "Jl. Mawar No. 12, Surabaya",
          role: "pawrent"
        };
      } else if (lowerEmail === "sitter@itspet.com") {
        userData = {
          name: "Aurelia Putri",
          email: "sitter@itspet.com",
          username: "aureliap",
          phone: "08987654321",
          address: "Jl. Dahlia No. 45, Surabaya",
          role: "sitter",
          experience: "4 tahun",
          rating: "5.0",
          skills: ["🐱 Kucing", "🐶 Anjing", "✂️ Grooming", "💊 Pemberian Obat"],
          description: "Pet care profesional. Memiliki sertifikat grooming hewan dan berpengalaman menangani anabul yang sedang sakit atau memerlukan perhatian khusus."
        };
      } else {
        userData = {
          name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
          email: email,
          username: email.split("@")[0],
          role: "pawrent",
          phone: "0812345678",
          address: "Surabaya"
        };
      }
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(userData));

    if (from.pathname === "/") {
      navigate("/profile")
    } else {
      navigate(from.pathname, {
        state: from.state,
        replace: true
      })
    }
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

          {error && <p className="booking-error" style={{ marginTop: "15px" }}>{error}</p>}

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
          <div style={{ marginTop: "20px", fontSize: "12px", color: "#666", textAlign: "left", background: "#f8fafc", padding: "12px", borderRadius: "8px" }}>
            <p style={{ fontWeight: "bold", marginBottom: "5px" }}>Akun Demo:</p>
            <p>🐾 Pawrent: <code>pawrent@itspet.com</code> / pass</p>
            <p>🏠 Sitter: <code>sitter@itspet.com</code> / pass</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
