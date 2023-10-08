import { ChangePasswordFormField } from "types";

export const ChangePasswordFormFields = {
  oldPassword: {
    name: ChangePasswordFormField.OldPassword,
    label: "Senha antiga",
    required: true,
  },
  newPassword: {
    name: ChangePasswordFormField.NewPassword,
    label: "Nova senha",
    required: true,
  },
  confirmPassword: {
    name: ChangePasswordFormField.ConfirmPassword,
    label: "Confirme a senha",
    required: true,
  },
};
