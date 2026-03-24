import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlay } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import { useWatchlist } from '../context/WatchlistContext';

export default function MyList() {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      <div className="pt-24 px-6 md:px-12">
        <h1 className="text-white text-2xl font-bold mb-8">Minha Lista</h1>

        {watchlist.length === 0 ? (
          <p className="text-gray-400">Sua lista está vazia. Adicione conteúdos para assistir depois.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {watchlist.map(({ content }) => (
              <div key={content.id} className="relative group cursor-pointer rounded overflow-hidden">
                <img
                  src={content.thumbnailUrl}
                  alt={content.title}
                  className="w-full h-36 object-cover group-hover:scale-105 transition-transform"
                  onClick={() => navigate(`/content/${content.id}`)}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => navigate(`/watch/${content.id}`)}
                    className="bg-white text-black rounded-full p-2 hover:bg-gray-200"
                    aria-label="Assistir"
                  >
                    <FiPlay />
                  </button>
                  <button
                    onClick={() => removeFromWatchlist(content.id)}
                    className="bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600"
                    aria-label="Remover da lista"
                  >
                    <FiTrash2 />
                  </button>
                </div>
                <p className="text-white text-xs mt-1 truncate px-1">{content.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
