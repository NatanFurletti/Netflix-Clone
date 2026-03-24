import api from './api';

export const getHistory = (userId) => api.get(`/users/${userId}/history`);
export const recordHistory = (userId, contentId, progress) =>
  api.post(`/users/${userId}/history`, { contentId, progress });
