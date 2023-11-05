import { notification } from "antd";
import { HttpStatusCode } from "axios";
import { useCallback, useState } from "react";
import { ReadData } from "types";
import { API, endpoints } from "utils";
import { readDataFormatter } from "./utils";

export const useReadData = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [readValues, setReadValues] = useState<ReadData>({} as ReadData);

  const getReadData = useCallback(async () => {
    try {
      setError(false);
      setIsLoading(true);
      const { data, status } = await API.get<ReadData>(endpoints.getReadData);

      if (status === HttpStatusCode.Ok) {
        setReadValues(readDataFormatter(data));
        return true;
      }
    } catch {
      setError(true);
      notification.error({
        message: "Sensores",
        description: "Ocorreu um erro ao consultar os dados dos sensores",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, getReadData, isLoading, readValues };
};
