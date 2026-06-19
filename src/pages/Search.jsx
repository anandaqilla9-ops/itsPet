import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sitters } from "../data/sitters";

function Search() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPet, setSelectedPet] = useState("all");
  const [filteredSitters, setFilteredSitters] = useState(sitters);
  const [userCoords, setUserCoords] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        (err) => console.log("Geolocation error:", err)
      );
    }
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getSitterDistance = (sitter) => {
    if (userCoords && sitter.lat && sitter.lng) {
      return calculateDistance(userCoords.lat, userCoords.lng, sitter.lat, sitter.lng);
    }
    return sitter.distance || 0;
  };

  useEffect(() => {
    const filtered = sitters.filter(sitter => {
      const matchesSearch = 
        sitter.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sitter.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPet = 
        selectedPet === "all" || 
        sitter.skills.some(skill => skill.toLowerCase().includes(selectedPet.toLowerCase()));

      return matchesSearch && matchesPet;
    });
    setFilteredSitters(filtered);
  }, [searchTerm, selectedPet]);

  const handleViewDetail = (sitter) => {
    const distanceVal = getSitterDistance(sitter);
    const updatedSitter = { ...sitter, distance: parseFloat(distanceVal.toFixed(1)) };
    navigate("/sitter-detail", { state: { sitter: updatedSitter } });
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <div className="main-content search-page">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Kembali
        </button>
 
        <h1>Cari Pet Sitter</h1>
 
        <div className="search-filter-container" style={{ maxWidth: "800px", margin: "0 auto 50px" }}>
          <div className="search-bar-enhanced" style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <div className="search-input-wrapper" style={{ flex: "2", minWidth: "250px", position: "relative" }}>
              <input
                type="text"
                placeholder="Cari lokasi atau nama sitter..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "100%", padding: "15px 15px 15px 40px", borderRadius: "12px", border: "1px solid #ddd", outline: "none", fontSize: "15px" }}
              />
              <span style={{ position: "absolute", left: "15px", top: "16px", fontSize: "16px" }}>🔍</span>
            </div>
 
            <div className="filter-select-wrapper" style={{ flex: "1", minWidth: "180px", position: "relative" }}>
              <select
                value={selectedPet}
                onChange={(e) => setSelectedPet(e.target.value)}
                style={{ width: "100%", padding: "15px 15px 15px 40px", borderRadius: "12px", border: "1px solid #ddd", outline: "none", background: "white", fontSize: "15px", cursor: "pointer" }}
              >
                <option value="all">🐱🐶 Semua Hewan</option>
                <option value="kucing">🐱 Kucing</option>
                <option value="anjing">🐶 Anjing</option>
                <option value="mammal">🐭 Small Mammals</option>
              </select>
              <span style={{ position: "absolute", left: "15px", top: "16px", fontSize: "16px" }}>🐾</span>
            </div>
          </div>
        </div>

        {filteredSitters.length > 0 ? (
          <div className="search-grid">
            {filteredSitters.map((sitter) => (
              <div className="search-card" key={sitter.id}>
                <img src={sitter.image} alt={sitter.name} />
                <div className="search-card-info">
                  <h3>{sitter.name}</h3>
                  <p className="sitter-location">📍 {sitter.location} ({getSitterDistance(sitter).toFixed(1)} km) • {sitter.experience} pengalaman</p>
                  <p className="sitter-rating">⭐ {sitter.rating}</p>
                  <div className="sitter-skills">
                    {sitter.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  <p className="sitter-price">{sitter.priceText}</p>
                  <button onClick={() => handleViewDetail(sitter)} className="detail-btn">
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>Maaf, pet sitter tidak ditemukan di lokasi atau dengan kriteria tersebut.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Search;