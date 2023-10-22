import { LightSchedule } from "./light-schedule";
import { Limit } from "./limits";
import { NutrientsProportion } from "./nutrients-proportion";

export interface SummaryProfile {
  days: number;
  id: number;
  isFinished: boolean;
}

export interface ProfileData {
  name: string;
  weeksDuration: number;
  lightSchedule: LightSchedule[][];
  pH: Limit[];
  airTemperature: Limit[];
  condutivity: Limit[];
  humidity: Limit[];
  waterTemperature: Limit[];
  nutrientsProportion: NutrientsProportion[];
}
