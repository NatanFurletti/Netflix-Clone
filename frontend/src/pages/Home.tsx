import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
// import MovieCard from "../components/MovieCard";
import CarouselRow from "../components/CarouselRow";
import "../App.css";

type MovieItem = {
  fileName?: string;
  source?: string;
  title: string;
  poster?: string;
};


const Home: React.FC = () => {
  const [videos, setVideos] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get<MovieItem[]>('http://localhost:3333/api/videos');
        setVideos(res.data || []);
      } catch (e) {
        console.error('Could not fetch videos', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="app-container">
      <Header />

      <section className="hero-section">
        <div
          className="hero-background"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="hero-gradient" />
        <div className="hero-content">
          <h1 className="hero-title">Filmes, séries e muito mais.</h1>
          <p className="hero-description">Assista onde quiser. Cancele quando quiser.</p>
          <div className="hero-buttons">
            <button className="btn-netflix">Assistir</button>
            <button className="btn-secondary">Minha lista</button>
          </div>
        </div>
      </section>

      <main className="py-6">
        {loading ? (
          <div className="loading-spinner" />
        ) : (
          <>
            <CarouselRow title="Em alta" items={videos} />
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
