import { notification } from "antd";
import { HttpStatusCode } from "axios";
import { useCallback, useState } from "react";
import { SummaryProfile } from "types";
import { API, endpoints } from "utils";

export const useCurrentProfile = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<SummaryProfile>({
    days: 0,
    id: 0,
    isFinished: false,
  });

  const getCurrentProfile = useCallback(async () => {
    try {
      setError(false);
      setIsLoading(true);
      const { data, status } = await API.get<SummaryProfile>(
        endpoints.profile.current
      );

      if (status === HttpStatusCode.Ok) {
        setCurrentProfile(data);
      }
    } catch {
      setError(true);
      notification.error({
        message: "Perfil",
        description: "Ocorreu um erro ao consultar o perfil atual",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, getCurrentProfile, isLoading, currentProfile };
};
