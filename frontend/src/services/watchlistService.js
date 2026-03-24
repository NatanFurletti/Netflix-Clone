import api from './api';

export const getWatchlist = (userId) => api.get(`/users/${userId}/watchlist`);
export const addToWatchlist = (userId, contentId) =>
  api.post(`/users/${userId}/watchlist`, { contentId });
export const removeFromWatchlist = (userId, contentId) =>
  api.delete(`/users/${userId}/watchlist/${contentId}`);
