// const baseURL = "http://177.63.216.134:4000"; // externalURL
const baseURL = "http://192.168.15.10:4000"; // localURL
// const baseURL = "http://localhost:4000"; // raspURL

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
    getPhoto: `${baseURL}/cam/photo`,
    getTimelapse: `${baseURL}/cam/timelapse`,
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
