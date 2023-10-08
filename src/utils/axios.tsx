import axios, { AxiosError, HttpStatusCode } from "axios";
import { AuthContext } from "contexts";
import { useContext } from "react";

const baseURL = "https://189.18.228.108:4000"; // externalURL
// const baseURL = "https://192.168.15.10:4000"; // localURL
// const baseURL = "https://localhost:4000"; // raspURL

export const API = axios.create({ baseURL, withCredentials: true });

API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { setIsAuthenticated } = useContext(AuthContext);

    if (error.response?.status === HttpStatusCode.Unauthorized) {
      setIsAuthenticated(false);
    }

    return Promise.reject(error);
  }
);
