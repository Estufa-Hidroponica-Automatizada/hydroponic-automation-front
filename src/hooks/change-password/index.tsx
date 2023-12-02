import { notification } from "antd";
import { HttpStatusCode } from "axios";
import { useAxios } from "contexts";
import { useCallback, useState } from "react";
import { ChangePasswordRequest } from "types";
import { endpoints } from "utils";

export const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { API } = useAxios();

  const changePassword = useCallback(
    async (changePasswordRequest: ChangePasswordRequest) => {
      try {
        setIsLoading(true);

        const { status } = await API.post(
          endpoints.auth.changePassword,
          changePasswordRequest
        );

        if (status === HttpStatusCode.Ok) {
          notification.success({
            message: "Alterar senha",
            description: "Sua senha foi alterada com sucesso.",
          });
          return true;
        }
      } catch {
        notification.error({
          message: "Alterar senha",
          description: "Ocorreu um erro ao tentar alterar sua senha.",
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { changePassword, isLoading };
};
