import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { ContentContainer, PageHeader } from "../../components";
import { SliderInformationCard } from "./_compose/slider-information-card";
import { SliderInformation } from "./enum";
import { DashboardContainer } from "./styles";

export const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader />

      <Content>
        <ContentContainer>
          <DashboardContainer>
            <SliderInformationCard information={SliderInformation.pH} />
            <SliderInformationCard
              information={SliderInformation.AirTemperature}
            />
            <SliderInformationCard information={SliderInformation.Humidity} />
            <SliderInformationCard
              information={SliderInformation.Condutivity}
            />
          </DashboardContainer>
        </ContentContainer>
      </Content>
    </Layout>
  );
};
