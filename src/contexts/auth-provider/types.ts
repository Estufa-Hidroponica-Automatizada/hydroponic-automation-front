export interface IAuthContext {
  isAuthenticated: boolean;
  user: string;
  login: (identification: string, accessToken: string) => void;
  logout: () => void;
}
