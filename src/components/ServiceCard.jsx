import { useNavigate } from "react-router-dom";

function ServiceCard({
  icon,
  title,
  description,
  to,
  requiresAuth
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!to) return;

    if (requiresAuth) {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!isLoggedIn) {
        navigate("/login", { state: { from: { pathname: to } } });
        return;
      }
    }

    navigate(to);
  };

  return (
    <div
      className="service-card"
      onClick={handleClick}
      style={{ cursor: to ? "pointer" : "default" }}
    >

      <div className="service-icon">
        {icon}
      </div>

      <div>

        <h3>{title}</h3>

        <p>{description}</p>

      </div>

    </div>
  )
}

export default ServiceCard