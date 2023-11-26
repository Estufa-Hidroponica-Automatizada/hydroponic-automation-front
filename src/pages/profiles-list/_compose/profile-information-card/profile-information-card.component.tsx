import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { ActionsBar, ContentCard } from "components";
import { UpsertProfileStep, useProfile } from "contexts";
import { useDeleteProfile, useSetCurrentProfile } from "hooks";
import { useNavigate } from "react-router-dom";
import { ProfileData } from "types";
import { AppPath } from "utils";

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
  const { setFormStep, setProfileData } = useProfile();
  const { deleteProfile, isLoading: isLoadingDeleteProfile } =
    useDeleteProfile();
  const { setCurrentProfile, isLoading: isLoadingSetCurrentProfile } =
    useSetCurrentProfile();
  const navigate = useNavigate();

  const handleSelectProfile = async () => {
    const success = await setCurrentProfile(profile);
    if (success) {
      refreshList();
    }
  };

  const handleDeleteProfile = async () => {
    const success = await deleteProfile(profile);
    if (success) {
      refreshList();
    }
  };

  const handleViewProfileDetails = () => {
    setProfileData(profile);
    navigate(AppPath.ProfileDetails);
  };

  return (
    <ContentCard>
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between">
          <Button
            icon={<DeleteOutlined />}
            loading={isLoadingDeleteProfile}
            onClick={handleDeleteProfile}
            disabled={isCurrent || isLoadingSetCurrentProfile}
            shape="circle"
            type="text"
          />

          <Typography.Title level={4} className="m-0 text-center">
            {profile.name}
          </Typography.Title>

          <Button
            icon={<EyeOutlined />}
            disabled={isLoadingDeleteProfile || isLoadingSetCurrentProfile}
            onClick={handleViewProfileDetails}
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

        <ActionsBar
          buttons={[
            {
              text: "Editar perfil",
              handleClick: () => {
                setFormStep(UpsertProfileStep.ProfileInfo);
                setProfileData(profile);
                navigate(AppPath.EditProfile);
              },
              disabled: isLoadingDeleteProfile || isLoadingSetCurrentProfile,
            },
            {
              text: isCurrent ? "Perfil selecionado" : "Selecionar perfil",
              handleClick: handleSelectProfile,
              loading: isLoadingSetCurrentProfile,
              disabled: isCurrent || isLoadingDeleteProfile,
            },
          ]}
        />
      </div>
    </ContentCard>
  );
};
