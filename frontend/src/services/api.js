import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const topicsService = {
    getAll: () => apiClient.get('/topics/'),
    getById: (id) => apiClient.get(`/topics/${id}/`),
    create: (data) => apiClient.post('/topics/', data),
    update: (id, data) => apiClient.put(`/topics/${id}/`, data),
    delete: (id) => apiClient.delete(`/topics/${id}/`),
};

export const notesService = {
    getAll: () => apiClient.get('/notes/'),
    getById: (id) => apiClient.get(`/notes/${id}/`),
    create: (data) => apiClient.post('/notes/', data),
    update: (id, data) => apiClient.put(`/notes/${id}/`, data),
    delete: (id) => apiClient.delete(`/notes/${id}/`),
    generateSummary: (id) => apiClient.post(`/notes/${id}/generate_summary/`),
    suggestTags: (id) => apiClient.post(`/notes/${id}/suggest_tags/`),
    search: (query) => apiClient.get(`/notes/?search=${query}`),
};