import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
      {/* Logo */}
      <div className="flex items-center gap-8">
        <Link to="/browse">
          <span className="text-netflix-red font-bold text-2xl tracking-widest">NETFLIX</span>
        </Link>
        <div className="hidden md:flex gap-4 text-sm text-gray-300">
          <Link to="/browse" className="hover:text-white transition-colors">Início</Link>
          <Link to="/browse?type=SERIES" className="hover:text-white transition-colors">Séries</Link>
          <Link to="/browse?type=MOVIE" className="hover:text-white transition-colors">Filmes</Link>
          <Link to="/mylist" className="hover:text-white transition-colors">Minha Lista</Link>
        </div>
      </div>

      {/* Ações */}
      <div className="flex items-center gap-4">
        <Link to="/search" aria-label="Pesquisar">
          <FiSearch className="text-white text-xl hover:text-gray-300 cursor-pointer" />
        </Link>
        <FiBell className="text-white text-xl hover:text-gray-300 cursor-pointer" />
        <div className="relative">
          <FiUser
            className="text-white text-xl cursor-pointer"
            onClick={() => setShowMenu((v) => !v)}
          />
          {showMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-netflix-black border border-gray-700 rounded shadow-lg">
              <Link
                to="/profiles"
                className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => setShowMenu(false)}
              >
                Perfis
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
