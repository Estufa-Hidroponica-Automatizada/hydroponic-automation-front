import { notification } from "antd";
import axios, { HttpStatusCode, AxiosError } from "axios";
import { useAuthentication } from "contexts";
import { useCallback, useState } from "react";
import { Login } from "types";
import { API, endpoints } from "utils";


interface CustomError {
  message: string;
  description: string;
}

export const useLogin = () => {
  const { login: loginFunction } = useAuthentication();
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (loginData: Login) => {
    try {
      setIsLoading(true);

      const { status, data } = await API.post(endpoints.auth.login, loginData);

      if (status === HttpStatusCode.Ok) {
        loginFunction(loginData.username, data.access_token);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<CustomError>;

        if (axiosError.response && axiosError.response.status === HttpStatusCode.Unauthorized) {
          notify("Login", "Credenciais inválidas")
        } else {
          notify("Login", "Ocorreu um erro ao tentar se conectar ao sistema")
        }
      } else {
        notify("Login", "Ocorreu um erro ao tentar se conectar ao sistema")
      }
    } finally {
      setIsLoading(false);
    }
  }, [loginFunction]);

  return { login, isLoading };
};

const notify = (message: string, description: string) => {
  notification.error({
    message: message,
    description: description,
  });
}