import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/profiles');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao fazer login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black/75 rounded-lg p-10">
        <span className="block text-netflix-red font-bold text-3xl tracking-widest mb-8">NETFLIX</span>
        <h1 className="text-white text-2xl font-bold mb-6">Entrar</h1>

        {error && (
          <div className="bg-netflix-red/20 border border-netflix-red text-white text-sm rounded p-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-700 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-netflix-red"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-700 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-netflix-red"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-netflix-red text-white font-semibold py-3 rounded hover:bg-red-700 transition-colors disabled:opacity-60"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-6">
          Novo por aqui?{' '}
          <Link to="/register" className="text-white hover:underline">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}
