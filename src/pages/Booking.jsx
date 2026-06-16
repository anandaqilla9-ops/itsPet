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
  const [visits, setVisits] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const transportCost = (sitter.distance || 0) * 2000;
  const totalCost = (sitter.price * visits) + transportCost + 5000;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !time) {
      setError("Silakan pilih tanggal dan waktu kunjungan terlebih dahulu.");
      return;
    }
    if (!petName || !petType) {
      setError("Silakan isi nama dan jenis hewan.");
      return;
    }
    if (!paymentMethod) {
      setError("Silakan pilih metode pembayaran.");
      return;
    }
    setError("");

    // Create booking object
    const currentUserStr = localStorage.getItem("currentUser");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : { name: "Guest Pawrent", address: "Surabaya", avatar: "👤" };

    const newBooking = {
      id: "BK-" + Date.now(),
      pawrent: currentUser,
      sitter: sitter,
      petName,
      petType,
      date,
      time,
      visits,
      notes,
      totalCost,
      status: "Menunggu"
    };

    const existingBookings = JSON.parse(localStorage.getItem("globalBookings") || "[]");
    localStorage.setItem("globalBookings", JSON.stringify([newBooking, ...existingBookings]));

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
                  <label htmlFor="petName">Nama Hewan</label>
                  <input
                    type="text"
                    id="petName"
                    placeholder="Contoh: Milo"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    required
                    style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", marginTop: "5px" }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="petType">Jenis Hewan Peliharaan</label>
                  <select
                    id="petType"
                    required
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", marginTop: "5px" }}
                  >
                    <option value="">Pilih hewan...</option>
                    <option value="kucing">Kucing</option>
                    <option value="anjing">Anjing</option>
                    <option value="kelinci">Kelinci</option>
                    <option value="hamster">Hamster</option>
                    <option value="small_mammals">Small Mammals</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="time">Jadwal Tersedia Sitter & Waktu</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }}
                    >
                      <option value="">Pilih jam tersedia...</option>
                      {(sitter.availableSlots || ["09:00", "13:00", "16:00"]).map((slot, idx) => (
                        <option key={idx} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="visits">Jumlah Kunjungan</label>
                  <input
                    type="number"
                    id="visits"
                    min="1"
                    value={visits}
                    onChange={(e) => setVisits(parseInt(e.target.value) || 1)}
                    required
                    style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", marginTop: "5px" }}
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

                <div className="form-group">
                  <label>Metode Pembayaran</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                    {['QRIS', 'E-Wallet', 'Transfer Bank', 'COD'].map(method => (
                      <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', background: paymentMethod === method ? '#E3F2FD' : 'white' }}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          style={{ margin: 0 }}
                        />
                        {method}
                      </label>
                    ))}
                  </div>
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
                  <span>Rp {sitter.price.toLocaleString("id-ID")} x {visits}</span>
                </div>
                <div className="price-row">
                  <span>Biaya Transport ({sitter.distance || 0} km)</span>
                  <span>Rp {transportCost.toLocaleString("id-ID")}</span>
                </div>
                <div className="price-row">
                  <span>Biaya Aplikasi (Platform)</span>
                  <span>Rp 5.000</span>
                </div>
                <div className="summary-divider"></div>
                <div className="price-row total">
                  <span>Total Biaya</span>
                  <span>Rp {totalCost.toLocaleString("id-ID")}</span>
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
              <p>⏰ <strong>Waktu/Sesi:</strong> {time}</p>
              <p>🔄 <strong>Jumlah Kunjungan:</strong> {visits} kali</p>
              {notes && <p>📝 <strong>Catatan:</strong> "{notes}"</p>}
              <p>💳 <strong>Metode Pembayaran:</strong> {paymentMethod}</p>
              <p>💰 <strong>Total Pembayaran:</strong> Rp {totalCost.toLocaleString("id-ID")}</p>
            </div>

            <p className="success-instruction">Anda sekarang dapat menghubungi sitter untuk koordinasi lebih lanjut.</p>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={() => navigate("/")} className="back-home-btn" style={{ flex: 1 }}>
                Kembali ke Home
              </button>
              <button 
                onClick={() => navigate("/chat", { state: { sitter } })} 
                className="back-home-btn" 
                style={{ flex: 1, background: '#3674B5', color: 'white', border: 'none' }}
              >
                💬 Chat Sitter
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Booking;
