import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const sendMessage = async (message, chatId) => {
  try {
    const response = await api.post("/api/chat/messages", {
      message: message,
      chat: chatId,
    });
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getChats = async () => {
  try {
    const response = await api.get("/api/chat/chats");
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getMessages = async (chatId) => {
  try {
    const response = await api.get(`/api/chat/messages/${chatId}`);
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteChat = async (chatId) => {
  try {
    const response = await api.delete(`/api/chat/delete/${chatId}`);
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }

};
