import React, { createContext, useState } from "react";
import { login,register } from "./servises/auth.api";


export const authContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const res = await login(username, password);

      setUser(res.user);

      return res
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

    const handleRegister = async (username, password) => {
    setLoading(true);
    try {
      const res = await register(username, password, email);

      setUser(res.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  return(<authContext.Provider value={{user, loading, handleRegister ,handleLogin}}>
    {children}
  </authContext.Provider>)
}
