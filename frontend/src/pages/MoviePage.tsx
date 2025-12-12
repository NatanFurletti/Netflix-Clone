import React from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';

const MoviePage: React.FC = () => {
  // Pega o parâmetro "fileName" da URL, ex: /movies/my-movie.mp4
  const [searchParams] = useSearchParams();
  const fileName = searchParams.get('fileName');
  const src = searchParams.get('src');

  if (!fileName && !src) {
    return <div>Filme não encontrado.</div>;
  }

  // If `src` is provided (remote URL), use it; otherwise fall back to backend streaming
  const videoSrc = src || `http://localhost:3333/api/videos/${fileName}/stream`;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Assistindo: {fileName}</h1>
      <VideoPlayer src={videoSrc} />
    </div>
  );
};

export default MoviePage;
