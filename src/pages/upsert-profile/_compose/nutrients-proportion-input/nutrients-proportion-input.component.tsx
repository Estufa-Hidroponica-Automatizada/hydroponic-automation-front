import { Typography } from "antd";
import { IntegerInput } from "components";
import { UpsertProfileStep, useProfile } from "contexts";
import { useState } from "react";
import { NutrientProportion } from "types";
import { UpsertProfileFooter } from "../upsert-profile-footer";
import { nutrientProportionInitialValues } from "./utils";

export const NutrientsProportionInput = () => {
  const { profileData, setFormStep, setProfileData } = useProfile();

  const [nutrientProportion, setNutrientProportion] = useState<
    NutrientProportion[]
  >(nutrientProportionInitialValues(profileData));

  const handleChangeValue = (
    value: number,
    nutrient: "nutrientA" | "nutrientB",
    index: number
  ) => {
    var updatedValue = [...nutrientProportion];
    updatedValue[index] = { ...updatedValue[index], [nutrient]: value };
    setNutrientProportion(updatedValue);
  };

  const handleContinue = () => {
    setProfileData((prevData) => ({
      ...prevData,
      nutrientProportion: nutrientProportion,
    }));

    setFormStep(UpsertProfileStep.ProfileConfirmation);
  };

  return (
    <div className="d-flex flex-column gap-3">
      <Typography.Title level={4} className="m-0 text-center">
        Proporção - Nutrientes
      </Typography.Title>

      <div className="d-flex flex-column gap-3">
        {Array.from({ length: profileData.weeksDuration }).map((_, index) => (
          <div
            className="d-flex flex-column align-items-center gap-1"
            key={`nutrientProportion_week${index}`}
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
                    currentValue={nutrientProportion[index].nutrientA}
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
                    currentValue={nutrientProportion[index].nutrientB}
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

      <UpsertProfileFooter
        handleBack={() => setFormStep(UpsertProfileStep.HumidityLimits)}
        handleContinue={handleContinue}
      />
    </div>
  );
};
