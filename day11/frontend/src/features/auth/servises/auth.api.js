import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const login = async (username, password) => {
  try {
    const res = await api.post("/login", {
      username: username,
      password: password,
    });

    return res.data;
  } catch (error) {
     throw error.response?.data || error.message;
  }
};

export const register = async (username, email, password) => {
  try {
    const res = await api.post("/register", {
      username: username,
      password: password,
      email,
    });

    return res.data;
  } catch (error) {
     throw error.response?.data || error.message;
  }
};


export const getMe = async ()=>{
    try {
        const res =  await api.get("/get-me")
        
        return res.data
    } catch (error) {
         throw error.response?.data || error.message;
        
    }
}