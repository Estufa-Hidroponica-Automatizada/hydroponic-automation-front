import { notification } from "antd";
import { HttpStatusCode } from "axios";
import { useCallback, useState } from "react";
import { Limits } from "types";
import { API, endpoints } from "utils";
import { limitFormatter } from "./utils";

export const useLimits = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [limits, setLimits] = useState<Limits>({} as Limits);

  const getLimits = useCallback(async () => {
    try {
      setError(false);
      setIsLoading(true);
      const { data, status } = await API.get<Limits>(
        endpoints.limits.getLimits
      );

      if (status === HttpStatusCode.Ok) {
        setLimits(limitFormatter(data));
      }
    } catch (status) {
      setError(true);
      notification.error({
        message: "Limites",
        description: "Ocorreu um erro ao consultar os limites",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, getLimits, isLoading, limits };
};

export const useSetLimit = () => {
  const [isLoading, setIsLoading] = useState(false);

  const setLimit = useCallback(
    async (parameter: string, type: "min" | "max", value: number) => {
      try {
        setIsLoading(true);
        const { status } = await API.put(
          endpoints.limits.setLimit(parameter, type),
          { value: value }
        );

        if (status === HttpStatusCode.Ok) {
          return true;
        }
      } catch {
        notification.error({
          message: "Limites",
          description: "Ocorreu um erro ao atualizar os limites",
        });
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { setLimit, isLoading };
};
