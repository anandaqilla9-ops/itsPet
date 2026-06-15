import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sitters } from "../data/sitters";

import review1 from "../assets/review1.jpg";
import review2 from "../assets/review2.jpg";
import review3 from "../assets/review3.jpg";

function SitterDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const sitter = location.state?.sitter || sitters[0];

  const handleBooking = () => {
    navigate("/booking", { state: { sitter } });
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-content detail-page">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Kembali
        </button>

        <div className="detail-container">
          <div className="detail-left">
            <img
              src={sitter.image}
              alt={sitter.name}
              className="detail-image"
            />
          </div>

          <div className="detail-right">
            <div className="detail-header">
              <h1>{sitter.name}</h1>
              <span className="detail-badge">📍 {sitter.location}</span>
            </div>

            <div className="detail-meta">
              <span className="detail-rating">⭐ {sitter.rating} ({sitter.reviewsCount} Ulasan)</span>
              <span className="detail-experience">💼 {sitter.experience} Pengalaman</span>
            </div>

            <div className="detail-description">
              <h3>Tentang Saya</h3>
              <p>{sitter.description}</p>
            </div>

            <div className="detail-services">
              <h3>Layanan Tersedia</h3>
              <div className="services-list">
                {sitter.skills.map((skill, idx) => (
                  <span key={idx} className="service-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="detail-price-section">
              <div className="price-info">
                <span className="price-label">Tarif Kunjungan</span>
                <h2 className="price-amount">{sitter.priceText}</h2>
              </div>
              
              <button onClick={handleBooking} className="booking-btn">
                Booking Sekarang
              </button>
            </div>
          </div>
        </div>

        <div className="reviews-section-sitter" style={{ marginTop: "40px" }}>
          <h2 style={{ color: "white", marginBottom: "20px", fontSize: "28px" }}>Ulasan Pelanggan</h2>
          
          <div className="review-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {sitter.id === 1 && (
              <>
                <div className="review-card">
                  <img src={review1} alt="Molly" className="review-image" />
                  <div className="review-stars">⭐⭐⭐⭐⭐</div>
                  <p className="review-text">"Molly jadi lebih tenang dan aku dapat update foto setiap beberapa jam."</p>
                  <h4>Nathania Rani</h4>
                  <span>Pemilik Molly 🐰</span>
                </div>
                <div className="review-card">
                  <img src={review3} alt="Kimi" className="review-image" />
                  <div className="review-stars">⭐⭐⭐⭐⭐</div>
                  <p className="review-text">"Sangat telaten merawat kucing persia saya. Kucing saya Kimi langsung suka dan manja pada Karina."</p>
                  <h4>Aisyah R.</h4>
                  <span>Pemilik Kimi 🐱</span>
                </div>
              </>
            )}
            {sitter.id === 2 && (
              <>
                <div className="review-card">
                  <img src={review2} alt="Rocky" className="review-image" />
                  <div className="review-stars">⭐⭐⭐⭐★</div>
                  <p className="review-text">"Sitternya datang tepat waktu dan sangat komunikatif."</p>
                  <h4>Raisha Annette</h4>
                  <span>Pemilik Rocky 🐶</span>
                </div>
                <div className="review-card">
                  <img src={review3} alt="Snowy" className="review-image" />
                  <div className="review-stars">⭐⭐⭐⭐⭐</div>
                  <p className="review-text">"Anjing saya Snowy senang sekali diajak jalan-jalan sore oleh Nashwa. Sangat penyayang hewan!"</p>
                  <h4>Gibran F.</h4>
                  <span>Pemilik Snowy 🐶</span>
                </div>
              </>
            )}
            {sitter.id === 3 && (
              <>
                <div className="review-card">
                  <img src={review3} alt="Elora" className="review-image" />
                  <div className="review-stars">⭐⭐⭐⭐⭐</div>
                  <p className="review-text">"Laporan real-time membuat aku lebih tenang saat bepergian."</p>
                  <h4>Aditya Rasyiid</h4>
                  <span>Pemilik Elora 🐱</span>
                </div>
                <div className="review-card">
                  <img src={review2} alt="Ciko" className="review-image" />
                  <div className="review-stars">⭐⭐⭐⭐⭐</div>
                  <p className="review-text">"Layanan grooming-nya sangat rapi dan bersih. Anabul saya Ciko wangi sekali setelah ditangani Aurelia!"</p>
                  <h4>Rania K.</h4>
                  <span>Pemilik Ciko 🐶</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SitterDetail;