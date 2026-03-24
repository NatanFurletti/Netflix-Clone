import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';
import PrivateRoute from './components/PrivateRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Profiles from './pages/Profiles';
import Browse from './pages/Browse';
import ContentDetail from './pages/ContentDetail';
import Player from './pages/Player';
import MyList from './pages/MyList';
import Search from './pages/Search';

// Redireciona usuário autenticado para /browse
function PublicRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/browse" replace /> : children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/browse" replace />} />

      {/* Rotas públicas */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      {/* Rotas protegidas */}
      <Route path="/profiles" element={<PrivateRoute><Profiles /></PrivateRoute>} />
      <Route path="/browse" element={<PrivateRoute><WatchlistProvider><Browse /></WatchlistProvider></PrivateRoute>} />
      <Route path="/content/:id" element={<PrivateRoute><WatchlistProvider><ContentDetail /></WatchlistProvider></PrivateRoute>} />
      <Route path="/watch/:id" element={<PrivateRoute><Player /></PrivateRoute>} />
      <Route path="/mylist" element={<PrivateRoute><WatchlistProvider><MyList /></WatchlistProvider></PrivateRoute>} />
      <Route path="/search" element={<PrivateRoute><WatchlistProvider><Search /></WatchlistProvider></PrivateRoute>} />

      <Route path="*" element={<Navigate to="/browse" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
