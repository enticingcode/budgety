import { useState, createContext, useContext } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [userName, setUserName] = useState(
    localStorage.getItem("username") || ""
  );

  return (
    <AuthContext.Provider value={{ user, setUser, userName, setUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
