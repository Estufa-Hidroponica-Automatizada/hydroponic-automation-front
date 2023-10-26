import { LightSchedule, Limit, NutrientsProportion } from "types";

export const blankProfileData = {
  name: "",
  weeksDuration: 1,
  lightSchedule: [[]] as LightSchedule[][],
  pH: [] as Limit[],
  airTemperature: [] as Limit[],
  condutivity: [] as Limit[],
  humidity: [] as Limit[],
  waterTemperature: [] as Limit[],
  nutrientsProportion: [] as NutrientsProportion[],
};
