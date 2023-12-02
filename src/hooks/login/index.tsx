import { notification } from "antd";
import { AxiosError, HttpStatusCode } from "axios";
import { useAuthentication, useAxios } from "contexts";
import { useCallback, useState } from "react";
import { Login } from "types";
import { endpoints } from "utils";

export const useLogin = () => {
  const { login: loginFunction } = useAuthentication();
  const [isLoading, setIsLoading] = useState(false);
  const { API } = useAxios();

  const login = useCallback(async (loginData: Login) => {
    try {
      setIsLoading(true);

      const {
        status,
        data: { access_token },
      } = await API.post<{
        access_token: string;
      }>(endpoints.auth.login, loginData);

      if (status === HttpStatusCode.Ok) {
        loginFunction(loginData.username, access_token);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const description =
        axiosError.response?.status === HttpStatusCode.Unauthorized
          ? "As credenciais são inválidas, tente novamente."
          : "Ocorreu um erro ao tentar se conectar ao sistema";

      notification.error({
        message: "Login",
        description,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { login, isLoading };
};
