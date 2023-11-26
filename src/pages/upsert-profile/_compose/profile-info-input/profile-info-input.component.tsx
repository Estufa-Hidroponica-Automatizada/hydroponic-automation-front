import { Form, Input, Typography } from "antd";
import { IntegerInput } from "components";
import { UpsertProfileStep, useProfile } from "contexts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileInfoFormValues } from "types";
import { Validators } from "utils";
import { UpsertProfileFormFields } from "../../form";
import { UpsertProfileFooter } from "../upsert-profile-footer";

export const ProfileInfoInput = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { profileData, setProfileData, setFormStep } = useProfile();

  const [weeksDuration, setWeeksDuration] = useState(profileData.weeksDuration);

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
          initialValue={profileData.name}
        >
          <Input />
        </Form.Item>

        <Form.Item {...UpsertProfileFormFields.weeksDuration}>
          <IntegerInput
            currentValue={weeksDuration}
            handleChange={(value: number) => setWeeksDuration(value)}
            minValue={1}
          />
        </Form.Item>

        <Form.Item className="m-0">
          <UpsertProfileFooter handleBack={() => navigate(-1)} />
        </Form.Item>
      </div>
    </Form>
  );
};
