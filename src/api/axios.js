import axios from 'axios';
import { useAuthStore } from '../store/authStore.js';

const apiClient = axios.create({
  baseURL: 'https://api-yeshtery.dev.meetusvr.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      localStorage.removeItem('auth_token');
      useAuthStore.getState().clearAuth();
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
