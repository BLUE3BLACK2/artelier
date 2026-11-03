import { formatPrice } from "../data/paintings";

export default function ProductCard({ painting, onAddToCart }) {
  const imageUrl = painting.image?.startsWith("http")
    ? painting.image
    : `http://127.0.0.1:8000/storage/${painting.image}`;

  return (
    <article className="product-card">
      <div className="product-image">
        <img src={imageUrl} alt={painting.title} />

        <button
          className="add-button"
          onClick={() => onAddToCart(painting)}
        >
          + Add to Cart
        </button>
      </div>

      <div className="product-info">
        <p className="product-category">{painting.category}</p>
        <h3>{painting.title}</h3>
        <p className="product-artist">By {painting.artist}</p>
        <p className="product-price">{formatPrice(painting.price)}</p>
      </div>
    </article>
  );
}