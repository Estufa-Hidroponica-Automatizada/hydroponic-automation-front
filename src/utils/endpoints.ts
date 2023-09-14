const baseURL = "http://192.168.15.10:3000";

export const endpoints = {
  getLimits: `${baseURL}/limit`,
  getSensorsData: `${baseURL}/sensor`,
  setParameter: {
    pH: { min: `${baseURL}/ph_min`, max: `${baseURL}/ph_max` },
    condutivity: { min: `${baseURL}/ec_min`, max: `${baseURL}/ec_max` },
    airTemperature: {
      min: `${baseURL}/temperature_min`,
      max: `${baseURL}/temperature_max`,
    },
    waterTemperature: {
      min: `${baseURL}/water_temperature_min`,
      max: `${baseURL}/water_temperature_max`,
    },
    humidity: {
      min: `${baseURL}/humidity_min`,
      max: `${baseURL}/humidity_max`,
    },
  },
};
