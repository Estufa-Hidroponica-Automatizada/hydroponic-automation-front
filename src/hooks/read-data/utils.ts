import { ReadData } from "types";
import { numberFormatter } from "utils";

export const readDataFormatter = (readData: ReadData) => {
  return {
    airTemperature: numberFormatter(readData.airTemperature),
    condutivity: numberFormatter(readData.condutivity),
    humidity: numberFormatter(readData.humidity),
    light: numberFormatter(readData.light),
    pH: numberFormatter(readData.pH),
    waterLevel: numberFormatter(readData.waterLevel),
    waterTemperature: numberFormatter(readData.waterTemperature),
  };
};
