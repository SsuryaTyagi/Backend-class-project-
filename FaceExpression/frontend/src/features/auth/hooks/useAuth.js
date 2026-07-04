import React from "react";
import { useContext } from "react";
import { authContext } from "../auth.context";
import { getMe, login, logout, register } from "../services/auth.api";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function useAuth() {
  const { user, loading, error, setUser, setLoading, setError } = useContext(authContext);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const res = await login(email, password);
      setUser(res);
      toast.success(res.message || "Login successful!");
      return res;
    } catch (error) {
      setError(error);
      console.log(error);
      toast.error(error.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const res = await register(username, email, password);
      setUser(res.data);
      toast.success(res.message || "Registration successful!");
      return res;
    } catch (error) {
      setError(error);
      console.log(error);
      toast.error(error.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGetMe = async () => {
    setLoading(true);
    try {
      const res = await getMe();
      setUser(res);
      toast.success(res.message || "Profile updated!");
      return res;
    } catch (error) {
      setUser(null);
      setError(error);
      toast.error(error.message || "Failed to update profile!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await logout();
      setUser(null);
      toast.success(res.message || "Logout successful!");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Logout failed!");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      if (user) return; 

    setLoading(true);
    getMe()
      .then((res) => setUser(res))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);
  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleGetMe,
    handleLogout,
  };
}
