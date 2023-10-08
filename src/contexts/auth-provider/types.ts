export interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}
