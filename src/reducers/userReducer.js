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
    acceptFriend(state, action) {
      // accept friend request
      // const findRequest = state.loggedUser.friendRequests.find(
      //   (fr) => fr.from === action.payload.id
      // );
      // const newRequest = {
      //   ...findRequest,
      //   status: 'accepted',
      // };
      // const newRequests = state.loggedUser.friendRequests.filter(
      //   (fr) => fr.from !== action.payload.id
      // );
      // return {
      //   ...state,
      //   loggedUser: {
      //     ...state.loggedUser,
      //     friendRequests: [...newRequests, newRequest],
      //     friends: [...state.loggedUser.friends, action.payload],
      //   },
      // };
      const findUser = state.allUsers.find((u) => u.id === state.loggedUser.id);
      const findRequest = findUser.friendRequests.find((fr) => fr.from === action.payload.id);
      const newUsers = state.allUsers.filter((u) => u.id !== findUser.id);
      const newRequest = {
        ...findRequest,
        status: 'accepted',
      };
      const newUser = {
        ...findUser,
        friendRequests: [
          ...findUser.friendRequests.filter((fr) => fr.from !== action.payload.id),
          newRequest,
        ],
        friends: [...findUser.friends, action.payload],
      };
      return { ...state, allUsers: [...newUsers, newUser] };
    },
    rejectFriend(state, action) {
      const newUsers = state.allUsers.filter((u) => u.id !== action.payload.id);
      return { ...state, allUsers: [...newUsers, action.payload] };
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
  acceptFriend,
  rejectFriend,
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
      const friendRequest = await userService.sendFriendRequest(id, obj, config);
      dispatch(setFriend(friendRequest));
    } catch (error) {
      console.log(error);
    }
  };
};

export const acceptFriendRequest = (id, obj, config) => {
  return async (dispatch) => {
    try {
      const friendRequest = await userService.acceptFriend(id, obj, config);
      console.log(friendRequest);
      dispatch(acceptFriend(friendRequest));
    } catch (error) {
      console.log(error);
    }
  };
};

export const rejectFriendRequest = (id, obj, config) => {
  return async (dispatch) => {
    try {
      const friendRequest = await userService.rejectFriend(id, obj, config);
      console.log(friendRequest);
      dispatch(rejectFriend(friendRequest));
    } catch (error) {
      console.log(error);
    }
  };
};

export default userSlice.reducer;
