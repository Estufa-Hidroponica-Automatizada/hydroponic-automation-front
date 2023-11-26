import { notification } from "antd";
import { HttpStatusCode } from "axios";
import { useAuthentication } from "contexts";
import { useCallback, useState } from "react";
import { Login } from "types";
import { API, endpoints } from "utils";

export const useLogin = () => {
  const { login: loginFunction } = useAuthentication();
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (loginData: Login) => {
    try {
      setIsLoading(true);

      const { status } = await API.post(endpoints.auth.login, loginData);

      if (status === HttpStatusCode.Ok) {
        loginFunction(loginData.username);
      }
    } catch {
      notification.error({
        message: "Login",
        description: "Ocorreu um erro ao tentar se conectar ao sistema",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { login, isLoading };
};
