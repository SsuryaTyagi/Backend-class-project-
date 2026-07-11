import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../service/chat.api";
import { initializeSocketConnection } from "../service/chat.socket";
import {
  setChats,
  setError,
  setLoading,
  setCurrentChatId,
  createNewChat,
  addNewMessage,
} from "../chat.slice";
import { getErrorMessage } from "../utils/errors";

export const useChat = () => {
  const dispatch = useDispatch();
  const {
    loading,
    chats,
    error,
    currentChatId,
    sendLoading,
    messagesLoading,
    chatsLoading,
  } = useSelector((state) => state.chat);

  const handleSendMessage = async (message, chatId) => {
    try {
      dispatch(setLoading(true));
      const data = await sendMessage(message, chatId);
      const { chat, aiMessage } = data;

      dispatch(
        createNewChat({
          chatId: chat._id,
          title: chat.title,
        }),
      );
      dispatch(
        addNewMessage({
          chatId: chat._id,
          content: message,
          role: "user",
        }),
      );
      dispatch(
        addNewMessage({
          chatId: chat._id,
          content: aiMessage.content,
          role: aiMessage.role,
        }),
      );
      dispatch(setCurrentChatId(chat._id));
    } catch (error) {
      dispatch(setError(getErrorMessage(error)));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetChats = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getChats();
      const { chats } = data;
      dispatch(
        setChats(
          chats.reduce((acc, chat) => {
            acc[chat._id] = {
              id: chat._id,
              title: chat.title,
              message: [],
              lastUpdated: chat.updatedAt,
            };
            return acc;
          }, {}),
        ),
      );
    } catch (error) {
      dispatch(setError(getErrorMessage(error)));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const selectChat = (chatId) => {
    dispatch(setCurrentChatId(chatId));
  };

  const goHome = () => {
    dispatch(setCurrentChatId(null));
  };

  return {
    initializeSocketConnection,
    handleGetChats,
    handleSendMessage,
    selectChat,
    goHome,
    loading,
    chats,
    error,
    currentChatId,
  };
};