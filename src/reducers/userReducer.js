import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';

const userSlice = createSlice({
  name: 'users',
  initialState: { allUsers: [], loggedUser: null, error: false, recipient: null },
  reducers: {
    initializeUsers(state, action) {
      return { ...state, allUsers: action.payload };
    },
    appendUser(state, action) {
      return { ...state, allUsers: [...state.allUsers, action.payload] };
    },
    setError(state, action) {
      return { ...state, error: action.payload };
    },
    setRecipient(state, action) {
      return { ...state, recipient: action.payload };
    },
    setLoggedUser(state, action) {
      return { ...state, loggedUser: action.payload };
    },
  },
});

export const { initializeUsers, appendUser, setError, setRecipient, setLoggedUser } =
  userSlice.actions;

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getUsers();
    dispatch(initializeUsers(users));
  };
};

export const getLoggedUser = (id) => {
  return async (dispatch) => {
    const user = await userService.getLoggedUser(id);
    dispatch(setLoggedUser(user));
  };
};

export default userSlice.reducer;
