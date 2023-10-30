import { ProfileData } from "types";
import { ProfileResponse } from "./types";

export const adaptProfileResponseToProfileData = (
  profileResponse: ProfileResponse
) => {
  return {
    id: profileResponse.id,
    name: profileResponse.name,
    airTemperature: profileResponse.temperature,
    condutivity: profileResponse.condutivity,
    humidity: profileResponse.humidity,
    lightSchedule: profileResponse.light_schedule,
    nutrientsProportion: profileResponse.nutrient_proportion,
    pH: profileResponse.ph,
    waterTemperature: profileResponse.water_temperature,
    weeksDuration: profileResponse.humidity.length,
  };
};

export const adaptProfilesResponseToProfilesData = (
  data: ProfileResponse[]
) => {
  const response: ProfileData[] = [];

  data.map((profile) => {
    response.push(adaptProfileResponseToProfileData(profile));
  });

  return response;
};
