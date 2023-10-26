import { notification } from "antd";
import { HttpStatusCode } from "axios";
import { useCallback, useState } from "react";
import { ProfileData, SummaryProfile } from "types";
import { API, endpoints } from "utils";

export const useGetCurrentProfile = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<SummaryProfile>({
    days: 0,
    id: 0,
    name: "",
    isFinished: false,
    totalWeeks: 0,
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

export const useSetCurrentProfile = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setCurrentProfile = useCallback(async (profile: ProfileData) => {
    try {
      setError(false);
      setIsLoading(true);
      const { status } = await API.post(endpoints.profile.current, {
        id: profile.id,
        days: 0,
        erase: true,
      });

      if (status === HttpStatusCode.Ok) {
        notification.success({
          message: "Perfil",
          description: `O perfil ${profile.name} foi selecionado com sucesso.`,
        });
        return true;
      }
    } catch {
      setError(true);
      notification.error({
        message: "Perfil",
        description: "Ocorreu um erro ao selecionar o perfil.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, setCurrentProfile, isLoading };
};

export const useProfilesList = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profilesList, setProfilesList] = useState<ProfileData[]>([]);

  const getProfiles = useCallback(async () => {
    try {
      setError(false);
      setIsLoading(true);
      const { data, status } = await API.get(endpoints.profile.default);

      if (status === HttpStatusCode.Ok) {
        setProfilesList(data);
      }
    } catch {
      setError(true);
      notification.error({
        message: "Perfil",
        description: "Ocorreu um erro para listar os perfis existentes.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, getProfiles, isLoading, profilesList };
};

export const useCreateProfile = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createProfile = useCallback(async (profile: ProfileData) => {
    try {
      setError(false);
      setIsLoading(true);
      const { status } = await API.post(endpoints.profile.default, {
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
        description: `Ocorreu um erro para criar o perfil ${profile.name}.`,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, createProfile, isLoading };
};

export const useEditProfile = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const editProfile = useCallback(async (profile: ProfileData) => {
    try {
      setError(false);
      setIsLoading(true);
      const { status } = await API.put(endpoints.profile.default, {
        id: profile.id,
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
          description: `Perfil ${profile.name} editado com sucesso.`,
        });
        return true;
      }
    } catch {
      setError(true);
      notification.error({
        message: "Perfil",
        description: `Ocorreu um erro para editar o perfil ${profile.name}.`,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, editProfile, isLoading };
};

export const useDeleteProfile = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteProfile = useCallback(async (profile: ProfileData) => {
    try {
      setError(false);
      setIsLoading(true);
      const { status } = await API.delete(
        endpoints.profile.delete(profile.id!)
      );

      if (status === HttpStatusCode.Ok) {
        notification.success({
          message: "Perfil",
          description: `Perfil ${profile.name} excluído com sucesso.`,
        });
        return true;
      }
    } catch {
      setError(true);
      notification.error({
        message: "Perfil",
        description: `Ocorreu um erro para excluir o perfil ${profile.name}.`,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, deleteProfile, isLoading };
};
