import { LightSchedule } from "types";

export interface IProfileContext {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  formStep: UpsertProfileStep;
  setFormStep: React.Dispatch<React.SetStateAction<UpsertProfileStep>>;
}

export interface ProfileData {
  name: string;
  weeksDuration: number;
  lightSchedule: LightSchedule[][];
}

export enum UpsertProfileStep {
  ProfileInfo = "ProfileInfo",
  LightSchedule = "LightSchedule",
  Condutivity = "Condutivity",
}
