import { useNavigate } from 'react-router-dom';
import { FiPlay, FiPlus, FiCheck } from 'react-icons/fi';
import { useWatchlist } from '../context/WatchlistContext';

export default function ContentCard({ content }) {
  const navigate = useNavigate();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inList = isInWatchlist(content.id);

  const handleWatchlist = async (e) => {
    e.stopPropagation();
    inList ? await removeFromWatchlist(content.id) : await addToWatchlist(content.id);
  };

  return (
    <div
      className="relative flex-shrink-0 w-40 md:w-48 cursor-pointer group rounded overflow-hidden"
      onClick={() => navigate(`/content/${content.id}`)}
    >
      <img
        src={content.thumbnailUrl}
        alt={content.title}
        className="w-full h-28 md:h-32 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {/* Overlay ao hover */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
        <p className="text-white text-xs font-semibold truncate">{content.title}</p>
        <div className="flex gap-2 mt-1">
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/watch/${content.id}`); }}
            className="bg-white text-black rounded-full p-1 hover:bg-gray-200"
            aria-label="Assistir"
          >
            <FiPlay size={12} />
          </button>
          <button
            onClick={handleWatchlist}
            className="border border-gray-400 text-white rounded-full p-1 hover:border-white"
            aria-label={inList ? 'Remover da lista' : 'Adicionar à lista'}
          >
            {inList ? <FiCheck size={12} /> : <FiPlus size={12} />}
          </button>
        </div>
      </div>
    </div>
  );
}
