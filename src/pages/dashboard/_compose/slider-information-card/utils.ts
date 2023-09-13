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

export const SliderRange: Record<
  SliderInformation,
  { min: number; max: number }
> = {
  pH: { min: 0, max: 14 },
  humidity: { min: 0, max: 100 },
  AirTemperature: { min: 15, max: 40 },
  condutivity: { min: 0, max: 3000 },
};
