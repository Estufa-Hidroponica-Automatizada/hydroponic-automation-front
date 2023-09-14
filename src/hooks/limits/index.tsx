import axios from "axios";
import { useCallback, useState } from "react";
import { Limits } from "../../types";
import { endpoints } from "../../utils";

export const useLimits = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [limits, setLimits] = useState<Limits>({} as Limits);

  const getLimits = useCallback(async () => {
    try {
      setError(false);
      setIsLoading(true);
      const { data } = await axios.get<Limits>(endpoints.getLimits);
      setLimits(data);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, getLimits, isLoading, limits };
};
