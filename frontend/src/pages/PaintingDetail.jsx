
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getPainting,
  getReviews,
  createReview,
} from "../services/paintingService";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/paintings";

export default function PaintingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["painting", id],
    queryFn: () => getPainting(id),
  });

  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useQuery({
    queryKey: ["painting-reviews", id],
    queryFn: () => getReviews(id),
    enabled: Boolean(id),
  });

  const reviewMutation = useMutation({
    mutationFn: (reviewData) => createReview(id, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["painting-reviews", id],
      });

      setName("");
      setRating(5);
      setComment("");
    },
  });

  if (isLoading) {
    return (
      <main className="painting-detail-page">
        <p>Loading artwork...</p>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="painting-detail-page">
        <p>Failed to load artwork.</p>
        <button onClick={() => navigate("/")}>Back to Gallery</button>
      </main>
    );
  }

  const painting = data.data || data;

  const imageUrl = painting.image?.startsWith("http")
    ? painting.image
    : `http://127.0.0.1:8000/storage/${painting.image}`;

  const reviews = reviewsData?.data || [];
  const averageRating = reviewsData?.average_rating || 0;
  const totalReviews = reviewsData?.total_reviews || 0;

  const handleSubmitReview = (e) => {
    e.preventDefault();

    reviewMutation.mutate({
      name,
      rating,
      comment,
    });
  };

  return (
    <main className="painting-detail-page">
      <button
        className="detail-back-button"
        onClick={() => navigate("/")}
      >
        ← Back to Gallery
      </button>

      <section className="painting-detail-container">
        <div className="painting-detail-image">
          <img src={imageUrl} alt={painting.title} />
        </div>

        <div className="painting-detail-info">
          <p className="eyebrow">{painting.category}</p>

          <h1>{painting.title}</h1>

          <p className="painting-detail-artist">
            By {painting.artist}
          </p>

          <h2>{formatPrice(painting.price)}</h2>

          <p className="painting-detail-stock">
            {painting.stock > 0
              ? `${painting.stock} available`
              : "Out of stock"}
          </p>

          <div className="painting-detail-description">
            <h3>About This Artwork</h3>
            <p>
              {painting.description || "No description available."}
            </p>
          </div>

          <button
            className="checkout-button"
            disabled={painting.stock <= 0}
            onClick={() => addToCart(painting)}
          >
            Add to Cart
          </button>
        </div>
      </section>

      <section className="painting-reviews-section">
        <div className="reviews-heading">
          <h2>Customer Reviews</h2>

          <div className="reviews-summary">
            <span className="average-rating">
              {Number(averageRating).toFixed(1)}
            </span>

            <div>
              <div className="review-stars">
                {"★".repeat(Math.round(averageRating))}
                {"☆".repeat(5 - Math.round(averageRating))}
              </div>

              <p>{totalReviews} customer reviews</p>
            </div>
          </div>
        </div>

        <form
          className="review-form"
          onSubmit={handleSubmitReview}
        >
          <h3>Write a Review</h3>

          <label htmlFor="review-name">Your Name</label>
          <input
            id="review-name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={255}
            required
          />

          <label>Your Rating</label>
          <div className="rating-selector">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={star <= rating ? "active" : ""}
                onClick={() => setRating(star)}
                aria-label={`Give ${star} stars`}
              >
                ★
              </button>
            ))}
          </div>

          <label htmlFor="review-comment">Your Review</label>
          <textarea
            id="review-comment"
            placeholder="Share your thoughts about this artwork..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={4}
          />

          {reviewMutation.isError && (
            <p className="review-error">
              {reviewMutation.error?.response?.data?.message ||
                "Failed to submit review. Please try again."}
            </p>
          )}

          {reviewMutation.isSuccess && (
            <p className="review-success">
              Review submitted successfully!
            </p>
          )}

          <button
            type="submit"
            className="submit-review-button"
            disabled={reviewMutation.isPending}
          >
            {reviewMutation.isPending
              ? "Submitting..."
              : "Submit Review"}
          </button>
        </form>

        <div className="reviews-list">
          <h3>Recent Reviews</h3>

          {reviewsLoading && <p>Loading reviews...</p>}

          {reviewsError && (
            <p>Failed to load reviews. Please refresh the page.</p>
          )}

          {!reviewsLoading &&
            !reviewsError &&
            reviews.length === 0 && (
              <p className="empty-reviews">
                No reviews yet. Be the first to review this artwork!
              </p>
            )}

          {reviews.map((review) => (
            <article className="review-card" key={review.id}>
              <div className="review-card-header">
                <h4>{review.name}</h4>

                <span className="review-card-stars">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </span>
              </div>

              <p>{review.comment}</p>

              <small>
                {new Date(review.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </small>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
