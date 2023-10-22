import {
  BulbFilled,
  BulbOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, Form, Switch, TimePicker, Typography } from "antd";
import { ProfileContext } from "contexts";
import { UpsertProfileStep } from "contexts/profile-provider/types";
import { useContext } from "react";
import {
  LightSchedule,
  LightScheduleFormValues,
  UpsertProfileFormField,
} from "types";
import { Validators } from "utils";

export const LightScheduleInput = () => {
  const { profileData, setFormStep, setProfileData } =
    useContext(ProfileContext);
  const [form] = Form.useForm();

  const handleContinue = (data: LightScheduleFormValues) => {
    const schedule: LightSchedule[][] = [];
    data.lightSchedule.map((week) => {
      const weekSchedule: LightSchedule[] = [];
      week.map((weekItem) =>
        weekSchedule.push({
          hour: weekItem.time.hour(),
          minute: weekItem.time.minute(),
          state: weekItem.state,
        })
      );
      schedule.push(weekSchedule);
    });

    setProfileData((prevData) => ({
      ...prevData,
      lightSchedule: schedule,
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
          initialValue={Array.from({ length: profileData.weeksDuration })}
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
                      <Form.List
                        initialValue={Array.from({ length: 1 })}
                        name={fieldName}
                      >
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
          <div className="d-flex justify-content-center gap-2 w-100">
            <Button
              type="primary"
              onClick={() => setFormStep(UpsertProfileStep.ProfileInfo)}
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
