
export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="eyebrow">AN ART GALLERY FOR EVERY SPACE</p>

        <h1>
          Art that
          <br />
          speaks <span>beyond</span>
          <br />
          the canvas.
        </h1>

        <p className="hero-description">
          Discover thoughtfully curated artworks that bring
          character, emotion, and timeless beauty into your space.
        </p>

        <a href="#gallery" className="primary-button">
          Explore Collection <span>↗</span>
        </a>

        <div className="hero-caption">
          <span>01 — 03</span>
          <span>CURATED ARTWORKS</span>
        </div>
      </div>

      <div className="hero-image">
        <div className="hero-artwork-stage">
          <div className="artwork-card artwork-card-back">
            <img
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=700&q=85"
              alt="Classical artwork"
            />
          </div>

          <div className="artwork-card artwork-card-side">
            <img
              src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=700&q=85"
              alt="Abstract artwork"
            />
          </div>

          <div className="artwork-card artwork-card-main">
            <img
              src="https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=85"
              alt="Featured curated artwork"
            />
          </div>

          <div className="artwork-note">
            <span>THE ART OF LIVING</span>
            <span>EST. 2026</span>
          </div>
        </div>

        <p className="hero-image-caption">
          Every piece has a story worth discovering.
        </p>
      </div>
    </section>
  );
}
