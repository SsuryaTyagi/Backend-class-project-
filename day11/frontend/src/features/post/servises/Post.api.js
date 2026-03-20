import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

 export const getFeed = async () => {
  try {
    const res = await api.get("/api/post/feed");

    return res.data;
  } catch (error) {
     throw error.response?.data || error.message;
  }
};
