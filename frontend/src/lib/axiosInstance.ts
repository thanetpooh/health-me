import axios from 'axios';

const base = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: 'http://127.0.0.1:8080/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
