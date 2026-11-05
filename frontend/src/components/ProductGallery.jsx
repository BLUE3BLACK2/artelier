
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPaintings } from "../services/paintingService";
import ProductCard from "./ProductCard";

export default function ProductGallery({ onAddToCart }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["paintings", search, activeCategory, currentPage],
    queryFn: () =>
      getPaintings({
        search,
        category: activeCategory === "All" ? "" : activeCategory,
        page: currentPage,
      }),
  });

  const paintings = data?.data || [];
  const lastPage = data?.last_page || 1;

  const categories = [
    "All",
    "Landscape",
    "Seascape",
    "Portrait",
    "Abstract",
    "Still Life",
    "Contemporary",
  ];

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-topline">
        <span>THE ARTELIER COLLECTION</span>
        <span>01 — CURATED ARTWORKS</span>
      </div>

      <div className="section-heading">
        <div>
          <p className="eyebrow">DISCOVER SOMETHING BEAUTIFUL</p>
          <h2>
            Art worth
            <br />
            <span>living with.</span>
          </h2>
        </div>

        <p className="gallery-description">
          A thoughtfully selected collection of artworks
          chosen to bring emotion, character, and inspiration
          into your everyday surroundings.
        </p>
      </div>

      <div className="gallery-toolbar">
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="gallery-search">
          <span>⌕</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search artworks..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="gallery-result-info">
        <span>
          {isLoading
            ? "Discovering artworks..."
            : `${paintings.length} artworks displayed`}
        </span>
        <span>COLLECTION / {String(currentPage).padStart(2, "0")}</span>
      </div>

      {isLoading ? (
        <p className="empty-message">Loading artworks...</p>
      ) : isError ? (
        <p className="empty-message">
          Failed to load artworks. Please try again.
        </p>
      ) : paintings.length > 0 ? (
        <>
          <div className="product-grid">
            {paintings.map((painting, index) => (
              <ProductCard
                key={painting.id}
                painting={painting}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          {lastPage > 1 && (
            <div className="pagination">
              <button
                className="filter-button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
              >
                ← Previous
              </button>

              <span>
                {String(currentPage).padStart(2, "0")} /{" "}
                {String(lastPage).padStart(2, "0")}
              </span>

              <button
                className="filter-button"
                disabled={currentPage === lastPage}
                onClick={() => setCurrentPage((page) => page + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="empty-message">
          No artworks found. Try another search.
        </p>
      )}
    </section>
  );
}
