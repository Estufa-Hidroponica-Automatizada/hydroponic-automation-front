import { LightSchedule, Limit, NutrientProportion, ProfileData } from "types";

export const blankProfileData: ProfileData = {
  name: "",
  weeksDuration: 1,
  lightSchedule: [[]] as LightSchedule[][],
  pH: [] as Limit[],
  airTemperature: [] as Limit[],
  condutivity: [] as Limit[],
  humidity: [] as Limit[],
  waterTemperature: [] as Limit[],
  nutrientProportion: [] as NutrientProportion[],
};
