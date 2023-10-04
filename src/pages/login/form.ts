import { validators } from "utils";

export const LoginFormFields = {
  username: {
    name: "username",
    label: "ID da estufa",
    validation: validators.required,
    required: true,
  },
  password: {
    name: "password",
    label: "Senha",
    validation: validators.required,
    required: true,
  },
};
