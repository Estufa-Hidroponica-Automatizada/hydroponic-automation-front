import { Button, Form, Input, Typography } from "antd";
import { ContentCard } from "components";
import { useLogin } from "hooks";
import { Login } from "types";
import { Validators } from "utils";
import { LoginFormFields } from "./form";

export const LoginPage = () => {
  const [form] = Form.useForm();
  const { login, isLoading } = useLogin();

  const handleLogin = async (loginData: Login) => {
    await login(loginData);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <ContentCard>
        <Form layout="vertical" onFinish={handleLogin} form={form}>
          <Form.Item
            {...LoginFormFields.username}
            rules={[Validators.required]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...LoginFormFields.password}
            rules={[Validators.required]}
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
          Conecte-se para acompanhar o status do seu sistema de qualquer lugar!
        </Typography.Paragraph>
      </ContentCard>
    </div>
  );
};
