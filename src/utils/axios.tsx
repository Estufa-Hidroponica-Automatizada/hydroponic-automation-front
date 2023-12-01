import axios, { AxiosError, HttpStatusCode } from "axios";
import { useAuthentication } from "contexts";

const baseURL =
  window.location.hostname === "192.168.15.10"
    ? "http://192.168.15.10:4000"
    : "http://estufa.ddns.net:4000";

export const API = axios.create({ baseURL, withCredentials: true });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { logout } = useAuthentication();

    if (error.response?.status === HttpStatusCode.Unauthorized) {
      logout();
    }

    return Promise.reject(error);
  }
);
