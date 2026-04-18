import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI || "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});