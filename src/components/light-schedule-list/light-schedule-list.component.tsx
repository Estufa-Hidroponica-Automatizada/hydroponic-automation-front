import { BulbFilled, BulbOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { LightSchedule } from "types";
import { timeFormatter } from "utils";
import { timeSorter } from "./utils";

interface LightScheduleListProps {
  lightSchedule: LightSchedule[];
}

export const LightScheduleList = ({
  lightSchedule,
}: LightScheduleListProps) => {
  return (
    <>
      {lightSchedule.sort(timeSorter).map((schedule, index) => (
        <div
          className="d-flex align-items-center gap-1"
          key={`scheduleItem${index}`}
        >
          <Typography.Text>
            {schedule.state ? "Ligar" : "Desligar"} às{" "}
            {timeFormatter(schedule.hour, schedule.minute)}
          </Typography.Text>

          {schedule.state ? <BulbFilled /> : <BulbOutlined />}
        </div>
      ))}
    </>
  );
};
