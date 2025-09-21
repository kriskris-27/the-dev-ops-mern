import axios from 'axios';
import { User, Task, CreateUserData, CreateTaskData, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ API Error: ${error.response?.status} ${error.config?.url}`, error.response?.data);
    return Promise.reject(error);
  }
);

// User API
export const userApi = {
  getUsers: (): Promise<ApiResponse<User[]>> => 
    api.get('/users').then(res => res.data),
  
  getUserById: (id: string): Promise<ApiResponse<User>> => 
    api.get(`/users/${id}`).then(res => res.data),
  
  createUser: (userData: CreateUserData): Promise<ApiResponse<User>> => 
    api.post('/users', userData).then(res => res.data),
  
  updateUser: (id: string, userData: Partial<CreateUserData>): Promise<ApiResponse<User>> => 
    api.put(`/users/${id}`, userData).then(res => res.data),
  
  deleteUser: (id: string): Promise<ApiResponse<null>> => 
    api.delete(`/users/${id}`).then(res => res.data),
};

// Task API
export const taskApi = {
  getTasks: (): Promise<ApiResponse<Task[]>> => 
    api.get('/tasks').then(res => res.data),
  
  getTaskById: (id: string): Promise<ApiResponse<Task>> => 
    api.get(`/tasks/${id}`).then(res => res.data),
  
  getTasksByUser: (userId: string): Promise<ApiResponse<Task[]>> => 
    api.get(`/tasks/user/${userId}`).then(res => res.data),
  
  createTask: (taskData: CreateTaskData): Promise<ApiResponse<Task>> => 
    api.post('/tasks', taskData).then(res => res.data),
  
  updateTask: (id: string, taskData: Partial<CreateTaskData>): Promise<ApiResponse<Task>> => 
    api.put(`/tasks/${id}`, taskData).then(res => res.data),
  
  deleteTask: (id: string): Promise<ApiResponse<null>> => 
    api.delete(`/tasks/${id}`).then(res => res.data),
};

// Health check
export const healthApi = {
  check: (): Promise<{ status: string; timestamp: string; uptime: number; environment: string }> => 
    api.get('/health').then(res => res.data),
};

export default api;
