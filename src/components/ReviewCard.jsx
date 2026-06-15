function ReviewCard({
  image,
  review,
  author,
  pet,
}) {
  return (
    <div className="review-card">

      <img
        src={image}
        alt={author}
        className="review-image"
      />

      <div className="review-stars">
        ⭐⭐⭐⭐⭐
      </div>

      <p className="review-text">
        "{review}"
      </p>

      <h4>{author}</h4>

      <span>{pet}</span>

    </div>
  );
}

export default ReviewCard;