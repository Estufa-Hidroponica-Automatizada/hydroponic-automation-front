import { RightOutlined } from "@ant-design/icons";
import { Button, Form, Input, Layout, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import Link from "antd/es/typography/Link";
import { useNavigate } from "react-router-dom";
import { ContentContainer, PageHeader } from "../../components";
import { useLogin } from "../../hooks/login";
import { LoginFormFields } from "./form";
import { FormContainer } from "./styles";

export const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login, isLoading } = useLogin();

  // TO DO: improve login call
  const handleLogin = async (values: any) => {
    const loginResponse = await login();
    if (!loginResponse) {
      console.log(values);
      navigate("/dashboard");
    }
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
                  <Button htmlType="submit" type="primary" loading={isLoading}>
                    Conectar
                  </Button>
                </Form.Item>
              </Form>
              <Typography.Paragraph className="text-center">
                Conecte-se para acompanhar o status do seu sistema de qualquer
                lugar!
              </Typography.Paragraph>
              <Link
                onClick={() => console.log("TO DO")}
                className="d-flex gap-1 align-self-center"
              >
                Esqueci minha senha
                <RightOutlined />
              </Link>
            </FormContainer>
          </div>
        </ContentContainer>
      </Content>
    </Layout>
  );
};
