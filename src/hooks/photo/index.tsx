import { notification } from "antd";
import { useAxios } from "contexts";
import { useCallback, useState } from "react";
import { endpoints } from "utils";

export const usePhoto = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const { API } = useAxios();

  const getPhoto = useCallback(async () => {
    try {
      setError(false);
      setIsLoading(true);
      const { data } = await API.get(endpoints.cam.getPhoto, {
        responseType: "blob",
      });

      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result;
        setPhoto(dataURL as string);
      };
      reader.readAsDataURL(data);
    } catch {
      setError(true);
      notification.error({
        message: "Foto",
        description: "Ocorreu um erro ao tentar capturar a foto da estufa.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, getPhoto, isLoading, photo };
};
