import { PropsWithChildren, createContext, useState } from "react";
import { LightSchedule } from "types";
import { IProfileContext, UpsertProfileStep } from "./types";

export const ProfileContext = createContext<IProfileContext>(
  {} as IProfileContext
);

export const ProfileProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [profileData, setProfileData] = useState({
    name: "",
    weeksDuration: 0,
    lightSchedule: [[]] as LightSchedule[][],
  });
  const [formStep, setFormStep] = useState(UpsertProfileStep.ProfileInfo);

  return (
    <ProfileContext.Provider
      value={{ profileData, setProfileData, formStep, setFormStep }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
