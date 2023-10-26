import { UpsertProfileStep } from "contexts/profile-provider/types";
import { RangeInformation } from "types";

export const previousStep: Record<RangeInformation, UpsertProfileStep> = {
  pH: UpsertProfileStep.LightSchedule,
  condutivity: UpsertProfileStep.pHLimits,
  waterTemperature: UpsertProfileStep.CondutivityLimits,
  airTemperature: UpsertProfileStep.WaterTemperatureLimits,
  humidity: UpsertProfileStep.AirTemperatureLimits,
};

export const nextStep: Record<RangeInformation, UpsertProfileStep> = {
  pH: UpsertProfileStep.CondutivityLimits,
  condutivity: UpsertProfileStep.WaterTemperatureLimits,
  waterTemperature: UpsertProfileStep.AirTemperatureLimits,
  airTemperature: UpsertProfileStep.HumidityLimits,
  humidity: UpsertProfileStep.NutrientsProportion,
};
