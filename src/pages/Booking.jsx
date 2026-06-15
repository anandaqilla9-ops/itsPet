import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sitters } from "../data/sitters";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  // Fallback to first sitter if no state is passed
  const sitter = location.state?.sitter || sitters[0];

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !time) {
      setError("Silakan pilih tanggal dan waktu kunjungan terlebih dahulu.");
      return;
    }
    setError("");
    setIsSuccess(true);
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-content booking-page">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Kembali
        </button>

        {!isSuccess ? (
          <div className="booking-container">
            <div className="booking-card-form">
              <h2>Formulir Booking</h2>
              <p className="booking-subtitle">Hubungi <strong>{sitter.name}</strong> untuk kunjungan perawatan hewan Anda.</p>

              {error && <p className="booking-error">{error}</p>}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="date">Tanggal Kunjungan</label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Waktu Kunjungan</label>
                  <input
                    type="time"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="notes">Catatan Tambahan (Kondisi anabul, instruksi khusus, dll.)</label>
                  <textarea
                    id="notes"
                    placeholder="Contoh: Kucing saya persia berumur 2 tahun, perlu diberi makan basah jam 4 sore..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <button type="submit" className="booking-submit-btn">
                  Konfirmasi Booking
                </button>
              </form>
            </div>

            <div className="booking-summary-card">
              <h3>Ringkasan Pemesanan</h3>
              <div className="summary-sitter-info">
                <img src={sitter.image} alt={sitter.name} className="summary-sitter-img" />
                <div>
                  <h4>{sitter.name}</h4>
                  <p>⭐ {sitter.rating} • {sitter.location}</p>
                </div>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-price-details">
                <div className="price-row">
                  <span>Biaya Layanan Sitter</span>
                  <span>{sitter.priceText}</span>
                </div>
                <div className="price-row">
                  <span>Biaya Aplikasi (Platform)</span>
                  <span>Rp 5.000</span>
                </div>
                <div className="summary-divider"></div>
                <div className="price-row total">
                  <span>Total Biaya</span>
                  <span>Rp {(sitter.price + 5000).toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="booking-success-card">
            <div className="success-icon">🐾</div>
            <h2>Booking Berhasil Dikonfirmasi!</h2>
            <p>Sitter <strong>{sitter.name}</strong> telah menerima permintaan Anda.</p>
            
            <div className="booking-details-box">
              <h3>Detail Jadwal</h3>
              <p>📅 <strong>Tanggal:</strong> {new Date(date).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p>⏰ <strong>Waktu:</strong> {time} WIB</p>
              {notes && <p>📝 <strong>Catatan:</strong> "{notes}"</p>}
              <p>💰 <strong>Total Pembayaran:</strong> Rp {(sitter.price + 5000).toLocaleString("id-ID")}</p>
            </div>

            <p className="success-instruction">Sitter kami akan segera menghubungi Anda melalui nomor telepon terdaftar untuk koordinasi lebih lanjut.</p>
            
            <button onClick={() => navigate("/")} className="back-home-btn">
              Kembali ke Home
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Booking;
