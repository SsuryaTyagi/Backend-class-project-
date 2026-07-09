import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../service/chat.api";
import { initializeSocketConnection } from "../service/chat.socket";
import {
  setLoading,
  setError,
  setChats,
  addChat,
  setChatMessages,
  appendMessages,
  removeChat,
  setCurrentChatId,
} from "../chat.slice";
import { getErrorMessage } from "../utils/errors";

export const useChat = () => {
  const dispatch = useDispatch();
  const { loading, chats, error, currentChatId } = useSelector((state) => state.chat);

  const fetchChats = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const res = await getChats();
      dispatch(setChats(res.data));
    } catch (err) {
      dispatch(setError(getErrorMessage(err, "Could not load chats")));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const fetchMessages = useCallback(
    async (chatId) => {
      try {
        dispatch(setLoading(true));
        const res = await getMessages(chatId);
        dispatch(setChatMessages({ chatId, messages: res.data }));
      } catch (err) {
        dispatch(setError(getErrorMessage(err, "Could not load messages")));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  // chatId is undefined/null for a brand-new chat.
  const handleSendMessage = useCallback(
    async (message, chatId) => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const res = await sendMessage(message, chatId);
        const { chat, userMessage, aiMessage } = res.data;

        if (chat) {
          // backend created a new chat on this send
          dispatch(addChat(chat));
          dispatch(setCurrentChatId(chat._id));
          dispatch(appendMessages({ chatId: chat._id, messages: [userMessage, aiMessage] }));
        } else {
          // existing chat — response only has the two messages
          dispatch(appendMessages({ chatId, messages: [userMessage, aiMessage] }));
        }
      } catch (err) {
        dispatch(setError(getErrorMessage(err, "Failed to send message")));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const handleDeleteChat = useCallback(
    async (chatId) => {
      try {
        dispatch(setLoading(true));
        await deleteChat(chatId);
        dispatch(removeChat(chatId));
      } catch (err) {
        dispatch(setError(getErrorMessage(err, "Failed to delete chat")));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  // Selects a chat in the sidebar, fetching its messages the
  // first time (skips the fetch if they're already in the store).
  const selectChat = useCallback(
    (chatId) => {
      dispatch(setCurrentChatId(chatId));
      if (chatId && !chats[chatId]?.message) {
        fetchMessages(chatId);
      }
    },
    [dispatch, chats, fetchMessages]
  );

  return {
    initializeSocketConnection,
    fetchChats,
    fetchMessages,
    handleSendMessage,
    handleDeleteChat,
    selectChat,
    loading,
    chats,
    error,
    currentChatId,
  };
};