import { notification } from "antd";
import { HttpStatusCode } from "axios";
import { AuthContext } from "contexts";
import { useCallback, useContext, useState } from "react";
import { API, endpoints } from "utils";

export const useLogout = () => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);

      const { status } = await API.post(endpoints.auth.logout);

      if (status === HttpStatusCode.Ok) {
        setIsAuthenticated(false);
        setUser("");
      }
    } catch {
      notification.error({
        message: "Logout",
        description: "Ocorreu um erro ao tentar se desconectar do sistema",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { logout, isLoading };
};
