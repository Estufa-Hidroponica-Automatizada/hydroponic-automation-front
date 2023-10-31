import { Divider, Typography } from "antd";
import { ContentCard } from "components";
import { ProfileContext, UpsertProfileMode, UpsertProfileStep } from "contexts";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppPath } from "routes";
import { RangeInformation } from "types";
import { LightScheduleInput } from "./_compose/light-schedule-input";
import { LimitsRangeInput } from "./_compose/limits-range-input";
import { NutrientsProportionInput } from "./_compose/nutrients-proportion-input";
import { ProfileConfirmation } from "./_compose/profile-confirmation";
import { ProfileInfoInput } from "./_compose/profile-info-input";

export const UpsertProfilePage = () => {
  const location = useLocation();

  const { formStep, mode, setMode } = useContext(ProfileContext);

  useEffect(() => {
    setMode(
      location.pathname.includes(AppPath.CreateProfile)
        ? UpsertProfileMode.Create
        : UpsertProfileMode.Edit
    );
  }, []);

  const renderContent: Record<UpsertProfileStep, JSX.Element> = {
    ProfileInfo: <ProfileInfoInput />,
    LightSchedule: <LightScheduleInput />,
    pHLimits: (
      <LimitsRangeInput information={RangeInformation.pH} key="phLimitInput" />
    ),
    CondutivityLimits: (
      <LimitsRangeInput
        information={RangeInformation.Condutivity}
        key="condutivityLimitInput"
      />
    ),
    WaterTemperatureLimits: (
      <LimitsRangeInput
        information={RangeInformation.WaterTemperature}
        key="waterTemperatureLimitInput"
      />
    ),
    AirTemperatureLimits: (
      <LimitsRangeInput
        information={RangeInformation.AirTemperature}
        key="airTemperatureLimitInput"
      />
    ),
    HumidityLimits: (
      <LimitsRangeInput
        information={RangeInformation.Humidity}
        key="humidityLimitInput"
      />
    ),
    NutrientsProportion: <NutrientsProportionInput />,
    ProfileConfirmation: <ProfileConfirmation />,
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <ContentCard>
        <div className="d-flex flex-column justify-content-between h-100">
          <Typography.Title level={2} className="m-0 text-center">
            {mode === UpsertProfileMode.Create
              ? "Criar perfil"
              : "Editar perfil"}
          </Typography.Title>

          <Divider className="my-2" />

          {renderContent[formStep]}
        </div>
      </ContentCard>
    </div>
  );
};
