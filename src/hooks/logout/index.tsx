import { notification } from "antd";
import { HttpStatusCode } from "axios";
import { useAuthentication, useAxios } from "contexts";
import { useCallback, useState } from "react";
import { endpoints } from "utils";

export const useLogout = () => {
  const { logout: logoutFunction } = useAuthentication();
  const [isLoading, setIsLoading] = useState(false);
  const { API } = useAxios();

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);

      const { status } = await API.post(endpoints.auth.logout);

      if (status === HttpStatusCode.Ok) {
        logoutFunction();
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
