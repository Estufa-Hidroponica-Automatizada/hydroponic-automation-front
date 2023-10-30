import dayjs from "dayjs";
import { LightSchedule, LightScheduleFormValues, ProfileData } from "types";

export const lightScheduleInitialValues = (profileData: ProfileData) => {
  return Array.from({ length: profileData.weeksDuration }, (_, weekIndex) =>
    weekIndex < profileData.lightSchedule.length
      ? Array.from(
          {
            length: profileData.lightSchedule[weekIndex].length
              ? profileData.lightSchedule[weekIndex].length
              : 1,
          },
          (_, itemIndex) =>
            itemIndex < profileData.lightSchedule[weekIndex].length
              ? {
                  time: dayjs()
                    .set(
                      "hour",
                      profileData.lightSchedule[weekIndex][itemIndex].hour
                    )
                    .set(
                      "minute",
                      profileData.lightSchedule[weekIndex][itemIndex].minute
                    ),
                  state: profileData.lightSchedule[weekIndex][itemIndex].state,
                }
              : {}
        )
      : Array.from({ length: 1 })
  );
};

export const adaptFormValuesToLightSchedule = (
  data: LightScheduleFormValues
) => {
  const response: LightSchedule[][] = [];

  data.lightSchedule.map((week) => {
    const weekSchedule: LightSchedule[] = [];
    week.map((weekItem) =>
      weekSchedule.push({
        hour: weekItem.time.hour(),
        minute: weekItem.time.minute(),
        state: weekItem.state,
      })
    );
    response.push(weekSchedule);
  });

  return response;
};
