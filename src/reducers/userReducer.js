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
    setFriend(state, action) {
      // send friend request

      const findUser = state.allUsers.find((u) => u.id === action.payload.id);
      const findRequest = action.payload.friendRequests.find(
        (fr) => fr.from === state.loggedUser.id
      );
      const newUser = { ...findUser, friendRequests: [...findUser.friendRequests, findRequest] };
      const newUsers = state.allUsers.filter((u) => u.id !== action.payload.id);
      console.log(newUsers);
      return { ...state, allUsers: [...newUsers, newUser] };
    },
  },
});

export const {
  initializeUsers,
  appendUser,
  setError,
  setRecipient,
  setLoggedUser,
  setSuccess,
  setFriend,
} = userSlice.actions;

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

export const sendFriendRequest = (id, obj, config) => {
  return async (dispatch) => {
    try {
      const request = await userService.sendFriendRequest(id, obj, config);
      console.log(request);
      dispatch(setFriend(request));
    } catch (error) {
      console.log(error);
    }
  };
};

export const acceptFriendRequest = (id) => {
  return async (dispatch) => {
    try {
      const request = await userService.acceptFriend(id);
      dispatch(setFriend(request));
    } catch (error) {
      console.log(error);
    }
  };
};

export default userSlice.reducer;
