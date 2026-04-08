import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const register = async (username, email, password) => {
  try {
    const res = await api.post("/login", {
      username,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const res = await api.post("/register", {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getMe = async () => {
  const res = await api.get("/getMe");
  return res.data;
};

export const logout = async () => {
  try {
    const res = await api.post("/logout");
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
