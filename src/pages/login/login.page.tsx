import { Button, Form, Input, Layout, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ContentContainer, PageHeader } from "../../components";
import { Theme } from "../../utils";
import { LoginFormFields } from "./form";
import { FormContainer } from "./styles";

export const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = (values: any) => {
    // TO DO: INTEGRAR LOGIN
    navigate("/dashboard");
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

                <Form.Item className="d-flex flex-column align-items-center m-3">
                  <Button
                    type="primary"
                    style={{ backgroundColor: Theme.primary.medium }}
                    htmlType="submit"
                  >
                    Conectar
                  </Button>
                </Form.Item>
              </Form>
              <Typography.Paragraph style={{ textAlign: "center" }}>
                Conecte-se para acompanhar o status do seu sistema de qualquer
                lugar!
              </Typography.Paragraph>
            </FormContainer>
          </div>
        </ContentContainer>
      </Content>
    </Layout>
  );
};
