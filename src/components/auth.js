import { useState, createContext, useContext } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [personName, setPersonName] = useState(
    localStorage.getItem("username") || ""
  );

  return (
    <AuthContext.Provider value={{ user, setUser, personName, setPersonName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
