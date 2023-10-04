import { notification } from "antd";
import axios, { HttpStatusCode } from "axios";
import { AuthContext } from "contexts";
import { useCallback, useContext, useState } from "react";
import { Login } from "types";
import { endpoints } from "utils";

export const useLogin = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (loginData: Login) => {
    try {
      setIsLoading(true);

      const { status } = await axios.post(endpoints.auth.login, loginData);

      if (status === HttpStatusCode.Ok) {
        setIsAuthenticated(true);
        return true;
      }
    } catch {
      notification.error({
        message: "Login",
        description: "Ocorreu um erro ao tentar se conectar ao sistema",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { login, isLoading };
};
