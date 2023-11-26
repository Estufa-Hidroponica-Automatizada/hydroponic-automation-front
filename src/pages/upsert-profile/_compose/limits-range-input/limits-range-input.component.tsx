import { Form, Typography } from "antd";
import { LimitsSlider } from "components";
import { useProfile } from "contexts";
import {
  LimitsRangeFormValues,
  RangeInformation,
  UpsertProfileFormField,
} from "types";
import { LimitsTitle } from "utils";
import { UpsertProfileFooter } from "../upsert-profile-footer";
import {
  adaptFormValuesToLimits,
  limitsRangeInitialValues,
  nextStep,
  previousStep,
} from "./utils";

interface LimitsRangeInputProps {
  information: RangeInformation;
}

export const LimitsRangeInput = ({ information }: LimitsRangeInputProps) => {
  const { profileData, setFormStep, setProfileData } = useProfile();
  const [form] = Form.useForm();

  const handleContinue = (data: LimitsRangeFormValues) => {
    setProfileData((prevData) => ({
      ...prevData,
      [information]: adaptFormValuesToLimits(data),
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
          initialValue={limitsRangeInitialValues(profileData, information)}
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
          <UpsertProfileFooter
            handleBack={() => setFormStep(previousStep[information])}
          />
        </Form.Item>
      </div>
    </Form>
  );
};
