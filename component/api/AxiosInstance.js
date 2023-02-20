import axios from "axios";
import Constants from "expo-constants";

export const baseURL = Constants.manifest?.extra?.API_URL;
// export const baseURL = "http://localhost:5000/api"

const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = AsyncStorage.getItem("token");
    if (token) {
      config.headers["access-token"] = token;
      // config.headers["Access-Control-Allow-Origin"] = "*";
      // config.headers["Access-Control-Allow-Credentials"] = "true";
      config.headers["Content-Type"] = "application/json";
      config.headers["accept"] = "application/json";
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("refresh_token");
    if (
      refreshToken &&
      error.response.status === 401 &&
      error.response.data.detail ===
        "Given token not valid for any token type" &&
      !originalRequest._retry
    ) {
      try {
        const response = await axiosInstance.post("/auth/token/refresh/", {
          refresh: refreshToken,
        });
        const access_token = response.data.access;
        localStorage.setItem("access_token", access_token);
        return axiosInstance(originalRequest);
      } catch (err) {
        console.log(err.response.data.code);
        if (err.response.data.code === "token_not_valid") {
          localStorage.clear();
          window.location.reload();
        }
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
