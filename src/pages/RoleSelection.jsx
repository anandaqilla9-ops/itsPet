import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-content role-page">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Kembali
        </button>

        <div className="role-card">
          <h1>Pilih Peran</h1>
          <p>Daftar sebagai Pawrent atau Pet Sitter</p>

          <div className="role-buttons">
            <Link to="/signup-pawrent">
              <button className="pawrent-btn">
                🐾 Pawrent
              </button>
            </Link>

            <Link to="/signup-sitter">
              <button className="sitter-btn">
                🏠 Pet Sitter
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RoleSelection;