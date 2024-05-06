import { createSlice } from '@reduxjs/toolkit';
import chatService from '../services/chat';

const chatSlice = createSlice({
  name: 'chat',
  initialState: { first: [], loading: false, error: false },
  reducers: {
    setLoading(state, action) {
      return { ...state, loading: action.payload };
    },
    initializeChat(state, action) {
      return { ...state, first: action.payload };
    },
  },
});

export const { setLoading, initializeChat } = chatSlice.actions;

export const getChat = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const newChat = await chatService.getChat();
      dispatch(initializeChat(newChat));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
};

export default chatSlice.reducer;
