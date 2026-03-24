import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ContentRow from '../components/ContentRow';
import { getFeatured, getTrending, getContent, getGenres, getContentByGenre } from '../services/contentService';

export default function Browse() {
  const [featured, setFeatured] = useState(null);
  const [trending, setTrending] = useState([]);
  const [recent, setRecent] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreContents, setGenreContents] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [featuredRes, trendingRes, recentRes, genresRes] = await Promise.all([
          getFeatured(),
          getTrending(),
          getContent({ limit: 10 }),
          getGenres(),
        ]);

        setFeatured(featuredRes.data);
        setTrending(trendingRes.data);
        setRecent(recentRes.data.data);
        setGenres(genresRes.data);

        // Carrega conteúdo dos primeiros 4 gêneros
        const top4 = genresRes.data.slice(0, 4);
        const results = await Promise.all(
          top4.map((g) => getContentByGenre(g.id, { limit: 10 }))
        );
        const map = {};
        top4.forEach((g, i) => { map[g.id] = results[i].data.data; });
        setGenreContents(map);
      } catch (_) {}
      finally { setLoading(false); }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      <HeroSection content={featured} />
      <div className="pb-16">
        <ContentRow title="Em Alta" contents={trending} loading={loading} />
        <ContentRow title="Lançamentos" contents={recent} loading={loading} />
        {genres.slice(0, 4).map((g) => (
          <ContentRow
            key={g.id}
            title={g.name}
            contents={genreContents[g.id] || []}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
}
