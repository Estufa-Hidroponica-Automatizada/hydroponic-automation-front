import { Button, Form, Input, Typography } from "antd";
import { IntegerInput } from "components";
import { ProfileContext } from "contexts";
import { UpsertProfileStep } from "contexts/profile-provider/types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileInfoFormValues } from "types";
import { Validators } from "utils";
import { UpsertProfileFormFields } from "../../form";

export const ProfileInfoInput = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { setProfileData, setFormStep } = useContext(ProfileContext);

  const [weeksDuration, setWeeksDuration] = useState(1);

  const handleContinue = (data: ProfileInfoFormValues) => {
    setProfileData((prevData) => ({
      ...prevData,
      name: data.name,
      weeksDuration: weeksDuration,
    }));
    setFormStep(UpsertProfileStep.LightSchedule);
  };

  return (
    <Form layout="vertical" onFinish={handleContinue} form={form}>
      <div className="d-flex flex-column gap-3">
        <Typography.Title level={4} className="m-0 text-center">
          Informações do perfil
        </Typography.Title>

        <Form.Item
          {...UpsertProfileFormFields.name}
          rules={[Validators.required]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...UpsertProfileFormFields.weeksDuration}>
          <IntegerInput
            currentValue={weeksDuration}
            minValue={1}
            setValue={setWeeksDuration}
          />
        </Form.Item>

        <Form.Item className="m-0">
          <div className="d-flex justify-content-center gap-2 w-100">
            <Button type="primary" onClick={() => navigate(-1)} block ghost>
              Voltar
            </Button>

            <Button htmlType="submit" type="primary" block>
              Avançar
            </Button>
          </div>
        </Form.Item>
      </div>
    </Form>
  );
};