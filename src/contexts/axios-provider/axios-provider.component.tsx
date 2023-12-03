import { notification } from "antd";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { useAuthentication } from "contexts/auth-provider";
import { PropsWithChildren, createContext, useContext } from "react";
import { endpoints } from "utils";
import { IAxiosContext } from "./types";

const baseURL =
  window.location.hostname === "192.168.15.10"
    ? "http://192.168.15.10:4000"
    : "http://estufa.ddns.net:4000";

const AxiosContext = createContext<IAxiosContext>({} as IAxiosContext);

export const AxiosProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const API = axios.create({ baseURL, withCredentials: true });
  const { logout } = useAuthentication();

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
      const isExpired =
        ![endpoints.auth.login, endpoints.auth.changePassword].includes(
          error.config?.url ?? ""
        ) && error.response?.status === HttpStatusCode.Unauthorized;

      if (isExpired) {
        notification.error({
          message: "Sessão expirada",
          description:
            "Sua sessão expirou, você será redirecionado pra tela de login.",
        });
        logout();
        return Promise.resolve(error);
      }
      return Promise.reject(error);
    }
  );

  return (
    <AxiosContext.Provider value={{ API }}>{children}</AxiosContext.Provider>
  );
};

export const useAxios = () => useContext(AxiosContext);
