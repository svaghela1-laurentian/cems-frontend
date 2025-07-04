import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://cems-backend.onrender.com/api",
});

// Add a request interceptor to attach JWT if available
api.interceptors.request.use(
  (config) => {
    console.log("Request made with ", config);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
