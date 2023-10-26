import { Typography } from "antd";
import { ResponsiveContainer } from "components";
import { useGetCurrentProfile, useProfilesList } from "hooks";
import { useEffect, useRef } from "react";
import { ProfileInformationCard } from "./_compose/profile-information-card";
import { ProfilesListActions } from "./_compose/profiles-list-actions";

export const ProfilesListPage = () => {
  const initialRender = useRef(true);
  const { error, getProfiles, isLoading, profilesList } = useProfilesList();
  const {
    currentProfile,
    getCurrentProfile,
    isLoading: isLoadingCurrentProfile,
  } = useGetCurrentProfile();

  const getProfilesInfo = async () => {
    await getCurrentProfile();
    await getProfiles();
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      getProfilesInfo();
    }
  }, []);

  return (
    <>
      <ProfilesListActions
        handleReloadData={getProfilesInfo}
        isLoading={isLoading}
      />

      {error && (
        <div className="d-flex flex-column align-items-center pb-3">
          <Typography.Title level={4}>
            Ocorreu um erro ao buscar os perfis cadastrados.
          </Typography.Title>
        </div>
      )}

      <ResponsiveContainer>
        {profilesList.map((profile) => (
          <ProfileInformationCard
            isCurrent={profile.id === currentProfile.id}
            profile={profile}
            refreshList={getProfilesInfo}
          />
        ))}
      </ResponsiveContainer>
    </>
  );
};
