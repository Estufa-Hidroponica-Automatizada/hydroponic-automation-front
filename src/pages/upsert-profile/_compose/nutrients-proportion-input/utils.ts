import { ProfileData } from "types";

export const nutrientsProportionInitialValues = (profileData: ProfileData) => {
  return Array.from({ length: profileData.weeksDuration }, (_, weekIndex) =>
    weekIndex < profileData.nutrientsProportion.length
      ? {
          nutrientA: profileData.nutrientsProportion[weekIndex].nutrientA,
          nutrientB: profileData.nutrientsProportion[weekIndex].nutrientB,
        }
      : { nutrientA: 1, nutrientB: 1 }
  );
};
