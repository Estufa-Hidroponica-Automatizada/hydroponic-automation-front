import { PropsWithChildren, createContext, useContext, useState } from "react";
import { ProfileData } from "types";
import { IProfileContext, UpsertProfileMode, UpsertProfileStep } from "./types";
import { blankProfileData } from "./utils";

const ProfileContext = createContext<IProfileContext>({} as IProfileContext);

export const ProfileProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [profileData, setProfileData] = useState<ProfileData>(blankProfileData);
  const [formStep, setFormStep] = useState(UpsertProfileStep.ProfileInfo);
  const [mode, setMode] = useState(UpsertProfileMode.Create);

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        setProfileData,
        formStep,
        setFormStep,
        mode,
        setMode,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
