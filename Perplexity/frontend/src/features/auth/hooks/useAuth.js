import { useDispatch, useSelector } from "react-redux";
import { login, register, getMe } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";
import { useEffect } from "react";
import { getErrorMessages } from "../utils/getErrorMessage";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleRegister = async (username, email, password) => {
    try {
      dispatch(setLoading(true));
      const res = await register(username, email, password);
      return res;
    } catch (error) {
      dispatch(setError(getErrorMessages(error, "Registration Failed")));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogin = async (email, password) => {
    try {
      dispatch(setLoading(true));
      const res = await login(email, password);
      dispatch(setUser(res.user));
      return res;
    } catch (error) {
      dispatch(setError(getErrorMessages(error, "Login Failed")));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetMe = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getMe();
      dispatch(setUser(res.user));
      return res;
    } catch (error) {
      dispatch(
        setError(getErrorMessages(error, "Failed to fetch user information")),
      );
      dispatch(setUser(null));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) return;
    handleGetMe();
  }, []);

  return { handleRegister, handleLogin, handleGetMe, user, loading, error };
};
