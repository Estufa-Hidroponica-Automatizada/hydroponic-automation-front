import { ProfileData } from "types";

export interface IProfileContext {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  formStep: UpsertProfileStep;
  setFormStep: React.Dispatch<React.SetStateAction<UpsertProfileStep>>;
}

export enum UpsertProfileStep {
  ProfileInfo = "ProfileInfo",
  LightSchedule = "LightSchedule",
  pHLimits = "pHLimits",
  CondutivityLimits = "CondutivityLimits",
  AirTemperatureLimits = "AirTemperatureLimits",
  HumidityLimits = "HumidityLimits",
  WaterTemperatureLimits = "WaterTemperatureLimits",
  NutrientsProportion = "NutrientsProportion",
  ProfileConfirmation = "ProfileConfirmation",
}
