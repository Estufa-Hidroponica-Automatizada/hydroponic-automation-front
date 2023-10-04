export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export enum ChangePasswordFormField {
  OldPassword = "oldPassword",
  NewPassword = "newPassword",
  ConfirmPassword = "confirmPassword",
}

export interface ChangePasswordFormValues extends ChangePasswordRequest {
  confirmPassword: string;
}
