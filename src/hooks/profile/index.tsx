import { notification } from "antd";
import { HttpStatusCode } from "axios";
import { useCallback, useState } from "react";
import { ProfileData, SummaryProfile } from "types";
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

export const useCreateProfile = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createProfile = useCallback(async (profile: ProfileData) => {
    try {
      setError(false);
      setIsLoading(true);
      const { status } = await API.post(endpoints.profile.create, {
        name: profile.name,
        temperature: profile.airTemperature,
        humidity: profile.humidity,
        ph: profile.pH,
        condutivity: profile.condutivity,
        water_temperature: profile.waterTemperature,
        light_schedule: profile.lightSchedule,
        nutrient_proportion: profile.nutrientsProportion,
      });

      if (status === HttpStatusCode.Ok) {
        notification.success({
          message: "Perfil",
          description: `Perfil ${profile.name} criado com sucesso.`,
        });
        return true;
      }
    } catch {
      setError(true);
      notification.error({
        message: "Perfil",
        description: "Ocorreu um erro para gerar o perfil",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, createProfile, isLoading };
};
