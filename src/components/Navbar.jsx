0e19198e888a4c4f6347b301b251752cafce998e
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
            <Link to="/sitter-dashboard">📊 Dashboard</Link>
            <Link to="/sitter-bookings">📬 Booking</Link>
            <Link to="/sitter-monitoring">📸 Monitoring</Link>
            <Link to="/earnings">💰 Pendapatan</Link>
          </>
        ) : (
          <>
            <a href="/#services">Layanan</a>
            <a href="/#reviews">Ulasan</a>
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
