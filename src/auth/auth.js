import { useState, createContext, useContext } from "react";
import {auth} from "../auth/FirebaseAuth";


export const AuthContext = createContext(null);
console.log("first auth check ", auth);

export const AuthProvider = ({ children }) => {
  const user = auth.currentUser.uid;
  // const [user, setUser] = useState(localStorage.getItem("user") || null);
  // const [userName, setUserName] = useState(
  //   localStorage.getItem("username") || ""
  // );

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};


// this Context provider probably isn't even necessary anymore. this was for
// local usage, that I don't think is needed anymore.
// possibly needed for reqpaths