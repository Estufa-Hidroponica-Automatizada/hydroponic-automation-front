import { LightSchedule } from "types";

export const timeSorter = (timeA: LightSchedule, timeB: LightSchedule) => {
  if (timeA.hour < timeB.hour) {
    return -1;
  } else if (timeA.hour > timeB.hour) {
    return 1;
  } else {
    if (timeA.minute < timeB.minute) {
      return -1;
    } else if (timeA.minute > timeB.minute) {
      return 1;
    }
    return 0;
  }
};
