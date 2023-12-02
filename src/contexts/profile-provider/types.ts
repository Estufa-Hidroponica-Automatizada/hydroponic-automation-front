import { ProfileData } from "types";

export interface IProfileContext {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  formStep: UpsertProfileStep;
  setFormStep: React.Dispatch<React.SetStateAction<UpsertProfileStep>>;
  mode: UpsertProfileMode;
  setMode: React.Dispatch<React.SetStateAction<UpsertProfileMode>>;
}

export enum UpsertProfileMode {
  Create = "Create",
  Edit = "Edit",
}

export enum UpsertProfileStep {
  ProfileInfo = "ProfileInfo",
  LightSchedule = "LightSchedule",
  pHLimits = "pHLimits",
  CondutivityLimits = "CondutivityLimits",
  AirTemperatureLimits = "AirTemperatureLimits",
  HumidityLimits = "HumidityLimits",
  WaterTemperatureLimits = "WaterTemperatureLimits",
  NutrientProportion = "NutrientProportion",
  ProfileConfirmation = "ProfileConfirmation",
}
