import { PropsWithChildren, createContext, useState } from "react";
import { LightSchedule, Limit, NutrientsProportion, ProfileData } from "types";
import { IProfileContext, UpsertProfileStep } from "./types";

export const ProfileContext = createContext<IProfileContext>(
  {} as IProfileContext
);

export const ProfileProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    weeksDuration: 0,
    lightSchedule: [[]] as LightSchedule[][],
    pH: [] as Limit[],
    airTemperature: [] as Limit[],
    condutivity: [] as Limit[],
    humidity: [] as Limit[],
    waterTemperature: [] as Limit[],
    nutrientsProportion: [] as NutrientsProportion[],
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
