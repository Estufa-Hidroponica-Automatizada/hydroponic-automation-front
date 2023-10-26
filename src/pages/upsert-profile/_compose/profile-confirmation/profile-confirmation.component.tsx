import { Button, Divider, Typography } from "antd";
import { LightScheduleList } from "components";
import { ProfileContext } from "contexts";
import {
  UpsertProfileMode,
  UpsertProfileStep,
} from "contexts/profile-provider/types";
import { useCreateProfile } from "hooks";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppPath } from "routes";
import { RangeInformation } from "types";
import { LimitsTitle, measureFormatter } from "utils";

export const ProfileConfirmation = () => {
  const { createProfile, isLoading } = useCreateProfile();
  const navigate = useNavigate();

  const { profileData, mode, setFormStep } = useContext(ProfileContext);

  const handleContinue = async () => {
    const success = await createProfile(profileData);
    if (success) {
      navigate(AppPath.System);
    }
  };

  return (
    <div className="d-flex flex-column gap-3">
      <Typography.Title level={4} className="m-0 text-center">
        Resumo - Perfil
      </Typography.Title>

      <div className="d-flex align-items-center justify-content-between w-100">
        <Typography.Title level={4} className="m-0">
          Nome
        </Typography.Title>
        <Typography.Text>{profileData.name}</Typography.Text>
      </div>

      <div className="d-flex align-items-center justify-content-between w-100">
        <Typography.Title level={4} className="m-0">
          Duração
        </Typography.Title>
        <Typography.Text>{profileData.weeksDuration} semanas</Typography.Text>
      </div>

      {Array.from({ length: profileData.weeksDuration }).map((_, week) => (
        <>
          <Divider className="m-0" />
          <div className="d-flex flex-column align-items-center justify-content-center gap-1">
            <Typography.Title level={4} className="m-0">
              Semana {week + 1}
            </Typography.Title>

            <div className="d-flex flex-column align-items-center justify-content-center gap-1">
              <Typography.Title level={5} className="m-0">
                Cronograma - Luz
              </Typography.Title>

              <LightScheduleList
                lightSchedule={profileData.lightSchedule[week]}
              />
            </div>

            <div className="d-flex align-items-center justify-content-between w-100">
              <Typography.Title level={5} className="m-0">
                {LimitsTitle.pH}
              </Typography.Title>
              <Typography.Text>
                {measureFormatter(
                  profileData.pH[week].min,
                  RangeInformation.pH
                )}{" "}
                -{" "}
                {measureFormatter(
                  profileData.pH[week].max,
                  RangeInformation.pH
                )}
              </Typography.Text>
            </div>

            <div className="d-flex align-items-center justify-content-between w-100">
              <Typography.Title level={5} className="m-0">
                {LimitsTitle.condutivity}
              </Typography.Title>
              <Typography.Text>
                {measureFormatter(
                  profileData.condutivity[week].min,
                  RangeInformation.Condutivity
                )}{" "}
                -{" "}
                {measureFormatter(
                  profileData.condutivity[week].max,
                  RangeInformation.Condutivity
                )}
              </Typography.Text>
            </div>

            <div className="d-flex align-items-center justify-content-between w-100">
              <Typography.Title level={5} className="m-0">
                {LimitsTitle.waterTemperature}
              </Typography.Title>
              <Typography.Text>
                {measureFormatter(
                  profileData.waterTemperature[week].min,
                  RangeInformation.WaterTemperature
                )}{" "}
                -{" "}
                {measureFormatter(
                  profileData.waterTemperature[week].max,
                  RangeInformation.WaterTemperature
                )}
              </Typography.Text>
            </div>

            <div className="d-flex align-items-center justify-content-between w-100">
              <Typography.Title level={5} className="m-0">
                {LimitsTitle.airTemperature}
              </Typography.Title>
              <Typography.Text>
                {measureFormatter(
                  profileData.airTemperature[week].min,
                  RangeInformation.AirTemperature
                )}{" "}
                -{" "}
                {measureFormatter(
                  profileData.airTemperature[week].max,
                  RangeInformation.AirTemperature
                )}
              </Typography.Text>
            </div>

            <div className="d-flex align-items-center justify-content-between w-100">
              <Typography.Title level={5} className="m-0">
                {LimitsTitle.humidity}
              </Typography.Title>
              <Typography.Text>
                {measureFormatter(
                  profileData.humidity[week].min,
                  RangeInformation.Humidity
                )}{" "}
                -{" "}
                {measureFormatter(
                  profileData.humidity[week].max,
                  RangeInformation.Humidity
                )}
              </Typography.Text>
            </div>

            <div className="d-flex align-items-center justify-content-between w-100">
              <Typography.Title level={5} className="m-0">
                Nutriente A / Nutriente B
              </Typography.Title>
              <Typography.Text>
                {profileData.nutrientsProportion[week].nutrientA} /{" "}
                {profileData.nutrientsProportion[week].nutrientB}
              </Typography.Text>
            </div>
          </div>
        </>
      ))}

      <div className="d-flex justify-content-center gap-2 w-100">
        <Button
          type="primary"
          onClick={() => setFormStep(UpsertProfileStep.NutrientsProportion)}
          disabled={isLoading}
          block
          ghost
        >
          Voltar
        </Button>

        <Button
          onClick={handleContinue}
          type="primary"
          loading={isLoading}
          block
        >
          {mode === UpsertProfileMode.Create ? "Criar perfil" : "Editar perfil"}
        </Button>
      </div>
    </div>
  );
};
