import axios from "axios";
import { useCallback, useState } from "react";
import { endpoints } from "../../utils";
import { SensorsData } from "../../types/sensors-data";

export const useSensorsData = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sensorsData, setSensorsData] = useState<SensorsData>(
    {} as SensorsData
  );

  const getSensorsData = useCallback(async () => {
    try {
      setError(false);
      setIsLoading(true);
      const { data } = await axios.get<SensorsData>(endpoints.getSensorsData);
      setSensorsData(data);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, getSensorsData, isLoading, sensorsData };
};
