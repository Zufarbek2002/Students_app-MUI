/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const data = JSON.parse(localStorage.getItem("data"));
  const [user, setUser] = useState(data);

  const login = (data) => {
    setUser(data);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("data");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
