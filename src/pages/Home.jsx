import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import SitterCard from "../components/SitterCard";
import ReviewCard from "../components/ReviewCard";
import Footer from "../components/Footer";
import SitterDashboard from "./SitterDashboard";
import { sitters } from "../data/sitters";

import review1 from "../assets/review1.jpg";
import review2 from "../assets/review2.jpg";
import review3 from "../assets/review3.jpg";

function Home() {
  const { hash } = useLocation();
  const navigate = useNavigate();

  const currentUserStr = localStorage.getItem("currentUser");
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
  const isSitter = currentUser?.role === "sitter";

  useEffect(() => {
    if (isSitter) {
      navigate("/sitter-dashboard", { replace: true });
    }
  }, [isSitter, navigate]);

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash]);

  return (
    <>
      <Navbar />
      <Hero />

      {/* Services */}
      <section className="services" id="services">
        <h2>Layanan Kami</h2>

        <div className="service-grid">
          <ServiceCard
            icon="🐾"
            title="Pet Sitting"
            description="Perawatan hewan langsung di rumah."
            to="/search"
            requiresAuth={true}
          />

          <ServiceCard
            icon="💬"
            title="Chat"
            description="Komunikasi langsung dengan sitter."
            to="/chat"
            requiresAuth={true}
          />

          <ServiceCard
            icon="📸"
            title="Laporan"
            description="Update foto dan video real-time."
            to="/monitoring"
            requiresAuth={true}
          />

          <ServiceCard
            icon="📅"
            title="Riwayat Booking"
            description="Lihat riwayat pemesanan Anda."
            to="/booking-history"
            requiresAuth={true}
          />

          <ServiceCard
            icon="⭐"
            title="Verified Sitter"
            description="Sitter terpercaya dan terverifikasi."
            to="/verified-sitters"
            requiresAuth={false}
          />

          <ServiceCard
            icon="🎁"
            title="Loyalty"
            description="Kumpulkan poin dan reward."
            to="/loyalty"
            requiresAuth={true}
          />
        </div>
      </section>

      {/* Featured Sitters */}
      <section className="featured">
        <h2>Featured Pet Sitters</h2>

        <div className="sitter-grid">
          {sitters.slice(0, 3).map((sitter) => (
            <Link 
              key={sitter.id} 
              to="/sitter-detail" 
              state={{ sitter }} 
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <SitterCard
                image={sitter.image}
                name={sitter.name}
                rating={sitter.rating}
                price={sitter.priceText}
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="reviews" id="reviews">

        <h2>Apa Kata Mereka?</h2>

        <p>
          Ribuan pemilik hewan sudah percaya it'sPet
        </p>

        <div className="review-grid">

          <ReviewCard
            image={review1}
            review="Molly jadi lebih tenang dan aku dapat update foto setiap beberapa jam."
            author="Nathania Rani."
            pet="Pemilik Molly 🐰"
          />

          <ReviewCard
            image={review2}
            review="Sitternya datang tepat waktu dan sangat komunikatif."
            author="Raisha Annette."
            pet="Pemilik Rocky 🐶"
          />

          <ReviewCard
            image={review3}
            review="Laporan real-time membuat aku lebih tenang saat bepergian."
            author="Aditya Rasyiid"
            pet="Pemilik Elora 🐱"
          />
        </div>
       </section>

      <section className="cta">

        <h2>
          Siap Menitipkan Anabulmu?
        </h2>

        <p>
          Temukan pet sitter terpercaya dan
          berikan perawatan terbaik untuk
          hewan kesayanganmu.
        </p>

       <Link to="/search">
         <button className="cta-btn">
            Cari Pet Sitter
         </button>
       </Link>

       <Link to="/signup-sitter">
         <button className="cta-secondary-btn">
            Daftar Sebagai Sitter
         </button>
       </Link>
  
     </section>
     <Footer />
    </>
  );
}

export default Home;