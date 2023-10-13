import { notification } from "antd";
import { useCallback, useState } from "react";
import { API, endpoints } from "utils";

export const useTimelapse = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timelapse, setTimelapse] = useState<string | null>(null);

  const getTimelapse = useCallback(async () => {
    try {
      setError(false);
      setIsLoading(true);
      const { data } = await API.get(endpoints.cam.getTimelapse, {
        responseType: "blob",
      });

      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result;
        setTimelapse(dataURL as string);
      };
      reader.readAsDataURL(data);
    } catch {
      setError(true);
      notification.error({
        message: "Timelapse",
        description: "Ocorreu um erro ao tentar baixar a timelapse da estufa.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, getTimelapse, isLoading, timelapse };
};