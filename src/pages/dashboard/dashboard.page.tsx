import { Button, Layout, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useRef } from "react";
import { ContentContainer, PageHeader } from "../../components";
import { useLimits } from "../../hooks/limits";
import { useReadData } from "../../hooks/read-data";
import { Theme } from "../../utils";
import { SliderInformationCard } from "./_compose/slider-information-card";
import { SliderInformation } from "./enum";
import { DashboardContainer } from "./styles";

export const DashboardPage: React.FC = () => {
  const {
    error: limitError,
    getLimits,
    isLoading: limitLoading,
    limits,
  } = useLimits();

  const {
    error: readDataError,
    getReadData,
    isLoading: isLoadingReadData,
    readValues,
  } = useReadData();

  const initialRender = useRef(true);

  useEffect(() => {
    const getDashboardValues = async () => {
      await getLimits();
      await getReadData();
    };

    if (initialRender.current) {
      getDashboardValues();
      initialRender.current = false;
    }
  }, []);

  const isLoading = limitLoading || isLoadingReadData;
  const hasError = limitError || readDataError;

  return (
    <Layout>
      <PageHeader />

      <Content>
        <ContentContainer>
          <DashboardContainer>
            {hasError ? (
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
                  isLoading={isLoading}
                  limit={limits?.pH ?? 0}
                  readValue={readValues?.pH ?? 0}
                />
                <SliderInformationCard
                  information={SliderInformation.AirTemperature}
                  isLoading={isLoading}
                  limit={limits?.airTemperature ?? 0}
                  readValue={readValues?.airTemperature ?? 0}
                />
                <SliderInformationCard
                  information={SliderInformation.Humidity}
                  isLoading={isLoading}
                  limit={limits?.humidity ?? 0}
                  readValue={readValues?.humidity ?? 0}
                />
                <SliderInformationCard
                  information={SliderInformation.Condutivity}
                  isLoading={isLoading}
                  limit={limits?.condutivity ?? 0}
                  readValue={readValues?.condutivity ?? 0}
                />
              </>
            )}
          </DashboardContainer>
        </ContentContainer>
      </Content>
    </Layout>
  );
};
