import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiPlay, FiPlus, FiCheck, FiArrowLeft } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import ContentRow from '../components/ContentRow';
import Spinner from '../components/Spinner';
import { getContentById, getContentByGenre } from '../services/contentService';
import { useWatchlist } from '../context/WatchlistContext';

export default function ContentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const [content, setContent] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getContentById(id)
      .then(async ({ data }) => {
        setContent(data);
        const simRes = await getContentByGenre(data.genreId, { limit: 8 });
        setSimilar(simRes.data.data.filter((c) => c.id !== data.id));
      })
      .catch(() => navigate('/browse'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen bg-netflix-black flex items-center justify-center"><Spinner /></div>;
  if (!content) return null;

  const inList = isInWatchlist(content.id);

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />

      {/* Banner */}
      <div className="relative w-full h-[60vh] flex items-end pb-10 px-6 md:px-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${content.thumbnailUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-black/40 to-transparent" />
        </div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-20 left-6 text-white hover:text-gray-300 flex items-center gap-1"
        >
          <FiArrowLeft /> Voltar
        </button>
      </div>

      {/* Detalhes */}
      <div className="px-6 md:px-12 -mt-10 relative z-10">
        <h1 className="text-white text-3xl font-bold mb-2">{content.title}</h1>
        <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-4">
          <span className="text-green-400 font-semibold">{content.rating} ★</span>
          <span>{content.releaseYear}</span>
          <span>{content.type === 'MOVIE' ? 'Filme' : 'Série'}</span>
          <span>{content.duration} min</span>
          <span className="text-gray-300">{content.genre?.name}</span>
        </div>
        <p className="text-gray-300 max-w-2xl mb-4">{content.description}</p>
        <p className="text-gray-400 text-sm mb-1"><span className="text-gray-200">Diretor:</span> {content.director}</p>
        <p className="text-gray-400 text-sm mb-6"><span className="text-gray-200">Elenco:</span> {content.actors}</p>

        <div className="flex gap-3 mb-12">
          <button
            onClick={() => navigate(`/watch/${content.id}`)}
            className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-200 transition-colors"
          >
            <FiPlay /> Assistir
          </button>
          <button
            onClick={() => inList ? removeFromWatchlist(content.id) : addToWatchlist(content.id)}
            className="flex items-center gap-2 bg-gray-700 text-white font-semibold px-6 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            {inList ? <FiCheck /> : <FiPlus />} Minha Lista
          </button>
        </div>

        <ContentRow title="Conteúdo Similar" contents={similar} loading={false} />
      </div>
    </div>
  );
}
