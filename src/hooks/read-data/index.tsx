import { notification } from "antd";
import axios from "axios";
import { useCallback, useState } from "react";
import { ReadData } from "../../types/read-data";
import { endpoints } from "../../utils";

export const useReadData = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [readValues, setReadValues] = useState<ReadData>({} as ReadData);

  const getReadData = useCallback(async () => {
    try {
      setError(false);
      setIsLoading(true);
      const { data } = await axios.get<ReadData>(endpoints.getReadData);
      setReadValues(data);
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

  return { error, getReadData, isLoading, readValues };
};
