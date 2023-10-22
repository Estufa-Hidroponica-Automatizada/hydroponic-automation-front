import { Divider, Typography } from "antd";
import { ContentCard } from "components";
import { ProfileContext } from "contexts";
import { UpsertProfileStep } from "contexts/profile-provider/types";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { LightScheduleInput } from "./_compose/light-schedule-input";
import { ProfileInfoInput } from "./_compose/profile-info-input";

export const UpsertProfilePage = () => {
  const location = useLocation();

  const isEditing = location.pathname.includes("edit");

  const { formStep } = useContext(ProfileContext);

  return (
    <div className="d-flex flex-column align-items-center">
      <ContentCard>
        <div className="d-flex flex-column justify-content-between h-100">
          <Typography.Title level={2} className="m-0 text-center">
            {isEditing ? "Editar perfil" : "Adicionar perfil"}
          </Typography.Title>

          <Divider className="my-2" />

          {formStep === UpsertProfileStep.ProfileInfo ? (
            <ProfileInfoInput />
          ) : (
            formStep === UpsertProfileStep.LightSchedule && (
              <LightScheduleInput />
            )
          )}
        </div>
      </ContentCard>
    </div>
  );
};
