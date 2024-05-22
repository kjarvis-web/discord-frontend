import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';

const userSlice = createSlice({
  name: 'users',
  initialState: { allUsers: [], loggedUser: null, error: false, recipient: null, success: false },
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
    setSuccess(state, action) {
      return { ...state, success: action.payload };
    },
  },
});

export const { initializeUsers, appendUser, setError, setRecipient, setLoggedUser, setSuccess } =
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

export const addUser = (newUser) => {
  return async (dispatch) => {
    try {
      const user = await userService.createUser(newUser);
      dispatch(appendUser(user));
      dispatch(setSuccess(true));
      setTimeout(() => {
        dispatch(setSuccess(false));
      }, 4000);
    } catch (error) {
      console.log(error);
      dispatch(setError(error.response.data.error));
      setTimeout(() => {
        dispatch(setError(false));
      }, 5000);
    }
  };
};

export default userSlice.reducer;
