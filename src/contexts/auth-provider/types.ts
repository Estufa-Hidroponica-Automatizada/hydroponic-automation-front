export interface IAuthContext {
  isAuthenticated: boolean;
  user: string;
  login: (identification: string) => void;
  logout: () => void;
}
