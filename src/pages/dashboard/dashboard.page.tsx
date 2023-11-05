import { ResponsiveContainer } from "components";
import { useLight, useLimits, useReadData } from "hooks";
import { useEffect, useRef } from "react";
import { RangeInformation } from "types";
import { DashboardActions } from "./_compose/dashboard-actions";
import { LightInformationCard } from "./_compose/light-information-card";
import { SliderInformationCard } from "./_compose/slider-information-card";

export const DashboardPage = () => {
  const initialRender = useRef(true);

  const {
    error: limitsError,
    getLimits,
    isLoading: isLoadingLimits,
    limits,
  } = useLimits();

  const {
    error: readDataError,
    getReadData,
    isLoading: isLoadingReadData,
    readValues,
  } = useReadData();

  const {
    error: lightScheduleError,
    getLightSchedule,
    isLoading: isLoadingLightSchedule,
    lightSchedule,
  } = useLight();

  const getDashboardValues = async () => {
    const limitSuccess = await getLimits();
    if (limitSuccess) {
      const readDataSuccess = await getReadData();
      if (readDataSuccess) {
        await getLightSchedule();
      }
    }
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      getDashboardValues();
    }
  }, []);

  const isLoading = isLoadingLimits || isLoadingReadData;
  const hasError = limitsError || readDataError || lightScheduleError;

  return (
    <div className="d-flex flex-column gap-3">
      <DashboardActions
        handleReloadData={getDashboardValues}
        isLoading={isLoading}
        hasError={hasError}
      />

      {!hasError && (
        <ResponsiveContainer>
          <SliderInformationCard
            information={RangeInformation.pH}
            isLoadingLimits={isLoadingLimits}
            isLoadingReadData={isLoadingReadData}
            limit={limits?.pH ?? 0}
            readValue={readValues?.pH ?? 0}
          />
          <SliderInformationCard
            information={RangeInformation.WaterTemperature}
            isLoadingLimits={isLoadingLimits}
            isLoadingReadData={isLoadingReadData}
            limit={limits?.waterTemperature ?? 0}
            readValue={readValues?.waterTemperature ?? 0}
          />
          <SliderInformationCard
            information={RangeInformation.Condutivity}
            isLoadingLimits={isLoadingLimits}
            isLoadingReadData={isLoadingReadData}
            limit={limits?.condutivity ?? 0}
            readValue={readValues?.condutivity ?? 0}
          />
          <SliderInformationCard
            information={RangeInformation.Humidity}
            isLoadingLimits={isLoadingLimits}
            isLoadingReadData={isLoadingReadData}
            limit={limits?.humidity ?? 0}
            readValue={readValues?.humidity ?? 0}
          />
          <SliderInformationCard
            information={RangeInformation.AirTemperature}
            isLoadingLimits={isLoadingLimits}
            isLoadingReadData={isLoadingReadData}
            limit={limits?.airTemperature ?? 0}
            readValue={readValues?.airTemperature ?? 0}
          />
          <LightInformationCard
            isLoading={isLoadingReadData || isLoadingLightSchedule}
            lightStatus={readValues?.light > 100}
            lightSchedule={lightSchedule}
          />
        </ResponsiveContainer>
      )}
    </div>
  );
};
