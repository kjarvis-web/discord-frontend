import { createSlice } from '@reduxjs/toolkit';
import chatService from '../services/chat';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    loading: false,
    error: false,
  },
  reducers: {
    setLoading(state, action) {
      return { ...state, loading: action.payload };
    },
    initializeChat(state, action) {
      return {
        ...state,
        chats: action.payload,
      };
    },
    appendMessage(state, action) {
      const findChat = state.chats.find((o) => o.id === action.payload.chatId);
      const newUser = { ...findChat, messages: [...findChat.messages, action.payload] };
      const newUsers = state.chats.filter((o) => o.id !== action.payload.chatId);

      return { ...state, chats: [...newUsers, newUser] };
    },
    appendChat(state, action) {
      return { ...state, chats: [...state.chats, action.payload] };
    },
    editMessage(state, action) {
      const findChat = state.chats.find((o) => o.id === action.payload.chatId);
      const findMessage = findChat.messages.find((m) => m.id === action.payload.id);
      const newMessage = { ...findMessage, text: action.payload.text };
      const newChat = {
        ...findChat,
        messages: [...findChat.messages.filter((m) => m.id !== action.payload.id), newMessage],
      };
      const newChats = state.chats.filter((c) => c.id !== action.payload.chatId);

      return { ...state, chats: [...newChats, newChat] };
    },
    setNotify(state, action) {
      const findChat = state.chats.find((o) => o.id === action.payload.id);
      const addNotify = { ...findChat, notify: action.payload.notify };
      const newChats = state.chats.filter((o) => o.id !== action.payload.id);
      return { ...state, chats: [...newChats, addNotify] };
    },
    setHidden(state, action) {
      const findChat = state.chats.find((o) => o.id === action.payload.id);
      const changeHidden = { ...findChat, hidden: action.payload.hidden };
      const newChats = state.chats.filter((o) => o.id !== action.payload.id);
      return { ...state, chats: [...newChats, changeHidden] };
    },
    setError(state, action) {
      return { ...state, error: action.payload };
    },
  },
});

export const {
  setLoading,
  initializeChat,
  appendMessage,
  initializeMessages,
  appendChat,
  editMessage,
  setNotify,
  setHidden,
  setError,
} = chatSlice.actions;

export const getChat = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const newChat = await chatService.getChat();
      dispatch(initializeChat(newChat));
      dispatch(setLoading(false));
    } catch (error) {
      setError(true);
      console.log(error);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };
};

export const addChat = (obj) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const newChat = await chatService.addChat(obj);
      console.log(newChat);
      dispatch(appendChat(newChat));
      dispatch(setLoading(false));
      return newChat;
    } catch (error) {
      console.log(error);
    }
  };
};

export const addGroupChat = (obj) => {
  return async (dispatch) => {
    try {
      const newChat = await chatService.addGroupChat(obj);
      console.log(newChat);
      dispatch(appendChat(newChat));
      return newChat;
    } catch (error) {
      console.log(error);
    }
  };
};

export const addMessage = (id, message) => {
  return async (dispatch) => {
    try {
      const newMessage = await chatService.addMessage(id, message);
      console.log(newMessage);
      dispatch(appendMessage(newMessage));
      dispatch(hideChat({ id: newMessage.chatId, hidden: false }));
    } catch (error) {
      console.log('addMessage', error);
    }
  };
};

export const updateMessage = (message) => {
  return async (dispatch) => {
    try {
      const newMessage = await chatService.editMessage(message);
      console.log(newMessage);
      dispatch(editMessage(newMessage));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateNotify = (chat) => {
  return async (dispatch) => {
    try {
      const newChat = await chatService.notify(chat);
      console.log(newChat);
      dispatch(setNotify(newChat));
    } catch (error) {
      console.log(error);
    }
  };
};

export const hideChat = (chat) => {
  return async (dispatch) => {
    try {
      const newChat = await chatService.hideChat(chat);
      console.log(newChat);
      dispatch(setHidden(chat));
    } catch (error) {
      console.log(error);
    }
  };
};

export default chatSlice.reducer;
