import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { getProfiles, createProfile } from '../services/profileService';
import Spinner from '../components/Spinner';

export default function Profiles() {
  const { user, selectProfile } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getProfiles(user.id)
      .then(({ data }) => setProfiles(data))
      .catch(() => setError('Erro ao carregar perfis.'))
      .finally(() => setLoading(false));
  }, [user.id]);

  const handleSelect = (profile) => {
    selectProfile(profile);
    navigate('/browse');
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      const { data } = await createProfile(user.id, { name: newName });
      setProfiles((prev) => [...prev, data]);
      setNewName('');
      setAdding(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao criar perfil.');
    }
  };

  if (loading) return <div className="min-h-screen bg-netflix-black flex items-center justify-center"><Spinner /></div>;

  return (
    <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center px-4">
      <span className="text-netflix-red font-bold text-3xl tracking-widest mb-10">NETFLIX</span>
      <h1 className="text-white text-3xl font-semibold mb-10">Quem está assistindo?</h1>

      {error && <p className="text-netflix-red mb-4">{error}</p>}

      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {profiles.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelect(p)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-24 h-24 bg-gray-700 rounded flex items-center justify-center group-hover:ring-2 group-hover:ring-white transition-all">
              <FiUser className="text-white text-4xl" />
            </div>
            <span className="text-gray-400 group-hover:text-white text-sm transition-colors">{p.name}</span>
          </button>
        ))}

        {profiles.length < 5 && (
          <button
            onClick={() => setAdding(true)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-24 h-24 bg-gray-800 border-2 border-dashed border-gray-600 rounded flex items-center justify-center group-hover:border-white transition-all">
              <FiPlus className="text-gray-400 group-hover:text-white text-4xl" />
            </div>
            <span className="text-gray-400 group-hover:text-white text-sm">Adicionar</span>
          </button>
        )}
      </div>

      {adding && (
        <form onSubmit={handleCreate} className="flex gap-3">
          <input
            autoFocus
            type="text"
            placeholder="Nome do perfil"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-netflix-red"
          />
          <button type="submit" className="bg-netflix-red text-white px-4 py-2 rounded hover:bg-red-700">
            Criar
          </button>
          <button type="button" onClick={() => setAdding(false)} className="text-gray-400 hover:text-white px-2">
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
}
