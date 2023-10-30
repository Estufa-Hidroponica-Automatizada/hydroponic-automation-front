import { UpsertProfileStep } from "contexts/profile-provider/types";
import {
  Limit,
  LimitsRangeFormValues,
  ProfileData,
  RangeInformation,
} from "types";
import { LimitsRange } from "utils";

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

export const limitsRangeInitialValues = (
  profileData: ProfileData,
  information: RangeInformation
) => {
  // TO DO: ajustar para inicializar com valores decimais
  return Array.from({ length: profileData.weeksDuration }, (_, weekIndex) =>
    weekIndex < profileData[information].length
      ? [
          profileData[information][weekIndex].min,
          profileData[information][weekIndex].max,
        ]
      : [LimitsRange[information].min, LimitsRange[information].max]
  );
};

export const adaptFormValuesToLimits = (data: LimitsRangeFormValues) => {
  const response: Limit[] = [];

  data.limitsRange.map((limit) =>
    response.push({ min: limit[0], max: limit[1] })
  );

  return response;
};
