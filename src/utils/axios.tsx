import axios, { AxiosError, HttpStatusCode } from "axios";
import { useAuthentication } from "contexts";

const baseURL = "http://localhost:4000";

export const API = axios.create({ baseURL, withCredentials: true });

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
