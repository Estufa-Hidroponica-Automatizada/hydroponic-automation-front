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
            limit={limits?.pH}
            readValue={readValues?.pH}
          />
          <SliderInformationCard
            information={RangeInformation.WaterTemperature}
            isLoadingLimits={isLoadingLimits}
            isLoadingReadData={isLoadingReadData}
            limit={limits?.waterTemperature}
            readValue={readValues?.waterTemperature}
          />
          <SliderInformationCard
            information={RangeInformation.Condutivity}
            isLoadingLimits={isLoadingLimits}
            isLoadingReadData={isLoadingReadData}
            limit={limits?.condutivity}
            readValue={readValues?.condutivity}
          />
          <SliderInformationCard
            information={RangeInformation.Humidity}
            isLoadingLimits={isLoadingLimits}
            isLoadingReadData={isLoadingReadData}
            limit={limits?.humidity}
            readValue={readValues?.humidity}
          />
          <SliderInformationCard
            information={RangeInformation.AirTemperature}
            isLoadingLimits={isLoadingLimits}
            isLoadingReadData={isLoadingReadData}
            limit={limits?.airTemperature}
            readValue={readValues?.airTemperature}
          />
          <LightInformationCard
            isLoadingLightSchedule={isLoadingLightSchedule}
            isLoadingReadData={isLoadingReadData}
            lightLevel={readValues?.light}
            lightSchedule={lightSchedule}
          />
        </ResponsiveContainer>
      )}
    </div>
  );
};
