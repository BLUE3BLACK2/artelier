
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../data/paintings";

export default function ProductCard({ painting, onAddToCart }) {
  const navigate = useNavigate();

  const imageUrl = painting.image?.startsWith("http")
    ? painting.image
    : `http://127.0.0.1:8000/storage/${painting.image}`;

  const openDetail = () => {
    navigate(`/paintings/${painting.id}`);
  };

  return (
    <article className="product-card">
      <div className="product-image">
        <img
          src={imageUrl}
          alt={painting.title}
          loading="lazy"
          onClick={openDetail}
        />

        <span className="product-image-label">
          {painting.category}
        </span>

        <button
          className="add-button"
          onClick={() => onAddToCart(painting)}
        >
          Add to Cart <span>+</span>
        </button>
      </div>

      <div className="product-info">
        <div className="product-title-row">
          <h3 onClick={openDetail}>{painting.title}</h3>
          <span className="product-price">
            {formatPrice(painting.price)}
          </span>
        </div>

        <p className="product-artist">
          By {painting.artist}
        </p>
        <div className="product-rating">
          {Number(painting.reviews_count) > 0 ? (
            <>
              <span className="rating-stars">★★★★★</span>
              <span className="rating-value">
                {Number(painting.reviews_avg_rating).toFixed(1)}
              </span>
              <span className="rating-count">
                ({painting.reviews_count} reviews)
              </span>
            </>
          ) : (
            <span className="rating-empty">No reviews yet</span>
          )}
        </div>
      </div>
    </article>
  );
}
