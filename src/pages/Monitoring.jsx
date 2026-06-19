import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ─── Demo data (only shown for demo account) ─── */
const DEMO_EMAIL = "pawrent@itspet.com";

const DEMO_PETS = [
  { id: "milo", name: "Milo", type: "Kucing", emoji: "🐱", sitter: "Aurelia Putri" },
  { id: "rocky", name: "Rocky", type: "Anjing", emoji: "🐶", sitter: "Riko Pratama" },
];

const DEMO_DATES = {
  milo: [
    { date: "2026-06-18", label: "Rabu, 18 Juni 2026" },
    { date: "2026-06-25", label: "Rabu, 25 Juni 2026" },
  ],
  rocky: [
    { date: "2026-06-17", label: "Selasa, 17 Juni 2026" },
  ],
};

const DEMO_TIMELINE = {
  "milo-2026-06-18": [
    { time: "08:00", title: "Bangun Pagi 🌅", note: "Milo sudah bangun dan stretching! Kondisi sehat dan ceria.", emoji: "😸", category: "Aktivitas" },
    { time: "09:00", title: "Sarapan Pagi 🍽️", note: "Makan wet food rasa tuna. Porsi habis semua!", emoji: "🐟", category: "Makan" },
    { time: "10:30", title: "Pemberian Vitamin 💊", note: "Vitamin harian sudah diberikan sesuai instruksi.", emoji: "💊", category: "Kesehatan" },
    { time: "12:00", title: "Main Boneka 🎾", note: "Milo bermain dengan boneka bulu selama 30 menit. Sangat aktif!", emoji: "⚽", category: "Aktivitas" },
    { time: "15:00", title: "Tidur Siang 😴", note: "Istirahat di tempat tidur favoritnya.", emoji: "💤", category: "Istirahat" },
    { time: "16:00", title: "Makan Sore 🍗", note: "Makan dry food premium. Lahap sekali!", emoji: "🍗", category: "Makan" },
    { time: "17:00", title: "Grooming Sore ✂️", note: "Menyisir bulu dan membersihkan area mata. Bulu halus dan berkilau!", emoji: "✨", category: "Grooming" },
  ],
  "milo-2026-06-25": [
    { time: "09:00", title: "Sarapan Pagi 🍽️", note: "Milo makan dengan lahap pagi ini!", emoji: "🐟", category: "Makan" },
    { time: "11:00", title: "Jalan-jalan 🌳", note: "Berkeliling taman sebentar, Milo terlihat sangat senang.", emoji: "🌿", category: "Aktivitas" },
    { time: "16:00", title: "Makan Sore 🍗", note: "Porsi sore habis. Nafsu makan bagus!", emoji: "🍗", category: "Makan" },
  ],
  "rocky-2026-06-17": [
    { time: "09:00", title: "Olahraga Pagi 🏃", note: "Rocky diajak lari pagi selama 45 menit.", emoji: "🏃", category: "Aktivitas" },
    { time: "10:00", title: "Sarapan 🍗", note: "Makan dry food ukuran besar. Lahap!", emoji: "🍖", category: "Makan" },
    { time: "14:00", title: "Main Air 💧", note: "Rocky main air di taman belakang, sangat bahagia!", emoji: "💦", category: "Aktivitas" },
    { time: "16:00", title: "Mandi & Grooming 🛁", note: "Rocky sudah dimandikan dan disikat bulunya.", emoji: "✨", category: "Grooming" },
    { time: "18:00", title: "Makan Malam 🌙", note: "Porsi makan malam habis. Rocky sangat kenyang!", emoji: "🌙", category: "Makan" },
  ],
};

const categoryColors = {
  Makan:     { bg: "#fef3c7", color: "#92400e" },
  Aktivitas: { bg: "#dbeafe", color: "#1e40af" },
  Kesehatan: { bg: "#dcfce7", color: "#166534" },
  Istirahat: { bg: "#ede9fe", color: "#5b21b6" },
  Grooming:  { bg: "#fce7f3", color: "#9d174d" },
};

function Monitoring() {
  const navigate = useNavigate();

  const currentUserStr = localStorage.getItem("currentUser");
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
  const isDemo = currentUser?.isDemo === true;

  // Hewan dari riwayat booking user (non-demo)
  const getUserPets = () => {
    if (isDemo) return DEMO_PETS;
    try {
      const all = JSON.parse(localStorage.getItem("globalBookings") || "[]");
      const mine = all.filter(
        (b) =>
          b.pawrentEmail === currentUser?.email ||
          b.pawrent?.email === currentUser?.email
      );
      // Unique pets by name
      const seen = new Set();
      return mine
        .filter((b) => {
          if (seen.has(b.petName)) return false;
          seen.add(b.petName);
          return true;
        })
        .map((b, idx) => ({
          id: "pet-" + idx,
          name: b.petName,
          type: b.petType,
          emoji: petEmoji(b.petType),
          sitter: b.sitter?.name || "—",
          bookingDates: mine
            .filter((x) => x.petName === b.petName)
            .map((x) => ({
              date: x.date,
              label: new Date(x.date).toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
            })),
        }));
    } catch {
      return [];
    }
  };

  const petEmoji = (type = "") => {
    if (type?.toLowerCase().includes("kucing")) return "🐱";
    if (type?.toLowerCase().includes("anjing")) return "🐶";
    if (type?.toLowerCase().includes("kelinci")) return "🐰";
    if (type?.toLowerCase().includes("hamster")) return "🐹";
    if (type?.toLowerCase().includes("mammal")) return "🐭";
    return "🐾";
  };

  const [pets] = useState(getUserPets);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const selectedPet = pets.find((p) => p.id === selectedPetId);

  const getDates = () => {
    if (isDemo) return DEMO_DATES[selectedPetId] || [];
    return selectedPet?.bookingDates || [];
  };

  const getTimeline = () => {
    if (isDemo) {
      const key = `${selectedPetId}-${selectedDate}`;
      return DEMO_TIMELINE[key] || [];
    }
    try {
      const allBookings = JSON.parse(localStorage.getItem("globalBookings") || "[]");
      const targetBooking = allBookings.find(
        (b) =>
          (b.pawrentEmail === currentUser?.email || b.pawrent?.email === currentUser?.email) &&
          b.petName === selectedPet?.name &&
          b.date === selectedDate
      );
      if (!targetBooking) return [];

      const localUpdates = JSON.parse(localStorage.getItem("globalMonitoringUpdates") || "[]");
      const matchingUpdates = localUpdates.filter(u => String(u.bookingId) === String(targetBooking.id));

      return matchingUpdates.map(u => {
        const d = new Date(u.timestamp);
        const timeStr = d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
        return {
          time: timeStr,
          title: "Update dari Sitter 📸",
          note: u.caption,
          emoji: "📸",
          category: "Aktivitas",
          image: u.image
        };
      }).reverse();
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  const timeline = selectedDate ? getTimeline() : [];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #f0f6ff 0%, #e8f4fd 40%, #d1f8ef 100%)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Navbar />

      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #3674B5 0%, #578FCA 55%, #7FB3E0 100%)",
          paddingTop: "100px",
          paddingBottom: "50px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <button
            onClick={
              selectedDate
                ? () => setSelectedDate(null)
                : selectedPetId
                ? () => setSelectedPetId(null)
                : () => navigate(-1)
            }
            className="back-btn"
            style={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.4)", marginBottom: "20px" }}
          >
            ← Kembali
          </button>
          <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: "800", margin: "0 0 8px 0" }}>
            📸 Laporan Harian
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", margin: 0, fontSize: "1rem" }}>
            {!selectedPetId
              ? "Pilih hewan untuk melihat laporan"
              : !selectedDate
              ? `Pilih tanggal laporan untuk ${selectedPet?.name}`
              : `Laporan ${selectedPet?.name} — ${new Date(selectedDate).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}`}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "30px 20px 60px" }}>

        {/* STEP 1: Pilih hewan */}
        {!selectedPetId && (
          <>
            {pets.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: "20px", boxShadow: "0 4px 20px rgba(54,116,181,0.07)" }}>
                <p style={{ fontSize: "3.5rem", marginBottom: "12px" }}>🐾</p>
                <p style={{ fontWeight: "700", color: "#1e3a5f", fontSize: "1.15rem", marginBottom: "8px" }}>
                  Belum ada hewan yang dititipkan
                </p>
                <p style={{ color: "#7a9bbf", fontSize: "0.9rem", marginBottom: "24px" }}>
                  Laporan akan tersedia setelah kamu melakukan booking pertama.
                </p>
                <button
                  onClick={() => navigate("/search")}
                  style={{
                    background: "linear-gradient(135deg, #3674B5, #578FCA)",
                    color: "#fff", border: "none", borderRadius: "14px",
                    padding: "12px 28px", fontWeight: "700", cursor: "pointer",
                    fontFamily: "Poppins, sans-serif", fontSize: "0.95rem",
                    boxShadow: "0 6px 20px rgba(54,116,181,0.35)",
                  }}
                >
                  🔍 Cari Pet Sitter
                </button>
              </div>
            ) : (
              <>
                <p style={{ color: "#5a7fa8", fontWeight: "600", marginBottom: "16px", fontSize: "0.95rem" }}>
                  Pilih hewan yang ingin dilihat laporannya:
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                  {pets.map((pet) => (
                    <div
                      key={pet.id}
                      onClick={() => setSelectedPetId(pet.id)}
                      style={{
                        background: "#fff", borderRadius: "18px", padding: "24px",
                        boxShadow: "0 4px 20px rgba(54,116,181,0.08)",
                        border: "2px solid transparent", cursor: "pointer",
                        transition: "all 0.2s", textAlign: "center",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#578FCA";
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow = "0 12px 32px rgba(54,116,181,0.16)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "transparent";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 20px rgba(54,116,181,0.08)";
                      }}
                    >
                      <div style={{ fontSize: "3rem", marginBottom: "10px" }}>{pet.emoji}</div>
                      <p style={{ fontWeight: "800", color: "#1e3a5f", fontSize: "1.15rem", margin: "0 0 4px 0" }}>
                        {pet.name}
                      </p>
                      <p style={{ color: "#7a9bbf", fontSize: "0.85rem", margin: "0 0 8px 0" }}>{pet.type}</p>
                      <span style={{ background: "#e3f2fd", color: "#1565c0", borderRadius: "20px", padding: "4px 12px", fontSize: "0.78rem", fontWeight: "600" }}>
                        Sitter: {pet.sitter}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* STEP 2: Pilih tanggal */}
        {selectedPetId && !selectedDate && (
          <>
            <p style={{ color: "#5a7fa8", fontWeight: "600", marginBottom: "16px", fontSize: "0.95rem" }}>
              Pilih tanggal laporan untuk <strong style={{ color: "#1e3a5f" }}>{selectedPet?.name}</strong>:
            </p>
            {getDates().length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", background: "#fff", borderRadius: "18px" }}>
                <p style={{ color: "#7a9bbf" }}>Belum ada laporan tersedia untuk hewan ini.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {getDates().map((d) => (
                  <div
                    key={d.date}
                    onClick={() => setSelectedDate(d.date)}
                    style={{
                      background: "#fff", borderRadius: "14px", padding: "18px 22px",
                      boxShadow: "0 4px 16px rgba(54,116,181,0.08)", cursor: "pointer",
                      border: "2px solid transparent", display: "flex", alignItems: "center",
                      justifyContent: "space-between", transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#578FCA";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: "700", color: "#1e3a5f", margin: "0 0 3px 0" }}>📅 {d.label}</p>
                      <p style={{ color: "#7a9bbf", fontSize: "0.82rem", margin: 0 }}>
                        Sitter: {selectedPet?.sitter}
                      </p>
                    </div>
                    <span style={{ color: "#578FCA", fontWeight: "700", fontSize: "1.2rem" }}>→</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* STEP 3: Timeline laporan */}
        {selectedPetId && selectedDate && (
          <>
            <div
              style={{
                background: "#fff", borderRadius: "16px", padding: "16px 20px",
                marginBottom: "24px", boxShadow: "0 4px 16px rgba(54,116,181,0.08)",
                display: "flex", alignItems: "center", gap: "12px",
              }}
            >
              <span style={{ fontSize: "2rem" }}>{selectedPet?.emoji}</span>
              <div>
                <p style={{ fontWeight: "700", color: "#1e3a5f", margin: "0 0 2px 0" }}>
                  {selectedPet?.name} · {selectedPet?.type}
                </p>
                <p style={{ color: "#7a9bbf", fontSize: "0.85rem", margin: 0 }}>
                  Sitter: {selectedPet?.sitter}
                </p>
              </div>
            </div>

            {timeline.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", background: "#fff", borderRadius: "18px" }}>
                <p style={{ color: "#7a9bbf" }}>Belum ada catatan monitoring untuk tanggal ini.</p>
              </div>
            ) : (
              <div className="monitoring-timeline">
                {timeline.map((item, index) => (
                  <div key={index} className="monitoring-item">
                    <div className="monitoring-time-col">
                      <span className="monitoring-time">{item.time}</span>
                      {index < timeline.length - 1 && <div className="monitoring-line" />}
                    </div>
                    <div className="monitoring-dot">
                      <span>{item.emoji}</span>
                    </div>
                    <div className="monitoring-card">
                      <div className="monitoring-card-header">
                        <h3>{item.title}</h3>
                        <span
                          className="monitoring-category"
                          style={{
                            background: categoryColors[item.category]?.bg,
                            color: categoryColors[item.category]?.color,
                          }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p>{item.note}</p>
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt="Update" 
                          style={{ width: "100%", borderRadius: "10px", marginTop: "12px", objectFit: "cover", maxHeight: "250px" }} 
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Monitoring;
