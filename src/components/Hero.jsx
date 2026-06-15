import heroImage from "../assets/hero.png"

function Hero() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(54,116,181,.75),
            rgba(87,143,202,.75)
          ),
          url(${heroImage})
        `
      }}
    >
      <div className="hero-content">
        <h2>Selamat datang di</h2>
        <h1>it'sPet</h1>

        <p>
          Platform Pet Sitter Terverifikasi yang Datang ke Rumah
        </p>

        <p>
          Memastikan hewan peliharaan mendapat perawatan terbaik
          di rumah mereka sendiri saat pemilik tidak ada
        </p>
        
      </div>
      <svg
        className="wave"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 180"
      >
        <path
          fill="#FAFAF7"
          d="M0,224L80,202.7C160,181,320,139,480,133.3C640,128,800,160,960,160C1120,160,1280,128,1360,112L1440,96L1440,320L0,320Z"
        />
      </svg>
    </section>
  )
}

export default Hero