import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
const location = useLocation();
const navigate = useNavigate();
const isHome = location.pathname === "/";

const [isLoggedIn, setIsLoggedIn] = useState(false);
const [currentUser, setCurrentUser] = useState(null);
const [showDropdown, setShowDropdown] = useState(false);

useEffect(() => {
const logged = localStorage.getItem("isLoggedIn") === "true";
setIsLoggedIn(logged);

```
if (logged) {
  const userStr = localStorage.getItem("currentUser");
  setCurrentUser(userStr ? JSON.parse(userStr) : null);
} else {
  setCurrentUser(null);
}
```

}, [location.pathname]);

const handleLogout = () => {
localStorage.removeItem("isLoggedIn");
localStorage.removeItem("currentUser");
setShowDropdown(false);
navigate("/");
};

const isSitter = currentUser?.role?.toLowerCase() === "sitter";

return (
<nav className={`navbar ${isHome ? "" : "solid"}`}>
<Link to="/" className="logo-container" style={{ textDecoration: "none" }}> <img src={logo} alt="it'sPet" className="logo-img" /> <span className="logo-text">it'sPet</span> </Link>

```
  <div className="nav-links">
    {!isLoggedIn ? (
      <>
        <a href="/#services">Layanan</a>
        <a href="/#reviews">Ulasan</a>

        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      </>
    ) : (
      <>
        {isSitter ? (
          <>
            <a href="/#services">Layanan</a>
            <a href="/#reviews">Ulasan</a>
            <Link to="/login">
              <button className="login-btn">
                Login
              </button>
            </Link>
          </>
        ) : isSitter ? (
          <>
            <Link to="/sitter-dashboard" className="nav-link-text">📊 Dashboard</Link>
            <Link to="/sitter-bookings" className="nav-link-text">📬 Booking</Link>
            <Link to="/sitter-monitoring" className="nav-link-text">📸 Monitoring</Link>
            <Link to="/earnings" className="nav-link-text">💰 Pendapatan</Link>
            <div className="profile-dropdown-container">
              <div className="profile-avatar" onClick={() => setShowDropdown(!showDropdown)}>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                  />
                ) : (
                  <span className="avatar-letter">{currentUser?.name ? currentUser.name[0].toUpperCase() : "U"}</span>
                )}
              </div>

              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile" onClick={() => setShowDropdown(false)}>
                    👤 Profil Saya
                  </Link>
                  <Link to="/edit-profile" onClick={() => setShowDropdown(false)}>
                    ✏️ Edit Profil
                  </Link>
                  <button onClick={handleLogout} className="logout-dropdown-btn">
                    🚪 Keluar
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          // Regular logged-in user (client)
          <>
            <Link to="/bookings" className="nav-link-text">📬 Booking</Link>
            <Link to="/monitoring" className="nav-link-text">📸 Monitoring</Link>
            <div className="profile-dropdown-container">
              <div className="profile-avatar" onClick={() => setShowDropdown(!showDropdown)}>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                  />
                ) : (
                  <span className="avatar-letter">{currentUser?.name ? currentUser.name[0].toUpperCase() : "U"}</span>
                )}
              </div>
              
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile" onClick={() => setShowDropdown(false)}>
                    👤 Profil Saya
                  </Link>
                  <Link to="/edit-profile" onClick={() => setShowDropdown(false)}>
                    ✏️ Edit Profil
                  </Link>
                  <button onClick={handleLogout} className="logout-dropdown-btn">
                    🚪 Keluar
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        <div className="profile-dropdown-container">
          <div
            className="profile-avatar"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <span className="avatar-letter">
                {currentUser?.name?.[0]?.toUpperCase() || "U"}
              </span>
            )}
          </div>

          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/profile">👤 Profil Saya</Link>
              <Link to="/edit-profile">✏️ Edit Profil</Link>

              <button
                onClick={handleLogout}
                className="logout-dropdown-btn"
              >
                🚪 Keluar
              </button>
            </div>
          )}
        </div>
      </>
    )}
  </div>
</nav>
```

);
}

export default Navbar;
