import { Limit, RangeInformation } from "types";

export const LimitsRange: Record<RangeInformation, Limit> = {
  pH: { min: 0, max: 14 },
  humidity: { min: 0, max: 100 },
  airTemperature: { min: 15, max: 40 },
  waterTemperature: { min: 15, max: 40 },
  condutivity: { min: 0, max: 3000 },
};

export const LimitsStep: Record<RangeInformation, number> = {
  pH: 0.1,
  humidity: 1,
  airTemperature: 1,
  waterTemperature: 1,
  condutivity: 10,
};

export const LimitsTitle: Record<RangeInformation, string> = {
  airTemperature: "Temperatura do ar",
  condutivity: "Condutividade da água",
  humidity: "Umidade do ar",
  pH: "pH da água",
  waterTemperature: "Temperatura da água",
};
