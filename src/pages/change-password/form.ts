import { ChangePasswordFormField } from "types";
import { validators } from "utils";

export const ChangePasswordFormFields = {
  oldPassword: {
    name: ChangePasswordFormField.OldPassword,
    label: "Senha antiga",
    validation: validators.required,
    required: true,
  },
  newPassword: {
    name: ChangePasswordFormField.NewPassword,
    label: "Nova senha",
    validation: validators.required,
    required: true,
  },
  confirmPassword: {
    name: ChangePasswordFormField.ConfirmPassword,
    label: "Confirme a senha",
    validation: validators.required,
    required: true,
  },
};
