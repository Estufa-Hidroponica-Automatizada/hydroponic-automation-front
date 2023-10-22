import { RangeInformation } from "types";
import { LimitsRange, isValueOnRange, measureFormatter } from "utils";

export const getSliderMarkers = (
  information: RangeInformation,
  min: number,
  max: number,
  readValue?: number
) => {
  const markers: Record<string | number, any> = {};
  if (min >= LimitsRange[information].min) {
    markers[min] = " ";
  }

  if (max <= LimitsRange[information].max) {
    markers[max] = " ";
  }

  if (readValue && isValueOnRange(readValue, LimitsRange[information])) {
    markers[readValue] = {
      style: {
        color: readValue >= min && readValue <= max ? "green" : "red",
        fontWeigth: 500,
      },
      label: measureFormatter(readValue, information),
    };
  }

  return markers;
};

export const SliderDatabaseName: Record<RangeInformation, string> = {
  airTemperature: "temperature",
  condutivity: "ec",
  humidity: "humidity",
  pH: "ph",
  waterTemperature: "water_temperature",
};
