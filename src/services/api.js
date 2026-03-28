import axios from 'axios';

const API_BASE_URL = "https://fitness-monolith-u4so.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Activity endpoints
export const activityAPI = {
  getAll: (userId) => api.get('/activities', {
    headers: { 'X-User-ID': userId }
  }),
  create: (activityData) => api.post('/activities', activityData),
};

// Recommendation endpoints
export const recommendationAPI = {
  getUserRecommendations: (userId) => api.get(`/recommendation/user/${userId}`),
  getActivityRecommendations: (activityId) => api.get(`/recommendation/activity/${activityId}`),
  generate: (data) => api.post('/recommendation/generate', data),
};

export default api;