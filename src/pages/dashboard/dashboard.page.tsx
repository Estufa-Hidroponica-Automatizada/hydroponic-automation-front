import {
  CameraOutlined,
  DownOutlined,
  ReloadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, MenuProps, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useRef } from "react";
import { ContentContainer, PageHeader } from "../../components";
import { useLimits } from "../../hooks/limits";
import { useReadData } from "../../hooks/read-data";
import { SliderInformationCard } from "./_compose/slider-information-card";
import { SliderInformation } from "./enum";
import { DashboardContainer } from "./styles";

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

  const menuOptions = [
    {
      label: "Ao vivo",
      key: "photo",
      icon: <CameraOutlined />,
    },
    {
      label: "Time-lapse",
      key: "timelapse",
      icon: <VideoCameraOutlined />,
    },
  ];


  const handleDropdownClick: MenuProps["onClick"] = async (option) => {
    // TO DO: REDIRECT
  };


  return (
    <Layout>
      <PageHeader />

      <Content>
        <ContentContainer>
          <div className="d-flex gap-3 justify-content-center pb-3">
            <Button type="primary" ghost>
              Acessar meu perfil
            </Button>
            <Dropdown
              menu={{ items: menuOptions, onClick: handleDropdownClick }}
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
              information={SliderInformation.AirTemperature}
              isLoadingLimits={isLoadingLimits}
              isLoadingReadData={isLoadingReadData}
              limit={limits?.airTemperature ?? 0}
              readValue={readValues?.airTemperature ?? 0}
            />
            <SliderInformationCard
              information={SliderInformation.Humidity}
              isLoadingLimits={isLoadingLimits}
              isLoadingReadData={isLoadingReadData}
              limit={limits?.humidity ?? 0}
              readValue={readValues?.humidity ?? 0}
            />
            <SliderInformationCard
              information={SliderInformation.Condutivity}
              isLoadingLimits={isLoadingLimits}
              isLoadingReadData={isLoadingReadData}
              limit={limits?.condutivity ?? 0}
              readValue={readValues?.condutivity ?? 0}
            />
          </DashboardContainer>
        </ContentContainer>
      </Content>
    </Layout>
  );
};
