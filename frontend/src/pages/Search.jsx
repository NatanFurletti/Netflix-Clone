import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import { getContent } from '../services/contentService';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    // Debounce de 400ms conforme especificado
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await getContent({ search: query, limit: 40 });
        setResults(data.data);
        setSearched(true);
      } catch (_) {}
      finally { setLoading(false); }
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      <div className="pt-24 px-6 md:px-12">
        {/* Barra de pesquisa */}
        <div className="flex items-center gap-3 bg-gray-800 rounded px-4 py-3 max-w-xl mb-8">
          <FiSearch className="text-gray-400 text-xl" />
          <input
            autoFocus
            type="text"
            placeholder="Títulos, pessoas, gêneros"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent text-white flex-1 focus:outline-none"
          />
        </div>

        {loading && <Spinner />}

        {!loading && searched && results.length === 0 && (
          <p className="text-gray-400">Nenhum resultado para "{query}".</p>
        )}

        {!loading && results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.map((content) => (
              <div
                key={content.id}
                className="cursor-pointer group rounded overflow-hidden"
                onClick={() => navigate(`/content/${content.id}`)}
              >
                <img
                  src={content.thumbnailUrl}
                  alt={content.title}
                  className="w-full h-36 object-cover group-hover:scale-105 transition-transform"
                />
                <p className="text-white text-xs mt-1 truncate">{content.title}</p>
                <p className="text-gray-400 text-xs">{content.genre?.name} · {content.releaseYear}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
