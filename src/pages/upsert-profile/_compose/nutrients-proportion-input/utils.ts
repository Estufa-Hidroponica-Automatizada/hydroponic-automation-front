import { ProfileData } from "types";

export const nutrientProportionInitialValues = (profileData: ProfileData) => {
  return Array.from({ length: profileData.weeksDuration }, (_, weekIndex) =>
    weekIndex < profileData.nutrientProportion.length
      ? {
          nutrientA: profileData.nutrientProportion[weekIndex].nutrientA,
          nutrientB: profileData.nutrientProportion[weekIndex].nutrientB,
        }
      : { nutrientA: 1, nutrientB: 1 }
  );
};
