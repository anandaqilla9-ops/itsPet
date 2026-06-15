function SitterCard({
  image,
  name,
  rating,
  price
}) {
  return (
    <div className="sitter-card">

      <img
        src={image}
        alt={name}
        className="sitter-image"
      />

      <div className="sitter-info">

        <h3>{name}</h3>

        <p>⭐ {rating}</p>

        <p>{price}</p>

      </div>

    </div>
  )
}

export default SitterCard