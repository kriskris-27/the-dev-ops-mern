import axios from "axios";

const api = axios.create({
  baseURL: "http://mern-backend:5000/api", // backend URL
  withCredentials: true,                
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
