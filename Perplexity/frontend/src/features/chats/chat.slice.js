import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    currentChatId: null,
    chatsLoading: false,
    messagesLoading: false,
    sendLoading: false,
    loading: false,
    error: null,
  },
  reducers: {
    // Upsert: preserves existing messages instead of wiping them on every send
    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;
      const existing = state.chats[chatId];
      state.chats[chatId] = {
        id: chatId,
        title: title ?? existing?.title ?? "New chat",
        message: existing?.message ?? [],
        lastUpdated: new Date().toISOString(),
      };
    },
    addNewMessage: (state, action) => {
      const { chatId, content, role } = action.payload;
      if (!state.chats[chatId]) {
        state.chats[chatId] = {
          id: chatId,
          title: "New chat",
          message: [],
          lastUpdated: new Date().toISOString(),
        };
      }
      state.chats[chatId].message.push({ content, role });
      state.chats[chatId].lastUpdated = new Date().toISOString();
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setChatsLoading: (state, action) => {
      state.chatsLoading = action.payload;
    },
    setMessagesLoading: (state, action) => {
      state.messagesLoading = action.payload;
    },
    setSendLoading: (state, action) => {
      state.sendLoading = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setChats,
  createNewChat,
  setLoading,
  setError,
  setCurrentChatId,
  addNewMessage,
  setChatsLoading,
  setMessagesLoading,
  setSendLoading,
} = chatSlice.actions;
export default chatSlice.reducer;