import api from './api';

export const getProfiles = (userId) => api.get(`/users/${userId}/profiles`);
export const createProfile = (userId, data) => api.post(`/users/${userId}/profiles`, data);
export const updateProfile = (profileId, data) => api.put(`/profiles/${profileId}`, data);
export const deleteProfile = (profileId) => api.delete(`/profiles/${profileId}`);
