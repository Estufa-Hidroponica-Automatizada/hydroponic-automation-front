// const baseURL = "http://177.63.216.134:2222";
const baseURL = "http://localhost:3000";

export const endpoints = {
  getReadData: `${baseURL}/sensor`,
  limits: {
    getLimits: `${baseURL}/limit`,
    setLimit: (parameterName: string) => {
      return `${baseURL}/limit/${parameterName}`;
    },
  },
  lightSchedule: `${baseURL}/light/schedule`,
  nutrientProportion: `${baseURL}/nutrient/proportion`,
  cam: {
    downloadPhoto: `${baseURL}/cam/photo`,
    downloadTimelapse: `${baseURL}/cam/timelapse`,
    setLimit: (parameterName: string) => {
      return `${baseURL}/limit/${parameterName}`;
    },
  },
  auth: {
    login: `${baseURL}/login`,
    changePassword: `${baseURL}/change-password`,
    logout: `${baseURL}/logout`,
  },

  // TO DO: remove
  // setParameter: {
  //   pH: { min: `${baseURL}/ph_min`, max: `${baseURL}/ph_max` },
  //   condutivity: { min: `${baseURL}/ec_min`, max: `${baseURL}/ec_max` },
  //   airTemperature: {
  //     min: `${baseURL}/temperature_min`,
  //     max: `${baseURL}/temperature_max`,
  //   },
  //   waterTemperature: {
  //     min: `${baseURL}/water_temperature_min`,
  //     max: `${baseURL}/water_temperature_max`,
  //   },
  //   humidity: {
  //     min: `${baseURL}/humidity_min`,
  //     max: `${baseURL}/humidity_max`,
  //   },
  // },
};
