import axios from "axios";

export const api = axios.create({
  baseURL: "",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  const isAuthRequest =
    config.url?.includes("/auth/oauth") ||
    config.url?.includes("/auth/dev/login") ||
    config.url?.includes("/auth/reissue");

  if (accessToken && !isAuthRequest) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
