import { Button, Form, Input } from "antd";
import { ContentCard } from "components";
import { useChangePassword } from "hooks";
import { useNavigate } from "react-router-dom";
import { AppPath } from "routes";
import { ChangePasswordFormField, ChangePasswordFormValues } from "types";
import { ChangePasswordFormFields } from "./form";

export const ChangePasswordPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { changePassword, isLoading } = useChangePassword();

  const handleChangePassword = async (values: ChangePasswordFormValues) => {
    const response = await changePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });
    if (response) {
      navigate(AppPath.Dashboard);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <ContentCard>
        <Form layout="vertical" onFinish={handleChangePassword} form={form}>
          <Form.Item
            {...ChangePasswordFormFields.oldPassword}
            rules={[ChangePasswordFormFields.oldPassword.validation]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            {...ChangePasswordFormFields.newPassword}
            rules={[ChangePasswordFormFields.newPassword.validation]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            {...ChangePasswordFormFields.confirmPassword}
            rules={[
              ChangePasswordFormFields.confirmPassword.validation,
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    !value ||
                    getFieldValue(ChangePasswordFormField.NewPassword) === value
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("As senhas não coincidem!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="d-flex flex-column align-items-center m-3">
            <Button htmlType="submit" type="primary" loading={isLoading}>
              Alterar senha
            </Button>
          </Form.Item>
        </Form>
      </ContentCard>
    </div>
  );
};
