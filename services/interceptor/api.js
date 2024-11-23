import axios from 'axios';
import { API } from "@/config/constants";


// Create axios instance with interceptors
const axiosInstance = axios.create({
   baseURL: "https://wordstoo-back.onrender.com",
   //baseURL:"http://localhost:8000",
  
  headers: {
    'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*'
  },
});

// Request interceptor to add token if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log("Aca esta el token", token)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors without token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if ((error.response && (error.response.status === 401 || error.response.status === 403)) && !originalRequest._retry) {
      console.log("Token inválido o expirado, pero no se renovará.");
      
      // Aquí simplemente retornamos el error sin intentar renovar el token
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
