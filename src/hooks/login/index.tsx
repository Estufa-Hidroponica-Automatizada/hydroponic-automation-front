import { notification } from "antd";
import axios from "axios";
import { useCallback, useState } from "react";
import { Login } from "../../types";
import { endpoints } from "../../utils";

export const useLogin = (loginData: Login) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async () => {
    try {
      setError(false);
      setIsLoading(true);
      const { data } = await axios.post(endpoints.auth.login, loginData);
      if (data) {
        return true;
      }
    } catch {
      setError(true);
      notification.error({
        message: "Login",
        description: "Ocorreu um erro ao tentar se conectar ao sistema",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, login, isLoading };
};
