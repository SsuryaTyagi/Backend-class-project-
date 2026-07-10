import { createSlice } from "@reduxjs/toolkit";

/* chats is keyed by chat _id:
   { [chatId]: { _id, user, title, createdAt, updatedAt, message: [...] } }
   `message` is only populated once that chat's messages have been
   fetched or a message has been sent in it. */
const initialState = {
  loading: false,
  chatsLoading: false,
  messagesLoading: false,
  sendLoading: false,
  deleteLoading: false,
  error: null,
  chats: {},
  currentChatId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setChatsLoading(state, action) {
      state.chatsLoading = action.payload;
    },
    setMessagesLoading(state, action) {
      state.messagesLoading = action.payload;
    },
    setSendLoading(state, action) {
      state.sendLoading = action.payload;
    },
    setDeleteLoading(state, action) {
      state.deleteLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    // payload: array of chat meta objects from GET /api/chat/chats.
    // Preserves any `message` array already loaded for a chat.
    setChats(state, action) {
      const map = {};
      for (const c of action.payload) {
        map[c._id] = { ...(state.chats[c._id] || {}), ...c };
      }
      state.chats = map;
    },
    // payload: a single chat object, returned when sendMessage
    // creates a brand-new chat.
    addChat(state, action) {
      const chat = action.payload;
      state.chats[chat._id] = {
        ...(state.chats[chat._id] || {}),
        ...chat,
        message: state.chats[chat._id]?.message || [],
      };
    },
    // payload: { chatId, messages } — full replace, used after
    // GET /api/chat/messages/:chatId
    setChatMessages(state, action) {
      const { chatId, messages } = action.payload;
      state.chats[chatId] = { ...(state.chats[chatId] || {}), message: messages };
    },
    // payload: { chatId, messages } — appends (e.g. the
    // [userMessage, aiMessage] pair from sendMessage)
    appendMessages(state, action) {
      const { chatId, messages } = action.payload;
      const existing = state.chats[chatId]?.message || [];
      state.chats[chatId] = {
        ...(state.chats[chatId] || {}),
        message: [...existing, ...messages],
      };
    },
    removeChat(state, action) {
      const chatId = action.payload;
      delete state.chats[chatId];
      if (state.currentChatId === chatId) state.currentChatId = null;
    },
    setCurrentChatId(state, action) {
      state.currentChatId = action.payload;
    },
  },
});

export const {
  setLoading,
  setChatsLoading,
  setMessagesLoading,
  setSendLoading,
  setDeleteLoading,
  setError,
  setChats,
  addChat,
  setChatMessages,
  appendMessages,
  removeChat,
  setCurrentChatId,
} = chatSlice.actions;

export default chatSlice.reducer;