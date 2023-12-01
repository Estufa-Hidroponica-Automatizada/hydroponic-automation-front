import { PropsWithChildren, createContext, useContext, useState } from "react";
import { IAuthContext } from "./types";

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");

  const login = (identification: string, access_token: string) => {
    setIsAuthenticated(true);
    setUser(identification);
    localStorage.setItem("access_token", access_token);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(true);
    setUser("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthentication = () => useContext(AuthContext);
