import {
  CameraOutlined,
  DownOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Typography } from "antd";
import { useLimits, useReadData } from "hooks";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppPath } from "routes";
import { SliderInformationCard } from "./_compose/slider-information-card";
import { SliderInformation } from "./enum";
import { DashboardContainer } from "./styles";

export const DashboardPage = () => {
  const initialRender = useRef(true);
  const navigate = useNavigate();

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

  const getDashboardValues = async () => {
    await getLimits();
    await getReadData();
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      getDashboardValues();
    }
  }, []);

  const isLoading = isLoadingLimits || isLoadingReadData;
  const hasError = limitsError || readDataError;

  return (
    <>
      <div className="d-flex gap-3 justify-content-center pb-3">
        <Button type="primary" ghost onClick={() => navigate(AppPath.Profile)}>
          Minha estufa
        </Button>
        <Dropdown
          menu={{
            items: [
              {
                label: "Ao vivo",
                key: AppPath.Photo,
                icon: <CameraOutlined />,
              },
              // {
              //   label: "Time-lapse",
              //   key: AppPath.TimeLapse,
              //   icon: <VideoCameraOutlined />,
              // },
            ],
            onClick: (option) => navigate(option.key),
          }}
          trigger={["click"]}
        >
          <Button type="primary" icon={<DownOutlined />}>
            Visualizar estufa
          </Button>
        </Dropdown>
      </div>

      {hasError && (
        <div className="d-flex flex-column align-items-center pb-3">
          <Typography.Title level={4}>
            Ocorreu um erro ao buscar os dados do dashboard.
          </Typography.Title>
          <Button
            onClick={getDashboardValues}
            type="primary"
            loading={isLoading}
            icon={<ReloadOutlined />}
          >
            Tentar novamente
          </Button>
        </div>
      )}
      <DashboardContainer>
        <SliderInformationCard
          information={SliderInformation.pH}
          isLoadingLimits={isLoadingLimits}
          isLoadingReadData={isLoadingReadData}
          limit={limits?.pH ?? 0}
          readValue={readValues?.pH ?? 0}
        />
        <SliderInformationCard
          information={SliderInformation.WaterTemperature}
          isLoadingLimits={isLoadingLimits}
          isLoadingReadData={isLoadingReadData}
          limit={limits?.waterTemperature ?? 0}
          readValue={readValues?.waterTemperature ?? 0}
        />
        <SliderInformationCard
          information={SliderInformation.Condutivity}
          isLoadingLimits={isLoadingLimits}
          isLoadingReadData={isLoadingReadData}
          limit={limits?.condutivity ?? 0}
          readValue={readValues?.condutivity ?? 0}
        />
        <SliderInformationCard
          information={SliderInformation.Humidity}
          isLoadingLimits={isLoadingLimits}
          isLoadingReadData={isLoadingReadData}
          limit={limits?.humidity ?? 0}
          readValue={readValues?.humidity ?? 0}
        />
        <SliderInformationCard
          information={SliderInformation.AirTemperature}
          isLoadingLimits={isLoadingLimits}
          isLoadingReadData={isLoadingReadData}
          limit={limits?.airTemperature ?? 0}
          readValue={readValues?.airTemperature ?? 0}
        />
      </DashboardContainer>
    </>
  );
};
