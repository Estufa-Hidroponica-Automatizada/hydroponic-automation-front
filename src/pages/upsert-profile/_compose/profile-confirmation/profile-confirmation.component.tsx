import { ActionsBar, ProfileInformation } from "components";
import { UpsertProfileMode, UpsertProfileStep, useProfile } from "contexts";
import { useCreateProfile, useEditProfile } from "hooks";
import { useNavigate } from "react-router-dom";
import { AppPath } from "utils";

export const ProfileConfirmation = () => {
  const { createProfile, isLoading: isLoadingCreateProfile } =
    useCreateProfile();
  const { editProfile, isLoading: isLoadingEditProfile } = useEditProfile();

  const navigate = useNavigate();

  const { profileData, mode, setFormStep } = useProfile();

  const handleContinue = async () => {
    let success = false;
    if (mode === UpsertProfileMode.Create) {
      success = (await createProfile(profileData)) ?? false;
    } else {
      success = (await editProfile(profileData)) ?? false;
    }
    if (success) {
      navigate(AppPath.ProfilesList);
    }
  };

  const isLoading = isLoadingCreateProfile || isLoadingEditProfile;

  return (
    <div className="d-flex flex-column gap-3">
      <ProfileInformation />

      <ActionsBar
        buttons={[
          {
            text: "Voltar",
            handleClick: () =>
              setFormStep(UpsertProfileStep.NutrientsProportion),
          },
          {
            text:
              mode === UpsertProfileMode.Create
                ? "Criar perfil"
                : "Editar perfil",
            handleClick: handleContinue,
            loading: isLoading,
          },
        ]}
      />
    </div>
  );
};
