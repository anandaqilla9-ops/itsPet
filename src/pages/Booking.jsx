import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sitters } from "../data/sitters";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const sitter = location.state?.sitter || sitters[0];

  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [date, setDate] = useState("");
  const [visits, setVisits] = useState(1);
  const [visitTimes, setVisitTimes] = useState([""]); // array of times per visit
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const availableSlots = sitter.availableSlots || [
    "09:00 - 12:00",
    "13:00 - 16:00",
    "16:00 - 19:00",
  ];

  const transportCost = (sitter.distance || 0) * 2000;
  const totalCost = sitter.price * visits + transportCost + 5000;

  // Update jumlah visitTimes sesuai visits
  const handleVisitsChange = (val) => {
    const n = Math.max(1, parseInt(val) || 1);
    setVisits(n);
    setVisitTimes((prev) => {
      const arr = [...prev];
      while (arr.length < n) arr.push("");
      return arr.slice(0, n);
    });
  };

  const handleTimeChange = (index, value) => {
    setVisitTimes((prev) => {
      const arr = [...prev];
      arr[index] = value;
      return arr;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!petName || !petType) {
      setError("Silakan isi nama dan jenis hewan.");
      return;
    }
    if (!date) {
      setError("Silakan pilih tanggal kunjungan.");
      return;
    }
    const emptyTime = visitTimes.some((t) => !t);
    if (emptyTime) {
      setError(
        `Silakan pilih waktu untuk semua ${visits} kunjungan.`
      );
      return;
    }
    if (!paymentMethod) {
      setError("Silakan pilih metode pembayaran.");
      return;
    }
    setError("");

    const currentUserStr = localStorage.getItem("currentUser");
    const currentUser = currentUserStr
      ? JSON.parse(currentUserStr)
      : { name: "Guest Pawrent", address: "Surabaya" };

    const newBooking = {
      id: "BK-" + Date.now(),
      pawrent: currentUser,
      pawrentEmail: currentUser.email,
      sitter: sitter,
      petName,
      petType,
      date,
      time: visitTimes[0], // primary time
      visitTimes,          // all visit times
      visits,
      notes,
      totalCost,
      paymentMethod,
      status: "Menunggu",
      createdAt: new Date().toISOString(),
    };

    const existingBookings = JSON.parse(
      localStorage.getItem("globalBookings") || "[]"
    );
    localStorage.setItem(
      "globalBookings",
      JSON.stringify([newBooking, ...existingBookings])
    );

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
              <p className="booking-subtitle">
                Hubungi <strong>{sitter.name}</strong> untuk kunjungan
                perawatan hewan Anda.
              </p>

              {error && <p className="booking-error">{error}</p>}

              <form onSubmit={handleSubmit}>
                {/* 1. Nama Hewan */}
                <div className="form-group">
                  <label htmlFor="petName">Nama Hewan</label>
                  <input
                    type="text"
                    id="petName"
                    placeholder="Contoh: Milo"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      marginTop: "5px",
                    }}
                  />
                </div>

                {/* 2. Jenis Hewan */}
                <div className="form-group">
                  <label htmlFor="petType">Jenis Hewan Peliharaan</label>
                  <select
                    id="petType"
                    required
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      marginTop: "5px",
                    }}
                  >
                    <option value="">Pilih jenis hewan...</option>
                    <option value="Kucing">🐱 Kucing</option>
                    <option value="Anjing">🐶 Anjing</option>
                    <option value="Kelinci">🐰 Kelinci</option>
                    <option value="Hamster">🐹 Hamster</option>
                    <option value="Small Mammals">🐭 Small Mammals</option>
                    <option value="Burung">🦜 Burung</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                {/* 3. Tanggal */}
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

                {/* 4. Jumlah Kunjungan DULU */}
                <div className="form-group">
                  <label htmlFor="visits">Jumlah Kunjungan</label>
                  <input
                    type="number"
                    id="visits"
                    min="1"
                    max="5"
                    value={visits}
                    onChange={(e) => handleVisitsChange(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      marginTop: "5px",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "#7a9bbf",
                      marginTop: "5px",
                    }}
                  >
                    Isi jumlah kunjungan yang diinginkan, lalu pilih waktu
                    untuk masing-masing kunjungan di bawah.
                  </p>
                </div>

                {/* 5. Slot waktu per kunjungan */}
                {visitTimes.map((t, idx) => (
                  <div className="form-group" key={idx}>
                    <label>
                      ⏰ Waktu Kunjungan {idx + 1}
                    </label>
                    <select
                      value={t}
                      onChange={(e) => handleTimeChange(idx, e.target.value)}
                      required
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        marginTop: "5px",
                      }}
                    >
                      <option value="">Pilih slot waktu...</option>
                      {availableSlots.map((slot, si) => (
                        <option
                          key={si}
                          value={slot}
                          disabled={
                            visitTimes.includes(slot) && visitTimes[idx] !== slot
                          }
                        >
                          {slot}
                          {visitTimes.includes(slot) &&
                          visitTimes[idx] !== slot
                            ? " (sudah dipilih)"
                            : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                {/* 6. Catatan */}
                <div className="form-group">
                  <label htmlFor="notes">
                    Catatan Tambahan (Kondisi anabul, instruksi khusus, dll.)
                  </label>
                  <textarea
                    id="notes"
                    placeholder="Contoh: Kucing saya persia berumur 2 tahun, perlu diberi makan basah jam 4 sore..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                {/* 7. Metode Pembayaran */}
                <div className="form-group">
                  <label>Metode Pembayaran</label>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                      marginTop: "10px",
                    }}
                  >
                    {["QRIS", "E-Wallet", "Transfer Bank", "COD"].map(
                      (method) => (
                        <label
                          key={method}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px",
                            border: `1px solid ${
                              paymentMethod === method ? "#3674B5" : "#ddd"
                            }`,
                            borderRadius: "8px",
                            cursor: "pointer",
                            background:
                              paymentMethod === method ? "#E3F2FD" : "white",
                            transition: "all 0.2s",
                          }}
                        >
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
                      )
                    )}
                  </div>
                </div>

                <button type="submit" className="booking-submit-btn">
                  Konfirmasi Booking
                </button>
              </form>
            </div>

            {/* Summary Card */}
            <div className="booking-summary-card">
              <h3>Ringkasan Pemesanan</h3>
              <div className="summary-sitter-info">
                <img
                  src={sitter.image}
                  alt={sitter.name}
                  className="summary-sitter-img"
                />
                <div>
                  <h4>{sitter.name}</h4>
                  <p>
                    ⭐ {sitter.rating} • {sitter.location}
                  </p>
                </div>
              </div>

              <div className="summary-divider" />

              <div className="summary-price-details">
                <div className="price-row">
                  <span>Biaya Layanan Sitter</span>
                  <span>
                    Rp {sitter.price.toLocaleString("id-ID")} × {visits}
                  </span>
                </div>
                <div className="price-row">
                  <span>Biaya Transport ({sitter.distance || 0} km)</span>
                  <span>Rp {transportCost.toLocaleString("id-ID")}</span>
                </div>
                <div className="price-row">
                  <span>Biaya Aplikasi (Platform)</span>
                  <span>Rp 5.000</span>
                </div>
                <div className="summary-divider" />
                <div className="price-row total">
                  <span>Total Biaya</span>
                  <span>Rp {totalCost.toLocaleString("id-ID")}</span>
                </div>
              </div>

              {/* Visit schedule preview */}
              {visitTimes.some((t) => t) && (
                <>
                  <div className="summary-divider" />
                  <div style={{ marginTop: "4px" }}>
                    <p
                      style={{
                        fontWeight: "700",
                        color: "#1e3a5f",
                        marginBottom: "8px",
                        fontSize: "0.9rem",
                      }}
                    >
                      📅 Jadwal Kunjungan:
                    </p>
                    {visitTimes.map((t, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "0.85rem",
                          color: "#5a7fa8",
                          marginBottom: "4px",
                        }}
                      >
                        <span>Kunjungan {i + 1}</span>
                        <span>{t || "—"}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="booking-success-card">
            <div className="success-icon">🐾</div>
            <h2>Booking Berhasil Dikonfirmasi!</h2>
            <p>
              Sitter <strong>{sitter.name}</strong> telah menerima permintaan
              Anda.
            </p>

            <div className="booking-details-box">
              <h3>Detail Jadwal</h3>
              <p>
                📅 <strong>Tanggal:</strong>{" "}
                {new Date(date).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                🔄 <strong>Jumlah Kunjungan:</strong> {visits} kali
              </p>
              {visitTimes.map((t, i) => (
                <p key={i}>
                  ⏰ <strong>Kunjungan {i + 1}:</strong> {t}
                </p>
              ))}
              {notes && (
                <p>
                  📝 <strong>Catatan:</strong> "{notes}"
                </p>
              )}
              <p>
                💳 <strong>Metode Pembayaran:</strong> {paymentMethod}
              </p>
              <p>
                💰 <strong>Total Pembayaran:</strong> Rp{" "}
                {totalCost.toLocaleString("id-ID")}
              </p>
            </div>

            <p className="success-instruction">
              Anda sekarang dapat menghubungi sitter untuk koordinasi lebih
              lanjut.
            </p>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                onClick={() => navigate("/")}
                className="back-home-btn"
                style={{ flex: 1 }}
              >
                Kembali ke Home
              </button>
              <button
                onClick={() => navigate("/booking-history")}
                className="back-home-btn"
                style={{ flex: 1, background: "#3674B5", color: "white", border: "none" }}
              >
                📋 Riwayat Booking
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
