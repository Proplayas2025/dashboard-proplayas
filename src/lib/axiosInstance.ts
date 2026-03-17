"use client";
import axios from "axios";
import { V_Global_API, system } from "./system";
import { getCookie } from "./cookies";

console.log("API URL en build:", process.env.NEXT_PUBLIC_API_URL)
// el global api es "http://localhost:8080/api/"
const axiosInstance = axios.create({
  baseURL: V_Global_API,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = system.authToken;
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Solo añade el XSRF-TOKEN si NO es login
    const xsrfToken = getCookie("XSRF-TOKEN");
    if (xsrfToken) {
      config.headers["X-XSRF-TOKEN"] = decodeURIComponent(xsrfToken);
    }

    return config;
  },

  (error) => Promise.reject(error)
);

export default axiosInstance;