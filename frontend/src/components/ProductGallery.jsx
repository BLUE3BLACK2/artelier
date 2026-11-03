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
      <div className="section-heading">
        <div>
          <p className="eyebrow">CURATED FOR YOU</p>
          <h2>Explore the collection</h2>
        </div>

        <p>Artworks to make your space feel like yours.</p>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search artwork or artist..."
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setCurrentPage(1);
        }}
      />

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

      {isLoading ? (
        <p className="empty-message">Loading artworks...</p>
      ) : isError ? (
        <p className="empty-message">
          Failed to load artworks. Please try again.
        </p>
      ) : paintings.length > 0 ? (
        <>
          <div className="product-grid">
            {paintings.map((painting) => (
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
                Previous
              </button>

              <span>
                Page {currentPage} of {lastPage}
              </span>

              <button
                className="filter-button"
                disabled={currentPage === lastPage}
                onClick={() => setCurrentPage((page) => page + 1)}
              >
                Next
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