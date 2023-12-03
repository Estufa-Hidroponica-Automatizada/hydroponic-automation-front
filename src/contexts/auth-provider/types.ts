export interface IAuthContext {
  isAuthenticated: boolean;
  login: (identification: string, accessToken: string) => void;
  logout: () => void;
}
