import { BulbFilled, BulbOutlined } from "@ant-design/icons";
import { Skeleton, Typography } from "antd";
import { ContentCard, LightScheduleList } from "components";
import { LightSchedule } from "types";

interface LightInformationCardProps {
  isLoading: boolean;
  lightStatus: boolean;
  lightSchedule: LightSchedule[];
}

export const LightInformationCard = ({
  isLoading,
  lightStatus,
  lightSchedule,
}: LightInformationCardProps) => {
  return (
    <ContentCard>
      <div className="d-flex flex-column justify-content-between h-100">
        <Typography.Title
          level={2}
          className="m-0 text-center justify-self-start"
        >
          Luminosidade
        </Typography.Title>

        <div className="d-flex justify-content-center gap-3 py-2">
          {/* TO DO: DIVIDIR LOADINGS DE STATUS E CRONOGRAMA */}
          {isLoading ? (
            <>
              <Skeleton.Image active style={{ fontSize: "8rem" }} />

              <div className="d-flex flex-column justify-content-center gap-1">
                <Skeleton.Input size="small" active />
                <Skeleton.Input size="small" active />
                <Skeleton.Input size="small" active />
              </div>
            </>
          ) : (
            <>
              {lightStatus ? (
                <BulbFilled
                  style={{
                    fontSize: "6rem",
                    marginLeft: "-1.5rem",
                  }}
                />
              ) : (
                <BulbOutlined style={{ fontSize: "6rem" }} />
              )}

              <div className="d-flex flex-column align-items-end gap-1">
                <Typography.Title level={5} className="m-0 text-center">
                  Cronograma atual
                </Typography.Title>

                <LightScheduleList lightSchedule={lightSchedule} />
              </div>
            </>
          )}
        </div>
      </div>
    </ContentCard>
  );
};
