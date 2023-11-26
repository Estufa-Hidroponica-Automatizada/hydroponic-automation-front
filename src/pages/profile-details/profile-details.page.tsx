import { ActionsBar, ContentCard, ProfileInformation } from "components";
import { UpsertProfileStep, useProfile } from "contexts";
import { useGetCurrentProfile, useSetCurrentProfile } from "hooks";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppPath } from "utils";

export const ProfileDetailsPage = () => {
  const { profileData, setFormStep } = useProfile();
  const [isCurrent, setIsCurrent] = useState(false);
  const initialRender = useRef(true);

  const { setCurrentProfile, isLoading: isLoadingSetCurrentProfile } =
    useSetCurrentProfile();
  const { currentProfile, getCurrentProfile } = useGetCurrentProfile();
  const navigate = useNavigate();

  const checkCurrentProfile = async () => {
    await getCurrentProfile();
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      checkCurrentProfile();
    }
  }, []);

  useEffect(() => {
    setIsCurrent(currentProfile?.id === profileData.id);
  }, [currentProfile]);

  return (
    <div className="d-flex flex-column align-items-center">
      <ContentCard>
        <ProfileInformation />
        <ActionsBar
          buttons={[
            {
              text: "Editar perfil",
              handleClick: () => {
                setFormStep(UpsertProfileStep.ProfileInfo);
                navigate(AppPath.EditProfile);
              },
            },
            {
              text: isCurrent ? "Perfil selecionado" : "Selecionar perfil",
              handleClick: async () => {
                const success = await setCurrentProfile(profileData);
                if (success) {
                  checkCurrentProfile();
                }
              },
              loading: isLoadingSetCurrentProfile,
              disabled: isCurrent,
            },
          ]}
        />
      </ContentCard>
    </div>
  );
};
