export interface IAuthContext {
  isAuthenticated: boolean;
  user: string;
  login: (identification: string, access_token: string) => void;
  logout: () => void;
}
