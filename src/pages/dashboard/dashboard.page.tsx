import { Layout, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { ContentContainer, PageHeader } from "../../components";

export const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader />

      <Content>
        <ContentContainer>
          <Typography.Title style={{ textAlign: "center" }}>
            Dashboard page
          </Typography.Title>
        </ContentContainer>
      </Content>
    </Layout>
  );
};
