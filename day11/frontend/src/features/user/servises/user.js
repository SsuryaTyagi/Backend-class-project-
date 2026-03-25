import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const followers = async () => {
  try {
    const res = await api.get("/api/user/follower");
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const following = async () => {
  try {
    const res = await api.get("/api/user/following");
    return res.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};
