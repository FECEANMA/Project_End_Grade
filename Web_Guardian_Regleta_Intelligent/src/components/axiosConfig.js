// src/components/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.10.1.136:4000',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
