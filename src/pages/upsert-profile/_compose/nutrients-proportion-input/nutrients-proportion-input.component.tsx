import { Button, Form, Typography } from "antd";
import { IntegerInput } from "components";
import { ProfileContext } from "contexts";
import { UpsertProfileStep } from "contexts/profile-provider/types";
import { useContext, useState } from "react";
import { NutrientsProportion } from "types";

export const NutrientsProportionInput = () => {
  const { profileData, setFormStep, setProfileData } =
    useContext(ProfileContext);

  const initialProportions = Array.from(
    { length: profileData.weeksDuration },
    () => ({
      nutrientA: 1,
      nutrientB: 1,
    })
  );

  const [nutrientsProportion, setNutrientsProportion] =
    useState<NutrientsProportion[]>(initialProportions);

  const [form] = Form.useForm();

  const handleChangeValue = (
    value: number,
    nutrient: "nutrientA" | "nutrientB",
    index: number
  ) => {
    var updatedValue = [...nutrientsProportion];
    updatedValue[index] = { ...updatedValue[index], [nutrient]: value };
    setNutrientsProportion(updatedValue);
  };

  const handleContinue = () => {
    setProfileData((prevData) => ({
      ...prevData,
      nutrientsProportion: nutrientsProportion,
    }));

    setFormStep(UpsertProfileStep.ProfileConfirmation);
  };

  return (
    <div className="d-flex flex-column gap-3">
      <Typography.Title level={4} className="m-0 text-center">
        Proporção - Nutrientes
      </Typography.Title>

      <div className="d-flex flex-column gap-3">
        {initialProportions.map((_, index) => (
          <div
            className="d-flex flex-column align-items-center gap-1"
            key={`nutrientsProportion_week${index}`}
          >
            <Typography.Title level={5} className="m-0 text-center">
              Semana {index + 1}
            </Typography.Title>

            <div className="d-flex gap-3 w-100">
              <div className="d-flex flex-column align-items-center w-50">
                <Typography.Title level={5} className="m-0 text-center">
                  Nutriente A
                </Typography.Title>
                <div className="w-100">
                  <IntegerInput
                    currentValue={nutrientsProportion[index].nutrientA}
                    handleChange={(value: number) =>
                      handleChangeValue(value, "nutrientA", index)
                    }
                    minValue={0}
                  />
                </div>
              </div>
              <div className="d-flex flex-column align-items-center w-50">
                <Typography.Title level={5} className="m-0 text-center">
                  Nutriente B
                </Typography.Title>
                <div className="w-100">
                  <IntegerInput
                    currentValue={nutrientsProportion[index].nutrientB}
                    handleChange={(value: number) =>
                      handleChangeValue(value, "nutrientB", index)
                    }
                    minValue={0}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-2 w-100">
        <Button
          type="primary"
          onClick={() => setFormStep(UpsertProfileStep.HumidityLimits)}
          block
          ghost
        >
          Voltar
        </Button>

        <Button onClick={handleContinue} type="primary" block>
          Avançar
        </Button>
      </div>
    </div>
  );
};
