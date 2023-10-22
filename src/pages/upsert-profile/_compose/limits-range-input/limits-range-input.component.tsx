import { Button, Form, Typography } from "antd";
import { LimitsSlider } from "components";
import { ProfileContext } from "contexts";
import { useContext } from "react";
import {
  Limit,
  LimitsRangeFormValues,
  RangeInformation,
  UpsertProfileFormField,
} from "types";
import { LimitsTitle } from "utils";
import { nextStep, previousStep } from "./utils";

interface LimitsRangeInputProps {
  information: RangeInformation;
}

export const LimitsRangeInput = ({ information }: LimitsRangeInputProps) => {
  const { profileData, setFormStep, setProfileData } =
    useContext(ProfileContext);
  const [form] = Form.useForm();

  const handleContinue = (data: LimitsRangeFormValues) => {
    const limits: Limit[] = [];

    data.limitsRange.map((limit) =>
      limits.push({ min: limit[0], max: limit[1] })
    );

    setProfileData((prevData) => ({
      ...prevData,
      [information]: limits,
    }));

    setFormStep(nextStep[information]);
  };

  return (
    <Form layout="vertical" onFinish={handleContinue} form={form}>
      <div className="d-flex flex-column gap-3">
        <Typography.Title level={4} className="m-0 text-center">
          Limites - {LimitsTitle[information]}
        </Typography.Title>

        <Form.List
          initialValue={Array.from({ length: profileData.weeksDuration })}
          name={UpsertProfileFormField.LimitsRange}
        >
          {(fields) => (
            <div className="d-flex flex-column gap-3">
              {fields.map(({ key: fieldKey, name: fieldName }, fieldIndex) => (
                <div
                  className="d-flex flex-column align-items-center gap-1"
                  key={fieldKey}
                >
                  <Typography.Title level={5} className="m-0 text-center">
                    Semana {fieldIndex + 1}
                  </Typography.Title>

                  <div className="w-100">
                    <LimitsSlider
                      information={information}
                      formId={fieldName}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Form.List>

        <Form.Item className="m-0">
          <div className="d-flex justify-content-center gap-2 w-100">
            <Button
              type="primary"
              onClick={() => setFormStep(previousStep[information])}
              block
              ghost
            >
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
