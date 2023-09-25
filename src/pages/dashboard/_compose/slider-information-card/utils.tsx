import { Limit } from "../../../../types";
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

export const getSliderMarkers = (information: SliderInformation, min?: number, max?: number, readValue?: number,) => {
  const markers: Record<number, any> = {};
  if (min) {
    markers[min] = " ";
  }
  if (max) {
    markers[max] = " ";
  }
  if (readValue) {
    markers[readValue] = {
      style: {
        color: readValue >= min! && readValue <= max! ? "green" : "red",
        fontWeigth: 500,
      },
      label: 'xxx'
      // label: `${readValue}${SliderUnity[information]}`
    };
  }

  return markers
}