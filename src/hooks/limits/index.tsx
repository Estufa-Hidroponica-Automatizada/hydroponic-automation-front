import { notification } from "antd";
import { HttpStatusCode } from "axios";
import { useAxios } from "contexts";
import { useCallback, useState } from "react";
import { Limit, Limits } from "types";
import { endpoints } from "utils";
import { limitFormatter } from "./utils";

export const useLimits = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [limits, setLimits] = useState<Limits>({} as Limits);
  const { API } = useAxios();

  const getLimits = useCallback(async () => {
    try {
      setError(false);
      setIsLoading(true);
      setLimits({} as Limits);
      const { data, status } = await API.get<Limits>(
        endpoints.limits.getLimits
      );

      if (status === HttpStatusCode.Ok) {
        setLimits(limitFormatter(data));
        return true;
      }
    } catch (status) {
      setError(true);
      notification.error({
        message: "Limites",
        description: "Ocorreu um erro ao consultar os limites",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, getLimits, isLoading, limits };
};

export const useSetLimit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { API } = useAxios();

  const setLimit = useCallback(async (parameter: string, values: Limit) => {
    try {
      setIsLoading(true);
      const { status } = await API.put(
        endpoints.limits.setLimit(parameter),
        values
      );

      if (status === HttpStatusCode.Ok) {
        notification.success({
          message: "Limites",
          description: "Os limites foram atualizados com sucesso.",
        });
        return true;
      }
    } catch {
      notification.error({
        message: "Limites",
        description: "Ocorreu um erro ao atualizar os limites.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { setLimit, isLoading };
};
