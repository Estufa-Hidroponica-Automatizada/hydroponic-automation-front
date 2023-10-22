import { UpsertProfileFormField } from "types";

export const UpsertProfileFormFields = {
  name: {
    name: UpsertProfileFormField.Name,
    label: "Nome do perfil",
    required: true,
  },
  weeksDuration: {
    name: UpsertProfileFormField.WeeksDuration,
    label: "Duração (em semanas)",
    required: true,
  },
  lightSchedule: {
    name: UpsertProfileFormField.LightSchedule,
  },
};
