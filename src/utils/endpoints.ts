export const endpoints = {
  getReadData: "/sensor",
  limits: {
    getLimits: "/limit",
    setLimit: (parameterName: string) => {
      return `/limit/${parameterName}`;
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
  profile: {
    default: "/profile",
    delete: (profileID: number) => `/profile/${profileID}`,
    current: "/profile/current",
  },
};
