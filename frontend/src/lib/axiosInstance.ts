import axios from 'axios';

const base = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: base ? `${base}/api` : '/api',
  withCredentials: true,
});

console.log('the base', base);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
