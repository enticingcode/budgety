import { useState, createContext, useContext } from "react";

export const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    const msg = 'this fucking works';

    const login = user => {
        setUser(user)
    }

    const logout = () => {
        setUser(null)
    }

    return (

        <AuthContext.Provider value={{ user, login, logout, msg }}>
            {children}
        </AuthContext.Provider>

    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}