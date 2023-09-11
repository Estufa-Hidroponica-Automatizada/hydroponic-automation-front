import { Button, Form, Input, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { ContentContainer } from "../../components/content-container";
import { PageHeader } from "../../components/header";
import { Theme } from "../../utils/theme";
import { LoginFormFields } from "./form";
import { FormContainer } from "./styles";

export const LoginPage: React.FC = () => {
  const [form] = Form.useForm();

  const handleLogin = (values: any) => {
    // TO DO: INTEGRAR LOGIN
    console.log("LOGIN: ", values);
  };

  return (
    <Layout>
      <PageHeader />

      <Content>
        <ContentContainer>
          <div className="d-flex flex-column align-items-center">
            <FormContainer>
              <Form layout="vertical" onFinish={handleLogin} form={form}>
                <Form.Item
                  {...LoginFormFields.systemID}
                  rules={[LoginFormFields.systemID.validation]}
                >
                  <Input className="d-flex flex-column" />
                </Form.Item>

                <Form.Item
                  {...LoginFormFields.password}
                  rules={[LoginFormFields.password.validation]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item className="d-flex flex-column align-items-center m-0">
                  <Button
                    type="primary"
                    style={{ backgroundColor: Theme.primary.medium }}
                    htmlType="submit"
                  >
                    Conectar ao sistema
                  </Button>
                </Form.Item>
              </Form>
            </FormContainer>
          </div>
        </ContentContainer>
      </Content>
    </Layout>
  );
};
