import { Limit } from "types";

export const isValueOnRange = (value: number, range: Limit) => {
  return value >= range.min && value <= range.max;
};
