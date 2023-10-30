import { LightSchedule, Limit, NutrientsProportion } from "types";

// to do: remove after backend adjust
export interface ProfileResponse {
  id?: number;
  name: string;
  light_schedule: LightSchedule[][];
  ph: Limit[];
  temperature: Limit[];
  condutivity: Limit[];
  humidity: Limit[];
  water_temperature: Limit[];
  nutrient_proportion: NutrientsProportion[];
}
