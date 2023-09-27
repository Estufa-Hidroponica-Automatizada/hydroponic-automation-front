import { Limit } from "../../../../types";
import { isValueOnRange } from "../../../../utils";
import { SliderInformation } from "../../enum";

export const SliderTitle: Record<SliderInformation, string> = {
  pH: "pH da água",
  humidity: "Umidade do ar",
  AirTemperature: "Temperatura do ar",
  condutivity: "Condutividade da água",
};

export const SliderUnity: Record<SliderInformation, string> = {
  pH: "",
  humidity: "%",
  AirTemperature: "°C",
  condutivity: "ppm",
};

export const SliderRange: Record<SliderInformation, Limit> = {
  pH: { min: 0, max: 14 },
  humidity: { min: 0, max: 100 },
  AirTemperature: { min: 15, max: 40 },
  condutivity: { min: 0, max: 3000 },
};

export const getSliderMarkers = (
  information: SliderInformation,
  min: number,
  max: number,
  readValue?: number
) => {
  const markers: Record<number, any> = {};
  markers[min] = " ";
  markers[max] = " ";
  if (
    readValue &&
    isValueOnRange(
      readValue,
      SliderRange[information].min,
      SliderRange[information].max
    )
  ) {
    markers[readValue] = {
      style: {
        color: readValue >= min && readValue <= max ? "green" : "red",
        fontWeigth: 500,
      },
      label: `${readValue}${SliderUnity[information]}`,
    };
  }

  return markers;
};
