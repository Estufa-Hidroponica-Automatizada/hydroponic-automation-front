import { Limits } from "types";
import { numberFormatter } from "utils";

export const limitFormatter = (limit: Limits) => {
  return {
    airTemperature: {
      min: numberFormatter(limit.airTemperature.min),
      max: numberFormatter(limit.airTemperature.max),
    },
    condutivity: {
      min: numberFormatter(limit.condutivity.min),
      max: numberFormatter(limit.condutivity.max),
    },
    humidity: {
      min: numberFormatter(limit.humidity.min),
      max: numberFormatter(limit.humidity.max),
    },
    pH: {
      min: numberFormatter(limit.pH.min),
      max: numberFormatter(limit.pH.max),
    },
    waterTemperature: {
      min: numberFormatter(limit.waterTemperature.min),
      max: numberFormatter(limit.waterTemperature.max),
    },
  };
};
