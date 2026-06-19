import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import review1 from "../assets/review1.jpg";
import review2 from "../assets/review2.jpg";
import review3 from "../assets/review3.jpg";

function SitterReviews() {
  const navigate = useNavigate();
  const currentUserStr = localStorage.getItem("currentUser");
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

  // Dummy reviews since backend is not connected
  const dummyReviews = [
    {
      id: 1,
      name: "Nathania Rani",
      petName: "Molly",
      petType: "🐰 Kelinci",
      image: review1,
      rating: "⭐⭐⭐⭐⭐",
      text: "Molly jadi lebih tenang dan aku dapat update foto setiap beberapa jam. Sangat rekomendasi!"
    },
    {
      id: 2,
      name: "Raisha Annette",
      petName: "Rocky",
      petType: "🐶 Anjing",
      image: review2,
      rating: "⭐⭐⭐⭐⭐",
      text: "Sitternya datang tepat waktu dan sangat komunikatif. Rocky juga langsung nurut."
    },
    {
      id: 3,
      name: "Aisyah R.",
      petName: "Kimi",
      petType: "🐱 Kucing",
      image: review3,
      rating: "⭐⭐⭐⭐⭐",
      text: "Sangat telaten merawat kucing persia saya. Kucing saya langsung suka dan bulunya rapi."
    }
  ];

  return (
    <div className="page-wrapper" style={{ background: "linear-gradient(160deg, #f0f6ff 0%, #e8f4fd 40%, #d1f8ef 100%)", minHeight: "100vh" }}>
      <Navbar />

      <div className="main-content sitter-reviews-page" style={{ paddingTop: "100px", paddingBottom: "60px", maxWidth: "1000px", margin: "0 auto", paddingLeft: "20px", paddingRight: "20px" }}>
        <button onClick={() => navigate(-1)} className="back-btn" style={{ marginBottom: "20px" }}>
          ← Kembali
        </button>

        <h1 style={{ color: "#1e3a5f", fontWeight: "800", fontSize: "2.2rem", marginBottom: "8px" }}>⭐ Ulasan Pelanggan</h1>
        <p style={{ color: "#5a7fa8", marginBottom: "35px", fontSize: "1rem" }}>
          Berikut adalah semua ulasan dan testimonial dari Pawrent yang telah mempercayakan anabulnya kepada Anda, <strong>{currentUser?.name || "Sitter"}</strong>.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {dummyReviews.map((review) => (
            <div
              key={review.id}
              className="review-card-item"
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "28px 24px",
                boxShadow: "0 4px 20px rgba(54,116,181,0.06)",
                border: "1px solid rgba(54,116,181,0.08)",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(54,116,181,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(54,116,181,0.06)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px" }}>
                <img
                  src={review.image}
                  alt={review.name}
                  style={{ width: "55px", height: "55px", borderRadius: "50%", objectFit: "cover", border: "2px solid #3674B5" }}
                />
                <div>
                  <h4 style={{ margin: "0 0 3px 0", fontSize: "1.05rem", color: "#1e3a5f", fontWeight: "700" }}>{review.name}</h4>
                  <span style={{ color: "#7a9bbf", fontSize: "0.82rem", fontWeight: "500" }}>Pemilik {review.petName} {review.petType}</span>
                </div>
              </div>
              <div style={{ color: "#FFB300", marginBottom: "12px", fontSize: "1.1rem", letterSpacing: "2px" }}>{review.rating}</div>
              <p style={{ color: "#5a7fa8", fontStyle: "italic", lineHeight: "1.6", margin: 0, fontSize: "0.92rem" }}>
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SitterReviews;
