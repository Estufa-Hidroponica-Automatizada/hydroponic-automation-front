import { LoadingOutlined } from "@ant-design/icons";
import { Button, Layout, Typography, message } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import { ContentContainer, PageHeader } from "../../components";
import { useLimits } from "../../hooks/limits";
import { useSensorsData } from "../../hooks/sensors-data";
import { Theme } from "../../utils";
import { SliderInformationCard } from "./_compose/slider-information-card";
import { SliderInformation } from "./enum";
import { DashboardContainer } from "./styles";

export const DashboardPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const {
    error: limitError,
    getLimits,
    isLoading: limitLoading,
    limits,
  } = useLimits();
  const {
    error: sensorsDataError,
    getSensorsData,
    isLoading: sensorsDataLoading,
    sensorsData,
  } = useSensorsData();

  const getDashboardValues = async () => {
    await getLimits();
    await getSensorsData();
  };

  useEffect(() => {
    getDashboardValues();
  }, [getLimits, getSensorsData]);

  useEffect(() => {
    if (limitError) {
      messageApi.error(
        "Ocorreu um erro ao fazer a listagem dos limites estabelecidos."
      );
    }
  }, [limitError]);

  useEffect(() => {
    if (sensorsDataError) {
      messageApi.error(
        "Ocorreu um erro ao fazer a listagem dos valores lidos."
      );
    }
  }, [sensorsDataError]);

  const isLoading = limitLoading || sensorsDataLoading;
  const hasError = limitError || sensorsDataError;
  return (
    <Layout>
      {contextHolder}
      <PageHeader />

      <Content>
        <ContentContainer>
          <DashboardContainer>
            {isLoading ? (
              <LoadingOutlined style={{ fontSize: 64 }} />
            ) : hasError ? (
              <div className="d-flex flex-column align-items-center">
                <Typography.Title level={4}>
                  Ocorreu um erro ao buscar os dados do dashboard.
                </Typography.Title>
                <Button
                  type="primary"
                  style={{ backgroundColor: Theme.primary.medium }}
                >
                  Tentar novamente
                </Button>
              </div>
            ) : (
              <>
                <SliderInformationCard
                  information={SliderInformation.pH}
                  limit={limits?.pH}
                  readValue={sensorsData?.pH}
                />
                <SliderInformationCard
                  information={SliderInformation.AirTemperature}
                  limit={limits?.airTemperature}
                  readValue={sensorsData?.airTemperature}
                />
                <SliderInformationCard
                  information={SliderInformation.Humidity}
                  limit={limits?.humidity}
                  readValue={sensorsData?.humidity}
                />
                <SliderInformationCard
                  information={SliderInformation.Condutivity}
                  limit={limits?.condutivity}
                  readValue={sensorsData?.condutivity}
                />
              </>
            )}
          </DashboardContainer>
        </ContentContainer>
      </Content>
    </Layout>
  );
};
