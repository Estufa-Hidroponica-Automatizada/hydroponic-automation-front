import { notification } from "antd";
import axios from "axios";
import { useCallback, useState } from "react";

import { ChangePasswordRequest } from "types";
import { endpoints } from "utils";

export const useChangePassword = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changePassword = useCallback(
    async (changePasswordRequest: ChangePasswordRequest) => {
      try {
        setError(false);
        setIsLoading(true);

        const response = await axios.post(
          endpoints.auth.changePassword,
          changePasswordRequest
        );

        if (response.data) {
          notification.success({
            message: "Alterar senha",
            description: "Sua senha foi alterada com sucesso.",
          });
          return true;
        }
      } catch {
        setError(true);
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

  return { error, changePassword, isLoading };
};
