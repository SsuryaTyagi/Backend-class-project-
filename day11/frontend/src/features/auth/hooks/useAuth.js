import React, { useContext } from "react";
import { authContext } from "../auth.context.jsx";
import { login, register } from "../servises/auth.api.js";

export default function useAuth() {
  const context = useContext(authContext);

  const { setUser, user, loading, setLoading } = context;

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const res = await login(username, password);

      setUser(res.user);

      return res;
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
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
  };
}
