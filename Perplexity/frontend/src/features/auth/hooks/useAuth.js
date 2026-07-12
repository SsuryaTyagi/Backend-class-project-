import { useDispatch, useSelector } from "react-redux";
import { login, register, getMe, logout } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";
import { useEffect } from "react";
import { getErrorMessages } from "../utils/getErrorMessage";
import { toast } from "react-hot-toast";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleRegister = async (username, email, password) => {
    try {
      dispatch(setLoading(true));
      const res = await register(username, email, password);
      return res;
      toast.success(res.message || "Registration successful!");
    } catch (error) {
      dispatch(setError(getErrorMessages(error, "Registration Failed")));
      toast.error(error.message || "Registration failed!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogin = async (email, password) => {
    try {
      dispatch(setLoading(true));
      const res = await login(email, password);
      dispatch(setUser(res.user));
      toast.success(res.message || "Login successful!");
      return res;
    } catch (error) {
      dispatch(setError(getErrorMessages(error, "Login Failed")));
      toast.error(error.message || "Login failed!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetMe = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getMe();
      dispatch(setUser(res.user));
      toast.success(res.message || "Profile updated!");
      return res;
    } catch (error) {
      dispatch(
        setError(getErrorMessages(error, "Failed to fetch user information")),
      );
      toast.error(error.message || "Failed to fetch user information!");
      dispatch(setUser(null));
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      const res = await logout();
      dispatch(setUser(null));
      toast.success(res.message);
    } catch (error) {
      dispatch(setError(getErrorMessages(error)));
      toast.error(error.message || "Logout Failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) return;
    handleGetMe();
  }, []);

  return { handleRegister, handleLogin, handleGetMe,handleLogout, user, loading, error };
};
