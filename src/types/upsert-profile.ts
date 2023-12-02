import { Dayjs } from "dayjs";
import { LightSchedule } from "./light-schedule";

export interface ProfileInfoFormValues {
  name: string;
}

export interface LigthScheduleItem {
  time: Dayjs;
  state: boolean;
}

export interface LightScheduleFormValues {
  lightSchedule: LigthScheduleItem[][];
}

export interface LimitsRangeFormValues {
  limitsRange: [number, number][];
}

export interface UpsertProfile {
  lightSchedule: LightSchedule[];
}

export enum UpsertProfileFormField {
  Name = "name",
  WeeksDuration = "weeksDuration",
  LightSchedule = "lightSchedule",
  LightScheduleTime = "time",
  LightScheduleState = "state",
  LimitsRange = "limitsRange",
  NutrientProportion = "nutrientProportion",
}
