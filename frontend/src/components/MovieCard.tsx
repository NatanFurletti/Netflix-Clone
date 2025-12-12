import React from "react";

import { Link } from "react-router-dom";

type Movie = {
	id?: number;
	fileName?: string;
	source?: string;
	title: string;
	poster?: string;
	overview?: string;
};

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
	const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		e.currentTarget.src = `https://via.placeholder.com/300x450/2b2b2b/ffffff?text=${encodeURIComponent(
			movie.title
		)}`;
	};
	const posterSrc = movie.poster || `https://via.placeholder.com/300x450/2b2b2b/ffffff?text=${encodeURIComponent(movie.title)}`;
	return (
		<div className="movie-card-container relative group">
			<img
				src={posterSrc}
				onError={handleImageError}
				alt={movie.title}
				className="movie-poster rounded"
			/>

			<div className="movie-info">
				<div className="movie-title">{movie.title}</div>
				{movie.overview && (
					<p className="text-sm text-gray-300 hidden md:block">{movie.overview}</p>
				)}
			</div>

			{movie.fileName || movie.source ? (
				<Link
					to={`/movies?${
						movie.source
							? `src=${encodeURIComponent(movie.source)}&title=${encodeURIComponent(movie.title)}`
							: `fileName=${encodeURIComponent(movie.fileName || "")}`
					}`}
					className="block"
				>
					<button
						className="play-button absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
						aria-label={`Play ${movie.title}`}
					>
						<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
							<path d="M8 5v14l11-7z" />
						</svg>
					</button>
				</Link>
			) : (
				<button
					className="play-button absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
					aria-label={`Play ${movie.title}`}
				>
					▶
				</button>
			)}
		</div>
	);
};

export default MovieCard;
