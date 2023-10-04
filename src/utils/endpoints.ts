const baseURL = "https://177.63.216.221:4000"; // externalURL
// const baseURL = "https://192.168.15.10:4000"; // localURL
// const baseURL = "https://localhost:4000"; // raspURL

export const endpoints = {
  getReadData: `${baseURL}/sensor`,
  limits: {
    getLimits: `${baseURL}/limit`,
    setLimit: (parameterName: string, type: "min" | "max") => {
      return `${baseURL}/limit/${parameterName}_${type}`;
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
};
