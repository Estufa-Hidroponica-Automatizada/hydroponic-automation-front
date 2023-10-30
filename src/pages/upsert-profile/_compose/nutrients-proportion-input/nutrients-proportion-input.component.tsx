import { Typography } from "antd";
import { IntegerInput } from "components";
import { ProfileContext } from "contexts";
import { UpsertProfileStep } from "contexts/profile-provider/types";
import { useContext, useState } from "react";
import { NutrientsProportion } from "types";
import { UpsertProfileFooter } from "../upsert-profile-footer";
import { nutrientsProportionInitialValues } from "./utils";

export const NutrientsProportionInput = () => {
  const { profileData, setFormStep, setProfileData } =
    useContext(ProfileContext);

  const [nutrientsProportion, setNutrientsProportion] = useState<
    NutrientsProportion[]
  >(nutrientsProportionInitialValues(profileData));

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
        {Array.from({ length: profileData.weeksDuration }).map((_, index) => (
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

      <UpsertProfileFooter
        handleBack={() => setFormStep(UpsertProfileStep.HumidityLimits)}
        handleContinue={handleContinue}
      />
    </div>
  );
};
