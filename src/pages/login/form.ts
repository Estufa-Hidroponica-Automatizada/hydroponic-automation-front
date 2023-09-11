export const LoginFormFields = {
  systemID: {
    name: "systemID",
    label: "ID da estufa",
    validation: { required: true, message: "O ID da estufa é obrigatório!" },
    required: true,
  },
  password: {
    name: "password",
    label: "Senha",
    validation: { required: true, message: "A senha é obrigatória!" },
    required: true,
  },
};
