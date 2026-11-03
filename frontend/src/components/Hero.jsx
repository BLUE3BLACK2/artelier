
export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="eyebrow">ART FOR YOUR SPACE</p>

        <h1>
          Make room for
          <br />
          <span>beautiful art.</span>
        </h1>

        <p className="hero-description">
          Discover original-inspired artworks that bring
          character, warmth, and meaning to your space.
        </p>

        <a href="#gallery" className="primary-button">
          Explore Collection
        </a>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=80"
          alt="Artwork displayed in an art gallery"
        />
        <p>Art is a way of seeing.</p>
      </div>
    </section>
  );
}
