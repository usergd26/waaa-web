import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';
const api: AxiosInstance = axios.create({
  baseURL : 'https://waaa-api.onrender.com',
  //baseURL: 'https://localhost:44388',
  timeout: 20000,
});

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out');
    }
    return Promise.reject(error);
  }
);

export default api;
