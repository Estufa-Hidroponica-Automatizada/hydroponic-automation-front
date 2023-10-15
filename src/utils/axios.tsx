import axios, { AxiosError, HttpStatusCode } from "axios";
import { AuthContext } from "contexts";
import { useContext } from "react";

// use when connected on external network
const baseURL = "https://187.74.126.188:4000";

// use when connected on same network
// const baseURL = "https://192.168.15.10:4000";

// use when connected on rasp
// const baseURL = "https://localhost:4000";

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
