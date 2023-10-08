import { notification } from "antd";
import { HttpStatusCode } from "axios";
import { AuthContext } from "contexts";
import { useCallback, useContext, useState } from "react";
import { Login } from "types";
import { API, endpoints } from "utils";

export const useLogin = () => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (loginData: Login) => {
    try {
      setIsLoading(true);

      const { status } = await API.post(endpoints.auth.login, loginData);

      if (status === HttpStatusCode.Ok) {
        setIsAuthenticated(true);
        setUser(loginData.username);
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
