import { useNavigate } from 'react-router-dom';
import { FiPlay, FiPlus, FiCheck } from 'react-icons/fi';
import { useWatchlist } from '../context/WatchlistContext';

export default function HeroSection({ content }) {
  const navigate = useNavigate();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  if (!content) return null;

  const inList = isInWatchlist(content.id);

  return (
    <div className="relative w-full h-[70vh] flex items-end pb-16 px-6 md:px-12">
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${content.thumbnailUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/80 to-transparent" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 max-w-xl">
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-3">{content.title}</h1>
        <p className="text-gray-300 text-sm md:text-base line-clamp-3 mb-5">{content.description}</p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/watch/${content.id}`)}
            className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-200 transition-colors"
          >
            <FiPlay /> Assistir
          </button>
          <button
            onClick={() => inList ? removeFromWatchlist(content.id) : addToWatchlist(content.id)}
            className="flex items-center gap-2 bg-gray-600/70 text-white font-semibold px-6 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            {inList ? <FiCheck /> : <FiPlus />} Minha Lista
          </button>
        </div>
      </div>
    </div>
  );
}
