import { useState, createContext, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const auth = getAuth();
  // console.log(auth);

  // auth.operations.state cannot be targeted because of <state> key
  // find alternate method for loading
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  // console.log(user);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
