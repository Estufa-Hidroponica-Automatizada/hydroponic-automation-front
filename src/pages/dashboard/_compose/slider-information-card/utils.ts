import { Limit, RangeInformation } from "types";
import { isValueOnRange, measureFormatter } from "utils";

export const SliderTitle: Record<RangeInformation, string> = {
  airTemperature: "Temperatura do ar",
  condutivity: "Condutividade da água",
  humidity: "Umidade do ar",
  pH: "pH da água",
  waterTemperature: "Temperatura da água",
};

export const SliderRange: Record<RangeInformation, Limit> = {
  pH: { min: 0, max: 14 },
  humidity: { min: 0, max: 100 },
  airTemperature: { min: 15, max: 40 },
  waterTemperature: { min: 15, max: 40 },
  condutivity: { min: 0, max: 3000 },
};

export const getSliderMarkers = (
  information: RangeInformation,
  min: number,
  max: number,
  readValue?: number
) => {
  const markers: Record<number, any> = {};
  if (min >= SliderRange[information].min) {
    markers[min] = " ";
  }

  if (max <= SliderRange[information].max) {
    markers[max] = " ";
  }

  if (readValue && isValueOnRange(readValue, SliderRange[information])) {
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
