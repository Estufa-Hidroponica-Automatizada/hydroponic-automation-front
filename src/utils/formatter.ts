import { RangeInformation } from "types";

export const numberFormatter = (value: number) => {
  return parseFloat(value.toFixed(2));
};

export const timeFormatter = (hour: number, minutes: number) => {
  return `${hour.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

const measureUnity: Record<RangeInformation, string> = {
  pH: "",
  humidity: "%",
  waterTemperature: "°C",
  airTemperature: "°C",
  condutivity: "ppm",
};

export const measureFormatter = (
  value: number,
  information: RangeInformation
) => {
  return `${value} ${measureUnity[information]}`;
};
