import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sitters } from "../data/sitters";

function VerifiedSitters() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-content">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Kembali
        </button>

        <div className="verified-header">
          <h1>⭐ Verified Pet Sitters</h1>
          <p>Sitter terpercaya yang telah diverifikasi oleh it'sPet</p>
        </div>

        <div className="verified-grid">
          {sitters.map((sitter) => (
            <Link
              key={sitter.id}
              to="/sitter-detail"
              state={{ sitter }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="verified-card">
                <div className="verified-card-image">
                  <img src={sitter.image} alt={sitter.name} />
                  <span className="verified-badge-overlay">✅ Verified</span>
                </div>

                <div className="verified-card-info">
                  <h3>{sitter.name}</h3>

                  <div className="verified-meta">
                    <span className="verified-rating">⭐ {sitter.rating}</span>
                    <span className="verified-reviews">({sitter.reviewsCount} ulasan)</span>
                  </div>

                  <div className="verified-detail-row">
                    <span>📍 {sitter.location}</span>
                    <span>📅 {sitter.experience}</span>
                  </div>

                  <div className="verified-skills">
                    {sitter.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                  </div>

                  <div className="verified-price">
                    {sitter.priceText}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default VerifiedSitters;
