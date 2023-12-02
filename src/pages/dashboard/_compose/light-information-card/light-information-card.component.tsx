import { BulbFilled, BulbOutlined } from "@ant-design/icons";
import { Skeleton, Typography } from "antd";
import { ContentCard, LightScheduleList } from "components";
import { LightSchedule } from "types";

interface LightInformationCardProps {
  isLoadingLightSchedule: boolean;
  isLoadingReadData: boolean;
  lightLevel?: number;
  lightSchedule: LightSchedule[];
}

export const LightInformationCard = ({
  isLoadingLightSchedule,
  isLoadingReadData,
  lightLevel,
  lightSchedule,
}: LightInformationCardProps) => {
  const hasLight = (lightLevel ?? 0) > 100;

  return (
    <ContentCard>
      <div className="d-flex flex-column justify-content-between h-100">
        <Typography.Title
          level={2}
          className="m-0 text-center justify-self-start"
        >
          Luminosidade
        </Typography.Title>

        <div className="d-flex align-items-center justify-content-center gap-3 py-2 h-100">
          {!lightLevel || isLoadingReadData ? (
            <Skeleton.Image active style={{ fontSize: "8rem" }} />
          ) : hasLight ? (
            <BulbFilled
              style={{
                fontSize: "6rem",
                marginLeft: "-1.5rem",
              }}
            />
          ) : (
            <BulbOutlined style={{ fontSize: "6rem" }} />
          )}

          {!lightSchedule.length || isLoadingLightSchedule ? (
            <div className="d-flex flex-column justify-content-center gap-1">
              <Skeleton.Input size="small" active />
              <Skeleton.Input size="small" active />
              <Skeleton.Input size="small" active />
            </div>
          ) : (
            <div className="d-flex flex-column align-items-end gap-1">
              <Typography.Title level={5} className="m-0 text-center">
                Cronograma atual
              </Typography.Title>

              <LightScheduleList lightSchedule={lightSchedule} />
            </div>
          )}
        </div>
      </div>
    </ContentCard>
  );
};
