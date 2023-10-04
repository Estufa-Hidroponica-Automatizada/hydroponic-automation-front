import { notification } from "antd";
import axios, { HttpStatusCode } from "axios";
import { AuthContext } from "contexts";
import { useCallback, useContext, useState } from "react";
import { endpoints } from "utils";

export const useLogout = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);

      const { status } = await axios.post(endpoints.auth.logout);

      if (status === HttpStatusCode.Ok) {
        setIsAuthenticated(false);
        return true;
      }
    } catch {
      notification.error({
        message: "Logout",
        description: "Ocorreu um erro ao tentar se desconectar do sistema",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { logout, isLoading };
};
