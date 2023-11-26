import { PropsWithChildren, createContext, useContext, useState } from "react";
import { IAuthContext } from "./types";

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");

  const login = (identification: string) => {
    setIsAuthenticated(true);
    setUser(identification);
  };

  const logout = () => {
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
