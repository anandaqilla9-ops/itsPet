import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const rewards = [
  { id: 1, name: "Diskon 10% Booking", points: 200, icon: "🎟️", claimed: true },
  { id: 2, name: "Gratis Grooming Basic", points: 500, icon: "✂️", claimed: false },
  { id: 3, name: "Free 1x Pet Sitting", points: 1000, icon: "🐾", claimed: false },
  { id: 4, name: "Premium Sitter Access", points: 1500, icon: "⭐", claimed: false },
  { id: 5, name: "Merchandise it'sPet", points: 2000, icon: "🎁", claimed: false },
  { id: 6, name: "1 Bulan Premium Free", points: 3000, icon: "👑", claimed: false },
];

function Loyalty() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const userPoints = 320;
  const nextReward = rewards.find((r) => !r.claimed && r.points > userPoints);
  const progressPercent = nextReward
    ? Math.min((userPoints / nextReward.points) * 100, 100)
    : 100;

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-content">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Kembali
        </button>

        <div className="loyalty-header">
          <h1>🎁 Loyalty Rewards</h1>
          <p>Kumpulkan poin dari setiap booking dan tukar dengan reward menarik!</p>
        </div>

        {/* Points Card */}
        <div className="loyalty-points-card">
          <div className="loyalty-points-top">
            <div className="loyalty-points-info">
              <span className="loyalty-points-label">Poin Kamu</span>
              <span className="loyalty-points-value">{userPoints}</span>
              <span className="loyalty-points-unit">poin</span>
            </div>
            <div className="loyalty-user-info">
              <div className="loyalty-avatar">
                {currentUser.name ? currentUser.name[0].toUpperCase() : "U"}
              </div>
              <span>{currentUser.name || "User"}</span>
            </div>
          </div>

          {nextReward && (
            <div className="loyalty-progress-section">
              <div className="loyalty-progress-label">
                <span>Menuju: <strong>{nextReward.name}</strong></span>
                <span>{userPoints} / {nextReward.points} poin</span>
              </div>
              <div className="loyalty-progress-bar">
                <div
                  className="loyalty-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="loyalty-progress-hint">
                Butuh <strong>{nextReward.points - userPoints}</strong> poin lagi untuk reward berikutnya!
              </p>
            </div>
          )}
        </div>

        {/* How to Earn */}
        <div className="loyalty-earn-section">
          <h2>Cara Mendapatkan Poin</h2>
          <div className="loyalty-earn-grid">
            <div className="loyalty-earn-card">
              <span className="loyalty-earn-icon">📅</span>
              <h4>Booking</h4>
              <p>+50 poin per booking</p>
            </div>
            <div className="loyalty-earn-card">
              <span className="loyalty-earn-icon">⭐</span>
              <h4>Beri Ulasan</h4>
              <p>+20 poin per ulasan</p>
            </div>
            <div className="loyalty-earn-card">
              <span className="loyalty-earn-icon">👥</span>
              <h4>Referral</h4>
              <p>+100 poin per teman</p>
            </div>
          </div>
        </div>

        {/* Rewards List */}
        <div className="loyalty-rewards-section">
          <h2>Daftar Reward</h2>
          <div className="loyalty-rewards-grid">
            {rewards.map((reward) => {
              const canClaim = userPoints >= reward.points && !reward.claimed;
              return (
                <div
                  key={reward.id}
                  className={`loyalty-reward-card ${reward.claimed ? "claimed" : ""} ${canClaim ? "available" : ""}`}
                >
                  <span className="loyalty-reward-icon">{reward.icon}</span>
                  <h4>{reward.name}</h4>
                  <span className="loyalty-reward-points">{reward.points} poin</span>
                  {reward.claimed ? (
                    <span className="loyalty-reward-status claimed">✅ Sudah Ditukar</span>
                  ) : canClaim ? (
                    <button className="loyalty-claim-btn">Tukar Sekarang</button>
                  ) : (
                    <span className="loyalty-reward-status locked">🔒 Belum Cukup</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Loyalty;
