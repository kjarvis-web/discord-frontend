import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import chatService from '../services/chat';

const loginSlice = createSlice({
  name: 'login',
  initialState: { user: null, loading: false, error: false },
  reducers: {
    setUser(state, action) {
      return { ...state, user: action.payload };
    },
    logout(state) {
      window.localStorage.clear();
      return { ...state, user: null };
    },
    setLoading(state, action) {
      return { ...state, loading: action.payload };
    },
    setError(state, action) {
      return { ...state, error: action.payload };
    },
  },
});

export const { setUser, logout, setLoading, setError } = loginSlice.actions;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      dispatch(setError(false));
      dispatch(setLoading(true));
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      chatService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(true));
    }
  };
};

export const loggedUser = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user));
    chatService.setToken(user.token);
  };
};

export default loginSlice.reducer;
