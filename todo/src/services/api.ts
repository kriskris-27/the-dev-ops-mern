import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000, // 10 second timeout
  });

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("❌ API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses and errors
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("❌ API Response Error:", error.response?.data || error.message);
    
    // Handle different error scenarios
    if (error.response?.status === 404) {
      console.error("🔍 Resource not found");
    } else if (error.response?.status === 500) {
      console.error("💥 Server error");
    } else if (error.code === 'ECONNABORTED') {
      console.error("⏰ Request timeout");
    } else if (!error.response) {
      console.error("🌐 Network error - check your connection");
    }
    
    return Promise.reject(error);
  }
);
  
export default api;
