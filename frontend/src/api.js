import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3014', // URL бекенда
});

// Добавляем токен авторизации, если есть
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Функции для проектов
export const getProjects = () => api.get('/projects');
export const createProject = (data) => api.post('/projects', data);
export const getProjectById = (id) => api.get(`/projects/${id}`);
export const updateProject = (id, data) => api.patch(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Функции для лайков проектов
export const getProjectLikes = (projectId) => api.get(`/project-likes/project/${projectId}`);
export const createProjectLike = (data) => api.post('/project-likes', data);
export const deleteProjectLike = (id) => api.delete(`/project-likes/${id}`);

export default api;