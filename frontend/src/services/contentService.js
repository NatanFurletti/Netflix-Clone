import api from './api';

export const getContent = (params) => api.get('/content', { params });
export const getFeatured = () => api.get('/content/featured');
export const getTrending = () => api.get('/content/trending');
export const getContentById = (id) => api.get(`/content/${id}`);
export const getGenres = () => api.get('/genres');
export const getContentByGenre = (genreId, params) =>
  api.get(`/genres/${genreId}/content`, { params });
