import { createSlice } from '@reduxjs/toolkit';
import chatService from '../services/chat';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    first: null,
    messages: null,
    loading: false,
    error: false,
  },
  reducers: {
    setLoading(state, action) {
      return { ...state, loading: action.payload };
    },
    initializeChat(state, action) {
      return { ...state, first: action.payload };
    },
    appendMessage(state, action) {
      return { ...state, messages: [...state.messages, action.payload] };
    },
    initializeMessages(state, action) {
      return { ...state, messages: action.payload };
    },
  },
});

export const { setLoading, initializeChat, appendMessage, initializeMessages } = chatSlice.actions;

export const getChat = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const newChat = await chatService.getChat();
      console.log(newChat);
      dispatch(initializeChat(newChat));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getMessages = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const newMessages = await chatService.getChat();
      const messages = newMessages.map((m) => m.messages);
      dispatch(initializeMessages(...messages));
      dispatch(setLoading(false));
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
    } catch (error) {
      console.log('addMessage', error);
    }
  };
};

export default chatSlice.reducer;
