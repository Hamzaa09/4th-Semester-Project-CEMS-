import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URI,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI,
  headers: { "Content-Type": "application/json" },
  // ✅ remove withCredentials
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
