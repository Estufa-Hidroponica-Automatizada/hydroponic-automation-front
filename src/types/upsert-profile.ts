import { Dayjs } from "dayjs";
import { LightSchedule } from "./light-schedule";

export interface ProfileInfoFormValues {
  name: string;
}

interface LigthScheduleItem {
  item: { time: Dayjs; state: boolean }[];
}

export interface LightScheduleFormValues {
  lightSchedule: LigthScheduleItem[];
}

export interface UpsertProfile {
  lightSchedule: LightSchedule[];
}

export enum UpsertProfileFormField {
  Name = "name",
  WeeksDuration = "weeksDuration",
  LightSchedule = "lightSchedule",
  // to do: verify
  LightScheduleItem = "item",
  LightScheduleItemTime = "time",
  LightScheduleItemState = "state",
}
