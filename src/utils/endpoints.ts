export const endpoints = {
  getReadData: "/sensor",
  limits: {
    getLimits: "/limit",
    setLimit: (parameterName: string, type: "min" | "max") => {
      return `/limit/${parameterName}_${type}`;
    },
  },
  lightSchedule: "/light/schedule",
  nutrientProportion: "/nutrient/proportion",
  cam: {
    getPhoto: "/cam/photo",
    getTimelapse: "/cam/timelapse",
  },
  auth: {
    login: "/login",
    changePassword: "change-password",
    logout: "/logout",
  },
  profile: { current: "/profile/current" },
};
