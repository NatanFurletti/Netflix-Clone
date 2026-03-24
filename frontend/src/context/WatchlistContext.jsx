import { createContext, useContext, useState, useEffect } from 'react';
import * as watchlistService from '../services/watchlistService';
import { useAuth } from './AuthContext';

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) fetchWatchlist();
  }, [user]);

  const fetchWatchlist = async () => {
    try {
      const { data } = await watchlistService.getWatchlist(user.id);
      setWatchlist(data);
    } catch (_) {}
  };

  const addToWatchlist = async (contentId) => {
    await watchlistService.addToWatchlist(user.id, contentId);
    await fetchWatchlist();
  };

  const removeFromWatchlist = async (contentId) => {
    await watchlistService.removeFromWatchlist(user.id, contentId);
    setWatchlist((prev) => prev.filter((item) => item.contentId !== contentId));
  };

  const isInWatchlist = (contentId) =>
    watchlist.some((item) => item.contentId === contentId);

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => useContext(WatchlistContext);
