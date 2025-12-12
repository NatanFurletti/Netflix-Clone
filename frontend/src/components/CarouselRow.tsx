import React, { useRef } from "react";
import MovieCard from "./MovieCard";

const scrollAmount = 650; // default scroll amount for arrow

type Item = {
  fileName?: string;
  source?: string;
  title: string;
  poster?: string;
};

const CarouselRow: React.FC<{ title?: string; items: Item[] }> = ({
  title,
  items,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  function handleLeft() {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth || scrollAmount;
    containerRef.current.scrollBy({ left: -Math.max(scrollAmount, width * 0.8), behavior: "smooth" });
  }

  function handleRight() {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth || scrollAmount;
    containerRef.current.scrollBy({ left: Math.max(scrollAmount, width * 0.8), behavior: "smooth" });
  }

  return (
    <div className="movie-row relative">
      {title && <h2 className="row-title">{title}</h2>}
      <button className="carousel-arrow left" onClick={handleLeft} aria-label="Left">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div ref={containerRef} className="movies-container carousel-track" role="list" aria-label={title}>
        {items.map((m, i) => (
          <MovieCard key={(m.fileName || m.source || m.title || i).toString()} movie={m as any} />
        ))}
      </div>
      <button className="carousel-arrow right" onClick={handleRight} aria-label="Right">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};

export default CarouselRow;
