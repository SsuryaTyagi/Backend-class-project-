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

export const postCreate = async (caption, file) => {
  try {
    const Form = new FormData();
    
    Form.append("image", file);
    Form.append("caption", caption);

    const res = await api.post("/api/post", Form);

    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const likePost = async (postId) => {
try {
    const res = await api.post("/api/post/like/" + postId);
     return res.data
} catch (error) {
   throw error.response?.data || error.message
}
};

export const unlikePost = async (postId) => {
try {
    const res = await api.post("/api/post/unlike/" + postId);
     return res.data
} catch (error) {
   throw error.response?.data || error.message
}
};
