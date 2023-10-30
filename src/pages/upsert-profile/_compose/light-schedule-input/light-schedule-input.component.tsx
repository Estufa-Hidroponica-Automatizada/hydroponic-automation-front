import {
  BulbFilled,
  BulbOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, Form, Switch, TimePicker, Typography } from "antd";
import { ProfileContext } from "contexts";
import { UpsertProfileStep } from "contexts/profile-provider/types";
import { useContext } from "react";
import { LightScheduleFormValues, UpsertProfileFormField } from "types";
import { Validators } from "utils";
import { UpsertProfileFooter } from "../upsert-profile-footer";
import {
  adaptFormValuesToLightSchedule,
  lightScheduleInitialValues,
} from "./utils";

export const LightScheduleInput = () => {
  const { profileData, setFormStep, setProfileData } =
    useContext(ProfileContext);
  const [form] = Form.useForm();

  const handleContinue = (data: LightScheduleFormValues) => {
    setProfileData((prevData) => ({
      ...prevData,
      lightSchedule: adaptFormValuesToLightSchedule(data),
    }));
    setFormStep(UpsertProfileStep.pHLimits);
  };

  return (
    <Form layout="vertical" onFinish={handleContinue} form={form}>
      <div className="d-flex flex-column gap-3">
        <Typography.Title level={4} className="m-0 text-center">
          Cronograma - Luz
        </Typography.Title>

        <Form.List
          initialValue={lightScheduleInitialValues(profileData)}
          name={UpsertProfileFormField.LightSchedule}
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
                    <Form.Item>
                      <Form.List name={fieldName}>
                        {(
                          subFields,
                          { add: addSubField, remove: removeSubField }
                        ) => (
                          <div className="d-flex flex-column gap-2 w-100">
                            {subFields.map(
                              (
                                { key: subFieldKey, name: subFieldName },
                                subFieldIndex
                              ) => (
                                <div
                                  className="d-flex align-items-center justify-content-between"
                                  key={subFieldKey}
                                >
                                  <Form.Item
                                    name={[
                                      subFieldName,
                                      UpsertProfileFormField.LightScheduleTime,
                                    ]}
                                    rules={[Validators.required]}
                                    className="m-0"
                                  >
                                    <TimePicker
                                      placeholder="Selecionar horário"
                                      style={{ width: "12rem" }}
                                      showNow={false}
                                      minuteStep={5}
                                      format="HH:mm"
                                      inputReadOnly
                                      changeOnBlur
                                    />
                                  </Form.Item>

                                  <div className="d-flex gap-1 align-items-center">
                                    <BulbOutlined />
                                    <Form.Item
                                      name={[
                                        subFieldName,
                                        UpsertProfileFormField.LightScheduleState,
                                      ]}
                                      valuePropName="checked"
                                      initialValue={false}
                                      className="m-0"
                                    >
                                      <Switch />
                                    </Form.Item>
                                    <BulbFilled />
                                  </div>

                                  <Button
                                    shape="circle"
                                    icon={<MinusCircleOutlined />}
                                    type="text"
                                    onClick={() => removeSubField(subFieldName)}
                                    disabled={
                                      subFields.length === 1 ||
                                      subFieldIndex + 1 < subFields.length
                                    }
                                  />
                                </div>
                              )
                            )}
                            <Button
                              type="dashed"
                              onClick={() => addSubField()}
                              block
                            >
                              + Adicionar
                            </Button>
                          </div>
                        )}
                      </Form.List>
                    </Form.Item>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Form.List>

        <Form.Item className="m-0">
          <UpsertProfileFooter
            handleBack={() => setFormStep(UpsertProfileStep.ProfileInfo)}
          />
        </Form.Item>
      </div>
    </Form>
  );
};
