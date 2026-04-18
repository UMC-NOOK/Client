// src/api/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
  withCredentials: true,
});


api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  console.log("accessToken from localStorage:", accessToken);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  console.log("Authorization header:", config.headers.Authorization);
  return config;
});