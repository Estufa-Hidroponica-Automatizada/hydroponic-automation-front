import { Typography } from "antd";
import { ResponsiveContainer } from "components";
import { useGetCurrentProfile, useProfilesList } from "hooks";
import { useEffect, useRef, useState } from "react";
import { ProfileInformationCard } from "./_compose/profile-information-card";
import { ProfilesListActions } from "./_compose/profiles-list-actions";

export const ProfilesListPage = () => {
  const [filter, setFilter] = useState("");
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
        handleChangeFilter={setFilter}
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
        {profilesList
          .filter((profile) => profile.name.toLowerCase().includes(filter))
          .map((profile) => (
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
