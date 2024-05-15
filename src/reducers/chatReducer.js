import { createSlice } from '@reduxjs/toolkit';
import chatService from '../services/chat';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: null,
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
  },
});

export const { setLoading, initializeChat, appendMessage, initializeMessages, appendChat } =
  chatSlice.actions;

export const getChat = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const newChat = await chatService.getChat();
      console.log('newchat', newChat);
      dispatch(initializeChat(newChat));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addChat = (obj) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const newChat = await chatService.addChat(obj);
      dispatch(appendChat(newChat));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addMessage = (id, message) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const newMessage = await chatService.addMessage(id, message);
      console.log(newMessage);
      dispatch(appendMessage(newMessage));
      dispatch(setLoading(false));
    } catch (error) {
      console.log('addMessage', error);
    }
  };
};

export default chatSlice.reducer;
