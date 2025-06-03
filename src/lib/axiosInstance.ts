import axios from "axios";
import { V_Global_API, system } from "./system";
import { getCookie } from "./cookies";

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
    const url = config.url || "";
    const isLogin = url.endsWith("/login") || url.endsWith("login");
    if(isLogin)console.log("XSRF-TOKEN found:", getCookie("XSRF-TOKEN"));
    if (!isLogin) {
      const xsrfToken = getCookie("XSRF-TOKEN");
      if (xsrfToken) {        
        config.headers["X-XSRF-TOKEN"] = decodeURIComponent(xsrfToken);
      }
    }
    return config;
  },

  (error) => Promise.reject(error)
);

export default axiosInstance;