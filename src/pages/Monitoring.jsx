import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const monitoringData = [
  {
    time: "07:00",
    title: "Bangun Pagi 🌅",
    note: "Anabul sudah bangun dan stretching pagi. Kondisi sehat dan ceria!",
    emoji: "😸",
    category: "Aktivitas",
  },
  {
    time: "08:00",
    title: "Sarapan Pagi 🍽️",
    note: "Makan pagi dengan wet food rasa tuna. Porsi habis semua!",
    emoji: "🐟",
    category: "Makan",
  },
  {
    time: "09:00",
    title: "Makan Habis ✅",
    note: "Anabul sudah selesai makan dan minum air. Tempat makan sudah dibersihkan.",
    emoji: "✅",
    category: "Makan",
  },
  {
    time: "10:30",
    title: "Pemberian Vitamin 💊",
    note: "Vitamin harian sudah diberikan sesuai instruksi. Tidak ada masalah.",
    emoji: "💊",
    category: "Kesehatan",
  },
  {
    time: "12:00",
    title: "Main di Taman 🌳",
    note: "Diajak jalan-jalan dan bermain di taman. Sangat aktif dan senang bermain dengan bola!",
    emoji: "⚽",
    category: "Aktivitas",
  },
  {
    time: "13:00",
    title: "Makan Siang 🍗",
    note: "Makan siang dengan dry food premium. Porsi habis, nafsu makan bagus!",
    emoji: "🍗",
    category: "Makan",
  },
  {
    time: "15:00",
    title: "Tidur Siang 😴",
    note: "Anabul tidur siang di tempat favoritnya. Terlihat sangat nyaman dan tenang.",
    emoji: "💤",
    category: "Istirahat",
  },
  {
    time: "17:00",
    title: "Grooming Sore ✂️",
    note: "Menyisir bulu dan membersihkan area mata. Bulu halus dan berkilau!",
    emoji: "✨",
    category: "Grooming",
  },
  {
    time: "19:00",
    title: "Makan Malam 🍽️",
    note: "Makan malam porsi terakhir hari ini. Anabul makan dengan lahap!",
    emoji: "🌙",
    category: "Makan",
  },
];

const categoryColors = {
  Makan: { bg: "#fef3c7", color: "#92400e" },
  Aktivitas: { bg: "#dbeafe", color: "#1e40af" },
  Kesehatan: { bg: "#dcfce7", color: "#166534" },
  Istirahat: { bg: "#ede9fe", color: "#5b21b6" },
  Grooming: { bg: "#fce7f3", color: "#9d174d" },
};

function Monitoring() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-content">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Kembali
        </button>

        <div className="monitoring-header">
          <h1>📸 Laporan Harian</h1>
          <p>Update real-time dari pet sitter untuk anabul kesayanganmu</p>
          <div className="monitoring-pet-info">
            <span className="monitoring-pet-badge">🐱 Milo</span>
            <span className="monitoring-date-badge">📅 {new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
            <span className="monitoring-sitter-badge">🏠 Sitter: Karina</span>
          </div>
        </div>

        <div className="monitoring-timeline">
          {monitoringData.map((item, index) => (
            <div key={index} className="monitoring-item">
              <div className="monitoring-time-col">
                <span className="monitoring-time">{item.time}</span>
                {index < monitoringData.length - 1 && <div className="monitoring-line" />}
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
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Monitoring;
