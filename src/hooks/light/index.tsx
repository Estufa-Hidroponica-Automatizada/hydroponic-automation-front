import { notification } from "antd";
import { HttpStatusCode } from "axios";
import { useAxios } from "contexts";
import { useCallback, useState } from "react";
import { LightSchedule } from "types";
import { endpoints } from "utils";

export const useLight = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lightSchedule, setLightSchedule] = useState<LightSchedule[]>([]);
  const { API } = useAxios();

  const getLightSchedule = useCallback(async () => {
    try {
      setError(false);
      setIsLoading(true);
      const { data, status } = await API.get<LightSchedule[]>(
        endpoints.lightSchedule
      );

      if (status === HttpStatusCode.Ok) {
        setLightSchedule(data);
      }
    } catch {
      setError(true);
      notification.error({
        message: "Sensores",
        description: "Ocorreu um erro ao consultar os dados dos sensores",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, getLightSchedule, isLoading, lightSchedule };
};
