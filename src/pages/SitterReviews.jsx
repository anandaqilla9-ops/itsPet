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
      petType: "🐰",
      image: review1,
      rating: "⭐⭐⭐⭐⭐",
      text: "Molly jadi lebih tenang dan aku dapat update foto setiap beberapa jam."
    },
    {
      id: 2,
      name: "Raisha Annette",
      petName: "Rocky",
      petType: "🐶",
      image: review2,
      rating: "⭐⭐⭐⭐★",
      text: "Sitternya datang tepat waktu dan sangat komunikatif."
    },
    {
      id: 3,
      name: "Aisyah R.",
      petName: "Kimi",
      petType: "🐱",
      image: review3,
      rating: "⭐⭐⭐⭐⭐",
      text: "Sangat telaten merawat kucing persia saya. Kucing saya langsung suka!"
    }
  ];

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-content" style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <button onClick={() => navigate(-1)} className="back-btn" style={{ marginBottom: '20px' }}>
            ← Kembali
          </button>

          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Ulasan Pelanggan</h1>
          <p style={{ color: '#666', marginBottom: '40px', fontSize: '1.1rem' }}>
            Berikut adalah ulasan dari Pawrent yang pernah menggunakan jasa Anda, <strong>{currentUser?.name || "Sitter"}</strong>.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
            {dummyReviews.map(review => (
              <div key={review.id} style={{ background: '#fff', borderRadius: '15px', padding: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <img src={review.image} alt={review.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#333' }}>{review.name}</h4>
                    <span style={{ color: '#888', fontSize: '0.9rem' }}>Pemilik {review.petName} {review.petType}</span>
                  </div>
                </div>
                <div style={{ color: '#FFB300', marginBottom: '10px', fontSize: '1.2rem' }}>{review.rating}</div>
                <p style={{ color: '#555', fontStyle: 'italic', lineHeight: '1.5', margin: 0 }}>"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SitterReviews;
