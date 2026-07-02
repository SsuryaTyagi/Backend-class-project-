import axios, { create } from "axios";

const api = create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const login = async (email, password) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = api.post("/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getMe = async () => {
  try {
    const response = api.get("/getMe");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
