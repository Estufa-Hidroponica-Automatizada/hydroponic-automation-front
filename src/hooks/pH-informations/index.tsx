import { message } from "antd";
import axios from "axios";
import { useCallback, useState } from "react";

export const usepHInformations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [informations, setInformations] = useState();

  const [messageApi, contextHolder] = message.useMessage();

  const getpHInformations = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("url");

      setInformations(response.data);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Ocorreu um erro ao fazer a busca",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { informations, isLoading };
};
