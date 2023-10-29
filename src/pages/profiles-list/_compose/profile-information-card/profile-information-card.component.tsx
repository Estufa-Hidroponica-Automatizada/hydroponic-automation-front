import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { ContentCard } from "components";
import { ProfileContext } from "contexts";
import { UpsertProfileStep } from "contexts/profile-provider/types";
import { useDeleteProfile, useSetCurrentProfile } from "hooks";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppPath } from "routes";
import { ProfileData } from "types";

interface ProfileInformationCardProps {
  isCurrent: boolean;
  profile: ProfileData;
  refreshList: () => void;
}

export const ProfileInformationCard = ({
  isCurrent,
  profile,
  refreshList,
}: ProfileInformationCardProps) => {
  const { setFormStep, setProfileData } = useContext(ProfileContext);
  const { deleteProfile, isLoading } = useDeleteProfile();
  const { setCurrentProfile, isLoading: isLoadingSetCurrentProfile } =
    useSetCurrentProfile();
  const navigate = useNavigate();

  const handleSelectProfile = async () => {
    const success = await setCurrentProfile(profile);
    if (success) {
      refreshList();
    }
  };

  const handleDelete = async () => {
    const success = await deleteProfile(profile);
    if (success) {
      refreshList();
    }
  };

  return (
    <ContentCard>
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between">
          <Button
            icon={<DeleteOutlined />}
            loading={isLoading}
            onClick={handleDelete}
            disabled={isCurrent}
            shape="circle"
            type="text"
          />

          <Typography.Title level={4} className="m-0 text-center">
            {profile.name}
          </Typography.Title>

          <Button
            icon={<EyeOutlined />}
            disabled={isLoading}
            onClick={() => console.log()}
            shape="circle"
            type="text"
          />
        </div>

        <div className="d-flex align-items-center justify-content-between w-100">
          <Typography.Title level={5} className="m-0">
            Duração
          </Typography.Title>
          <Typography.Text>{profile.humidity.length} semanas</Typography.Text>
        </div>

        <div className="d-flex justify-content-center gap-2 pt-3 w-100">
          <Button
            type="primary"
            onClick={() => {
              setFormStep(UpsertProfileStep.ProfileInfo);
              setProfileData(profile);
              navigate(AppPath.EditProfile);
            }}
            block
            ghost
          >
            Editar perfil
          </Button>

          <Button
            type="primary"
            onClick={handleSelectProfile}
            loading={isLoadingSetCurrentProfile}
            disabled={isCurrent}
            block
          >
            {isCurrent ? "Perfil selecionado" : "Selecionar perfil"}
          </Button>
        </div>
      </div>
    </ContentCard>
  );
};