import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { getContentById } from '../services/contentService';
import { recordHistory } from '../services/historyService';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

export default function Player() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContentById(id)
      .then(({ data }) => setContent(data))
      .catch(() => navigate('/browse'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!content || !user) return;

    // Registra progresso a cada 30 segundos
    intervalRef.current = setInterval(() => {
      const progress = Math.floor(videoRef.current?.currentTime || 0);
      recordHistory(user.id, content.id, progress).catch(() => {});
    }, 30000);

    return () => clearInterval(intervalRef.current);
  }, [content, user]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><Spinner /></div>;
  if (!content) return null;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Barra superior */}
      <div className="flex items-center gap-4 px-6 py-4 bg-black/80 absolute top-0 left-0 right-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:text-gray-300 flex items-center gap-2"
        >
          <FiArrowLeft size={20} /> Voltar
        </button>
        <span className="text-white font-semibold">{content.title}</span>
      </div>

      {/* Player nativo HTML5 */}
      <video
        ref={videoRef}
        src={content.videoUrl}
        controls
        autoPlay
        className="w-full h-screen object-contain"
        aria-label={`Reproduzindo: ${content.title}`}
      />
    </div>
  );
}
